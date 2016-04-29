var http = require('http'),
	 fs = require("fs"),
	dbUrl = 'localhost/quiz',
	collections = ['questions'];
var express = require('express'),
	app = express();
var dm=require('../../model/dataModel.js');
var bodyParser = require('body-parser');
var db = require('mongojs').connect(dbUrl, collections);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.entry=function(req, resp){
	resp.sendfile("./modules/admin/entry.html");	
};
exports.insertForContestant=function(req, resp){
	var qId='quiz_'+new Date().getTime();
	var qList = req.body;
	console.log("qList: " + JSON.stringify(qList));
	var quizSet1=new dm.quizSet(qId,qList);
	console.log("qListSet:"+ JSON.stringify(quizSet1));

}
exports.insert=function(req, resp){
	var data = req.body;
	var count=0;
	try{
		db.questions.count(function(err,cnt){
			count=cnt;
			count++;
			var qz=new dm.quiz(count,data.type,data.difficulty,data.options,data.que);
			db.questions.save(qz);
			resp.end("success");
		});
	}catch(e){
		resp.end("failed");
	}
};

exports.questions=function(req,resp){
	db.questions.find(function(err,ques){
		if(err){
			cosole.log("Problem while fetching data");
		} else{
			console.log(ques);
			var data=JSON.stringify(ques);
			console.log(data);
			resp.end(data);
			
		}
	});
}

exports.load=function(req,resp){
	try{
		db.questions.count(function(err,cnt){
			if(cnt==0){
				console.log("Load data file");
				var remaining = '';
				fs.readFile("./model/test.json", 'utf-8', function(err, data) {
					console.log(data);
					remaining += data;
				    var index = remaining.indexOf('\n');
				    var lc=1;
					while (index > -1) {
						var line = remaining.substring(0, index);
						saveToDb(line);
						remaining = remaining.substring(index + 1);
						index = remaining.indexOf('\n');
						lc++;
				    }
				    saveToDb(remaining);
				});
			}
			resp.sendfile("./modules/admin/init.html");
		});
	}catch(e){
		resp.end("failed");
	}
}

var saveToDb=function(line){
	if(line.trim()!=''){
		console.log("saving..\n" + line);
		db.questions.save(JSON.parse(line));
		console.log("saved!!");
	}
}
exports.backup=function(req,resp){
	db.questions.find(function(err,ques){
		if(err){
			cosole.log("Problem while fetching data");
		} else{
			console.log(ques);
			var fileData="";
			ques.forEach(function(question){
				var data=JSON.stringify(question);
				var res = data.replace(/"_id":"[^,]*,/g, "");
				console.log(res+"\n\n");
				fileData=fileData+res+"\n";
			});
			fs.writeFile("./model/test.json", fileData, function(err) {
				if(err) {
					return console.log(err);
				}
				console.log("The file was saved!");
			});
			resp.end("Saved");
		}
	});
}