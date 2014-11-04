require('dot-env');
var express, app, bodyParser, jwt, appSecret;
express = require('express');
app = express();
bodyParser  = require('body-parser');
jwt = require('jsonwebtoken');
appSecret = process.env.APP_SECRET;

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded( {
  extended: true
}));

app.all('/', function(request, response) {
  var signedRequest = request.body.signed_request;
  jwt.verify(signedRequest, appSecret, function(err, decoded) {
    response.render('index', {signed_request: signedRequest});
  });
});

app.listen(app.get('port'));
