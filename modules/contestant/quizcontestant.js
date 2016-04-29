var http = require('http'),
	dbUrl = 'localhost/quiz',
	collections = ['questions', 'answer'];
var express = require('express'),
	app = express();
var bodyParser = require('body-parser');
var model=require('../../model/dataModel.js');
var db = require('mongojs').connect(dbUrl, collections);


exports.contesant=function(req, resp){
	resp.sendfile("./modules/contestant/quizcontestant.html");
	console.log("loading contesant page!!!");
	//resp.sendfile("mytest.html");
};


exports.quizList=function(req, resp){
	db.questions.find(function(err,questions){
		if(err){
		cosole.log("Problem while fetching data");
		} else{
			resp.end(JSON.stringify(questions));
			console.log(questions);
		}
	});
};


exports.quiz=function(req, resp){
	db.questions.find(function(err,questions){
		if(err){
		cosole.log("Problem while fetching data");
		} else{
			questions.forEach(function(question){
				resp.end(JSON.stringify(question));
				console.log(question);
			});
			
		}
	});
};


exports.saveQuiz= function(req, resp){
	console.log("saveQuiz");
	//resp.header("Access-Control-Allow-Origin", "http://localhost");
	//resp.header("Access-Control-Allow-Methods", "GET, POST");
	console.log(req.body);
	//var data = JSON.parse(req.body);
	var data = req.body;
	//db.answer.save([{"que":"Which one is not supported by OOP?","options":[{"text":"Abstraction","isCorrect":false},{"text":"Polymorphism","isCorrect":false},{"text":"Encapsulation","isCorrect":false},{"text":"Global variables","isCorrect":true}]},{"que":"Which of the following is synchronised?","options":[{"text":"Set","isCorrect":false},{"text":"Linked List","isCorrect":false},{"text":"Vector","isCorrect":true},{"text":"WeakHashmap","isCorrect":false}]},{"que":"Java programs are:","options":[{"text":"Platform-dependant","isCorrect":false},{"text":"Platform-independant","isCorrect":true},{"text":"Interpreter-dependant","isCorrect":false},{"text":"Interpreter-independant","isCorrect":false}]}]);
	db.answer.save(data);
	console.log("updated");
	/*db.questions.update(
			{_id:req.body.mydata.id,'options.text':req.body.mydata.selOption},
			{$set :{'options.isCorrect':'Y' }}
	);*/
	resp.end('Updated');
};



