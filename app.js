
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , twitter = require('ntwitter');

var twit = new twitter({
  consumer_key: '55mU8XHrothMZqFXpSGfhw',
  consumer_secret: 'CexjnZ1dOapFCDo3nEul3Z2XtwiqVcEk6VGAEn4xT0',
  access_token_key: '24208450-fsU36cUjjnlvexT9idFskf5ymY2Ttf2DOedGDMo00',
  access_token_secret: 'BvTZHvGZyq0PGDMzai8DGy0eoNjDnm8JeTp0juA0E2M'
});

var app = express();

var email   = require("emailjs");
var server  = email.server.connect({
   user:       "beta@togobox.co"
   , password: "assfireman"
   , host:     "smtp.gmail.com"
   , ssl:      true
});

var pg = require('pg');

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//app.get('/', routes.index);
app.get('/', function(req, res){
  //twit.showUser('VirgilGoode, jillstein2012, GovGaryJohnson, MittRomney, BarackObama', function(err, user){
    //res.render('index'
    //, { title: 'PresElec.com your World Presidential Election Labatory.'
    //  , virgil: user[4]
    //  , jill: user[3]
    //  , gary: user[2]
    //  , mitt: user[1]
    //  , barack: user[0] });
    //console.log(user[0].name+user[1].name+user[2].name+user[3].name+user[4].name);
  //});
  res.render('index', { title: 'PresElec | World Presidential Election Polling Site', date: new Date().getMonth()+1+'.'+new Date().getDate()+'.'+new Date().getFullYear() });
});
app.post('/', function(req, res){
  var conString = "postgres://postgres:assfireman@localhost:5432/postgres";
  pg.connect(conString, function(err, client) {
    client.query("INSERT INTO meeeu VALUES ('"+req.body.email+"')", function(err, result) {
      console.log('success')
      //console.log("Row count: %d",result.rows.length);  // 1
      //console.log("Current year: %d", result.rows[0].when.getYear());
      res.render('ty', { title: 'PresElec | World Presidential Election Polling Site' });
    });
  });
});
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
