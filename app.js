var express, app, bodyParser;
express = require('express');
app = express();
bodyParser  = require('body-parser');

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded( {
  extended: true
}));

app.all('/', function(request, response) {
  var signedRequest = request.body.signed_request;
  response.render('index');
});

app.listen(app.get('port'));
