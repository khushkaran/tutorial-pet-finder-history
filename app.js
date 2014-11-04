require('dot-env');
var express, app, bodyParser, jwt, appSecret, redisURL, redis;

express = require('express');
app = express();
bodyParser  = require('body-parser');
jwt = require('jsonwebtoken');
appSecret = process.env.APP_SECRET;
redisURL = require('url').parse(process.env.REDIS_URL);
redis = require('redis').createClient(redisURL.port, redisURL.hostname);
if (redisURL.auth) {
  redis.auth(redisURL.auth.split(":")[1]);
}

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded( {
  extended: true
}));

app.all('/', function(request, response) {
  var signedRequest = request.body.signed_request;

  jwt.verify(signedRequest, appSecret, function(err, decoded) {
    redis.lrange(decoded.instance_id, 0, -1, function(err, petNameList) {
      response.render('index', {signed_request: signedRequest, pet_names: petNameList});
    });
  });
});

app.post('/addtohistory', function(request, response) {
  var petName, signedRequest, instanceID;

  petName = request.body.pet_name;
  signedRequest = request.body.signed_request;
  if (petName) {
    jwt.verify(signedRequest, appSecret, function(err, decoded) {
      instanceID = decoded.instance_id;
      redis.lpush(instanceID, petName);
    });
  };
});

app.listen(app.get('port'));
