
var express = require('express');
var http = require('http');
var ejs = require('ejs');
var path = require('path');
var Twitter = require('twitter');
var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));


require('./routes')(app);
app.set('port', process.env.PORT || 3001);
http.createServer(app).listen(app.get('port'), function(){
  console.log('server listening on port ' + app.get('port'));
});
