var option=function option(text,isCorrect){
	this.text=text;
	this.isCorrect=isCorrect;
};

var answer=function question(que, options){
	this.options=options;
	this.que=que;
};

var currentQuestion = 0;
var displayQuestion = 0;
var correctAnswers = 0;
var quizOver = false;


var app = angular.module('quizApp',[]); // Taking Angular Application in Javascript Variable
app.controller('quizController',function($scope, $http){
	$scope.load = function(){
		$http.get('./quizList').success(function(questions){
			$scope.quizList = questions;
			$scope.quiz = questions[currentQuestion];
			
			var quiz = questions[currentQuestion];
			$scope.options = JSON.parse(quiz.options);
			
			$scope.finalList = [];
			$scope.submitButton = false;
			$scope.previousButton = false;
			$scope.nextButton = true;
			$scope.quizMessage = false;
		});
	};
	$scope.previous = function(){
		var questions = $scope.quizList;
		displayQuestion--;
		
		$scope.quiz = questions[displayQuestion];
		$scope.options = JSON
		.parse(questions[displayQuestion].options);
		
		if(displayQuestion === 0) {
			$scope.previousButton = false;
		}
		 
	};
	

	$scope.next = function() {
		var questions = $scope.quizList, selOption = '';
		if (!quizOver) {
			$scope.optionsList = [];
			optList = $scope.options;
			selOption = $scope.selected;

			if (selOption == '' | selOption == undefined) {
				// $scope.quizMessage = !$scope.quizMessage;
				alert("Please select any option");
			} else {
				// options = questions[currentQuestion].O;
				displayQuestion++;
				var singleObj = "";
				for ( var key in optList) {
					var val = optList[key];
					console.log("displayQuestion---"
							+ displayQuestion
							+ "--questions.length--"
							+ questions.length);

					if (selOption == val.text) {
						singleObj = new option(val.text, true);
						/*
						 * singleObj = { 'text' : val.text,
						 * 'isCorrect' : true };
						 */
					} else {
						singleObj = new option(val.text, false);
						/*
						 * singleObj = { 'text' : val.text,
						 * 'isCorrect' : false };
						 */
					}
					console.log('singleObj---' + singleObj);
					$scope.optionsList.push(singleObj);

					$scope.previousButton = true;
				}
				if (displayQuestion < questions.length) {
					console.log("display next question");
					$scope.quiz = questions[displayQuestion];
					$scope.options = JSON
							.parse(questions[displayQuestion].options);
				} else {
					quizOver = true;
					$scope.submitButton = true;
					$scope.nextButton = false;
					console.log(" quiz over");
				}

				var jsonArr = new answer(
						questions[currentQuestion].que,
						$scope.optionsList);
				$scope.finalList.push(jsonArr);
				currentQuestion++;
				console.log("finallist----"
						+ JSON.stringify($scope.finalList));
				$scope.selected = '';
			}

		} else {
			quizOver = true;
			$scope.submitButton = true;
			$scope.nextButton = false;
			console.log("Over!");
		}

	};
	
	
	$scope.saveQuiz = function() {
		
	   // var jdata = 'mydata='+JSON.stringify($scope.finalList);
		 var jdata = $scope.finalList;
		//$http.post('http://localhost:3000/saveQuiz', postData).success(function(data){
		 $http({
			method: 'POST',
			url:'/saveQuiz',
			data:jdata,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(response) { 
			console.log('success');
			$scope.quizMessage = true;
			$('.quizMessage').text('Success!!');
		}).error(function(response) { 
			console.log('error');
			$scope.quizMessage = true;
			$('.quizMessage').text('Error!!');
		});
		 //return false;
	};
	
	$scope.uploadQuiz = function() {
		
		$http.get('./uploadQuiz').success(function(questions){
			console.log('success');
			$scope.result = "Questions uploaded successfully. Click here to load!!";
			$scope.previousButton = false;
			});
	}; 
	
});
		
