
/**
 * Module dependencies.
 */

var express = require('express')
  ,http=require('https')
  , querystring = require('querystring')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , passport = require('passport')
  , passportLocal = require('passport-local') 
  ,bodyparser = require('body-parser')
  ,cookieparser = require('cookie-parser')
  ,expressSession = require('express-session')
  , path = require('path')
  , mongoose =require('mongoose');

var app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use(cookieparser());
app.use(expressSession({secret: 'DcuAVBch', resave:false, saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
// Mongo Schema

function checklogin(req,res,next)
{
console.log("isAuthenticated");
console.log(req.isAuthencated);
	if (req.isAuthenticated())	
	{
	next();
	}
	else 
		{
		res.send("login first");
		}
}

//var Schema= new mongoose.Schema({
//	_id:String,
//     username:String,
//     password:String  
//});
//
//var user = mongoose.model('emp',Schema);

passport.use(new passportLocal.Strategy(function(username, password,done){
	console.log("enterred to check userid and password ");
	if(username === password){
		console.log("user name id matched")
	   done(null,{id:username, name:username});
	   
	}
	   else 
		   {
		   done(null,null);
		   }
	
}));

// all environments, 

app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  mongoose.connect('mongodb://ratan123:ratan123@ds049130.mongolab.com:49130/yourdb');
}

passport.serializeUser(function(user,done)
{
	done(null,user.id);
	});

passport.deserializeUser(function(id,done){
	done(null,{id:id, name:id});
	});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/graphFBapi/:path',checklogin,routes.graphFBapi); // GET API to access facebook Graph.
app.get('/getCalciApi',checklogin,routes.getCalciApi);
app.post('/postcalciApi',checklogin,routes.postcalciApi);
app.get('/Counters',checklogin,routes.getCounters);
app.get('/proxyfb',checklogin,routes.proxyfb);
//app.post('/newUser',function(req,res){
//	new user({
//		
//		_id:req.body.username,
//		username:req.body.username,
//		password:req.body.password,
//	}).save(function(err,doc){
//		if (err)
//			
//			res.send(err);
//			}
//	);
//});

app.post('/login',passport.authenticate('local'),function(req,res){
	console.log("login successful");
	console.log(user);
	res.end();
	});


	
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
