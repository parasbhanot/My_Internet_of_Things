var app = angular.module('mainApp', ['ngRoute']);

app.config(function ($routeProvider){

	$routeProvider

	.when('/',{

		templateUrl : './partials/homepage.html'
	})

	.when('/MainRoom',{

		templateUrl : './partials/mainRoom.html'
	})

	.when('/kitchen',{
		templateUrl : './partials/kitchen.html'
	})

	.when('/allMonitors',{
		templateUrl : './partials/allMonitors.html'
	})

	.when('/allControls',{
		templateUrl : './partials/allControls.html',
		controller: "Control_script"
	})
	.otherwise({

		redirectTo : '/'
	});
});


///////////////

app.controller("Control_script",function($scope){

	var api ="WSMCMVFUJBI6Z115";
	var talkback_id ="7441";
	var command_id ="1151953";
	var position = "5";

	var commandON ="led_ON";
	var commandOFF ="led_OFF";

	var urlx ="https://api.thingspeak.com/talkbacks/"+talkback_id+"/commands/"+command_id+"?api_key="+api;



	$("#LightON").on("click", function(){

//$("#LightON").removeClass("btn-default").addClass("btn-primary active");
$("#LightON").toggleClass("btn-default btn-primary active");
$("#LightOFF").toggleClass("btn-primary active btn-default");

$.ajax({
	url: urlx,
	type: 'PUT',
    		//data: "command_string=OPENDOOR&position=5",
    		data:"command_string="+commandON+"&position="+position,
    		success: function() { alert('PUT completed'); }
    	});

});

	$("#LightOFF").on("click", function(){

		$("#LightOFF").toggleClass("btn-default btn-primary active");
		$("#LightON").toggleClass("btn-primary active btn-default");

		$.ajax({
			url: urlx,
			type: 'PUT',
    		//data: "command_string=OPENDOOR&position=5",
    		data:"command_string="+commandOFF+"&position="+position,
    		success: function() { alert('PUT completed'); }
    	});

	});


	$("#Sendbutton").on("click", function(){
		
		var customCommand =$("#customSend").val();

		$.ajax({
			url: urlx,
			type: 'PUT',
    		//data: "command_string=OPENDOOR&position=5",
    		data:"command_string="+customCommand+"&position="+position,
    		success: function() { alert('PUT completed'); }
    	});
		
	});



});