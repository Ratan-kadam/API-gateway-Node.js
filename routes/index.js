
/*
 * GET home page.
 */
 var https=require('http');
 var http = require('http');
 var storage=require('./storage');
 var BlackIPflag= 0;
 
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

function checkValidIP(ip)
{
	
	console.log("Enterred into check:");
	console.log(ip);
	for(var i=0; i<= storage.blacklistIP.length; i++)
		{
		if(storage.blacklistIP[i]=== ip)
			{
			  console.log("black Listed IP found");
			  BlackIPflag = 1;
			}
		
		}
}


exports.execap1=function(req,res){
	storage.getCounter= storage.getCounter+1;
	Console.log("storage Count:" + getCounter);
	console.log("Enterred:");
	var host = 'http://localhost:3000/getJson';
	console.log("Enterred2:");
	
	 var options = {
			    host: host,
			    method:'GET'
			  };
	 
	 https.get('http://localhost:3000/getJson', function(res1){
		 console.log("Enterred3::::::::::::::");
		 res.type('application/json');
	     res.send(res1);
	     res.end();
	 });
};

exports.postcalciApi= function(req,res1)
{
   console.log("Entered to Proxy calculate function");
   var js;
   var input1 = req.param('input1');
   var input2 = req.param('input2');
   var operation = req.param('operation');
   //var input3 = "" input1"
   console.log(input1);
   console.log(input2);
   console.log(operation);
   // data collected .. now need to hit api - http://localhost:3000/calculate

   
   var post_req  = null,
       post_data = '{"input1": "'+input1+'","input2": "'+input2+'","operation": "'+operation+'"}';
   console.log(" b4 post_data");   
   console.log(post_data);
      

   console.log(post_data);
   var post_options = {
       hostname: 'localhost',
       port    : '3000',
       path    : '/calculate',
       method  : 'POST',
       headers : {
           'Content-Type': 'application/json',
           'Cache-Control': 'no-cache',
           'Content-Length': post_data.length
       }
   };

   post_req = http.request(post_options, function (res) {
       console.log('STATUS: ' + res.statusCode);
       console.log('HEADERS: ' + JSON.stringify(res.headers));
       res.setEncoding('utf8');
       res.on('data', function (chunk) {
           console.log('Response111: ', chunk);
           js= JSON.stringify(chunk);
           console.log(js);
            //res1.send("sending from post block ");
            console.log("+++++Printing response JS:");
            
           console.log(js);
            
            res1.send(JSON.parse(js));
            res1.end();
       }); // closing res.on
   }); // closing hhtp request.

   post_req.on('error', function(e) {
       console.log('problem with request: ' + e.message);
   });

   post_req.write(post_data);
   console.log("post_req");
   console.log(post_req);
   post_req.end();
  
   
};

//////////////////////////////////////////////////////////////////
exports.getCalciApi= function(req,res1)
{
   console.log("Entered to Proxy get function");
   var http = require('http');
  
		   var options = {
			       hostname: 'localhost',
			       port    : '3000',
			       path    : '/getJson',
			       method  : 'GET',
			       headers : {
			           'Content-Type': 'application/json',
			           'Cache-Control': 'no-cache' 
			       }  
   };

   var req1 = http.get(options, function(res) {
     console.log('STATUS: ' + res.statusCode);
     console.log('HEADERS: ' + JSON.stringify(res.headers));

     // Buffer the body entirely for processing as a whole.
     var bodyChunks = [];
     res.on('data', function(chunk) {
       // You can process streamed parts here...
    	 console.log("chunk");
    	 console.log(chunk);
       bodyChunks.push(chunk);
     }).on('end', function() {
       var body = Buffer.concat(bodyChunks);
       console.log('BODY: ' + body);
      res1.type('application/json');
//       
       res1.send(body);
//       res.end();
       // ...and/or process the entire body here.
     });
   });

   req.on('error', function(e) {
     console.log('ERROR: ' + e.message);
   });
  
   
};

