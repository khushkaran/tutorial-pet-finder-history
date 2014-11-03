var express, app;
express = require('express');
app = express();

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.all('/', function(request, response) {
  response.render('index');
});

app.listen(app.get('port'));
