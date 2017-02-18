var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Message = mongoose.model('Message', {
	msg: String
});

app.use(bodyParser.json());

app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
})


mongoose.connect("mongodb://localhost:27017/test", function(err,db){
	if(!err){
		console.log("We are connected to mongo");
	}
})

app.get('/api/message', GetMessages);

app.post('/api/message', function(req,res) {
	console.log(req.body);
	//database.collection('messages').insertOne(req.body);
	var message = new Message(req.body);
	message.save();
	res.status(200);
})

function GetMessages(req, res){
	Message.find({}).exec(function(err, result){
		res.send(result);
	})
}

var server = app.listen(5000, function() {
	console.log('listening on port', server.address().port);
})