////////////////////////////////////////////////////////////////////////////////////////
exports.graphFBapi= function(req,res1)
{
	
	console.log("request.connection.remoteAddress:");
	console.log(req.connection.remoteAddress);
	checkValidIP(req.connection.remoteAddress);
	console.log("after check resume" + BlackIPflag);
if (BlackIPflag === 0)
{	
	console.log("fb path to hit:");
	//console.log(req.param("path"));
	var path1 = "'/" + req.param("path") + "'";
	console.log(path1);
	
	
	storage.getCounter= storage.getCounter+1;
	console.log("storage Count:" + storage.getCounter);
   console.log("Entered to facebook function");
   storage.getCounter= storage.getCounter+1;
	console.log("storage Count:" + storage.getCounter);
  //console.log("Entered to facebook function");
  var http = require('http');
 
		   var options = {
			       hostname: 'graph.facebook.com',
			       path    : "/" + req.param("path"),
			       method  : 'GET',
			       headers : {
			           'Content-Type': 'application/json',
			           'Cache-Control': 'no-cache' 
			       }  
  };

  var req1 = http.get(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));

    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
    res.on('data', function(chunk) {
      // You can process streamed parts here...
   	 console.log("chunk");
   	 console.log(chunk);
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      console.log('BODY: ' + body);
     res1.type('application/json');    
      res1.send(body);
    });
  });

  req.on('error', function(e) {
    console.log('ERROR: ' + e.message);
  });

}// endIF 
else 
	{
     BlacklistIP=0; // resetting the flag.
	 res1.send("403- Access forbidden");
	 
	}


  
};

////////////////////////////////////////////////////////////////
exports.getCounters=function(req,res){

	var response = {
		"getCounter" : storage.getCounter,	
		"postCounter" : storage.postCounter
	};

	//--------------------------------------------------------------------------
	console.log("You Have called post api : " + storage.postCounter + "times.");
	console.log("You Have called put api : " + storage.putCounter + "times.");
	console.log("You Have called delete api : " + storage.deleteCounter + "times.");
	res.send(JSON.stringify(response));
};
///////////////////////////////////////////////////////////////
exports.hitApi= function(req,res1)
{
	console.log("hit Api collected :");
	console.log(req.param("hitApi"));
	 
	//int s= @named("hitApi");
   console.log("Entered to Proxy get function");
   var http = require('http');
  
		   var options = {
			       hostname: 'localhost',
			       port    : '3000',
			       path    : '/getJson',
			       method  : 'GET',
			       headers : {
			           'Content-Type': 'application/json',
			           'Cache-Control': 'no-cache' 
			       }  
   };

   var req1 = http.get(options, function(res) {
     console.log('STATUS: ' + res.statusCode);
     console.log('HEADERS: ' + JSON.stringify(res.headers));

     // Buffer the body entirely for processing as a whole.
     var bodyChunks = [];
     res.on('data', function(chunk) {
       // You can process streamed parts here...
    	 console.log("chunk");
    	 console.log(chunk);
       bodyChunks.push(chunk);
     }).on('end', function() {
       var body = Buffer.concat(bodyChunks);
       console.log('BODY: ' + body);
      res1.type('application/json');
//       
       res1.send(body);
//       res.end();
       // ...and/or process the entire body here.
     });
   });

   req.on('error', function(e) {
     console.log('ERROR: ' + e.message);
   });
  
   
};

///////


exports.proxyfb= function(req,res1)
{
   console.log("Entered to Proxy facebook function");
   var http = require('http');
  
		   var options = {
			       hostname: 'graph.facebook.com',
			      // port    : '3000',
			       path    : '/ratan.kadam',
			       method  : 'GET',
			       headers : {
			           'Content-Type': 'application/json',
			           'Cache-Control': 'no-cache' 
			       }  
   };

   var req1 = http.get(options, function(res) {
     console.log('STATUS: ' + res.statusCode);
     console.log('HEADERS: ' + JSON.stringify(res.headers));

     // Buffer the body entirely for processing as a whole.
     var bodyChunks = [];
     res.on('data', function(chunk) {
       // You can process streamed parts here...
    	 console.log("chunk");
    	 console.log(chunk);
       bodyChunks.push(chunk);
     }).on('end', function() {
       var body = Buffer.concat(bodyChunks);
       console.log('BODY: ' + body);
      res1.type('application/json');    
       res1.send(body);
     });
   });

   req.on('error', function(e) {
     console.log('ERROR: ' + e.message);
   });
  
   
};

/////////////////////////////////////////





