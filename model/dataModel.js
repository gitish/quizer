exports.user=function user(email,pass,role,status){
	this.email=email;
	this.pass=pass;
	this.role=role;
	this.status=status;
};

exports.options=function options(id,text,isCorrect){
	this.id=id;
	this.text=text;
	this.isCorrect=isCorrect;
};

exports.question=function question(id,type,difficulty,options,que){
	this.id=id;
	this.type=type;
	this.difficulty=difficulty;
	this.options=options;
	this.que=que;
};

exports.answer=function question(options,que){
	this.options=options;
	this.que=que;
};

exports.option=function option(id,text,isCorrect){
	this.id=id;
	this.text=text;
	this.isCorrect=isCorrect;
};

exports.quiz=function quiz(id,type,difficulty,options,que){
	this.id=id;
	this.type=type;
	this.difficulty=difficulty;
	this.options=options;
	this.que=que;
};

exports.quizSet=function quizSet(id,queIds){
	this.id=id;
	this.queIds=queIds;
};