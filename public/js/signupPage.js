$(document).ready(function() {
	// body...

$("#checkUsername").on("click", function(){

	var userNameObj = { 
		userName: $("#userName").val().trim()
	}

	$.post("/checkUserName", userNameObj, function(data){

				//Graping Result

		if(data){
			$("#isUsernameAvailable").html("This username is already taken. Please pick a new one!");
		}else{
			$("#isUsernameAvailable").html("Username Available!");
		}


	});

});

$("#createProfile").on("click", function(){

	$("#matchedResult").modal();
	
	$("#tokenVerification").on("click", function(){
	
	var newUser = {
		userName: $("#userName").val().trim(),
		password: $("#password").val().trim(),
		firstName: $("#firstName").val().trim(),
		address_1: $("#address_1").val().trim(),
		address_2: $("#address_2").val().trim(),
		city: $("#city").val().trim(),
		state: $("#state").val().trim(),
		country: $("#country").val().trim(),
		phone: $("#phone").val().trim(),
		email: $("#email").val().trim(),
		token: $("#token").val().trim()
	}

$.post("/createProfile", newUser, function(data){

	if(data.isSent === false){
		$("#isRightPhone").html("The phone Number you entered needs to be a 10 digits cell phone");
	}else if (data.isCorrect === false){
		$("#isRightPhone").html("Invalid Code! Try Again...");
	}else if (data.isCreated === false){
		$("#isRightPhone").html("Invalid Address! Try Again...");
	}

				//Graping Result

		// if(data){
		// 	$("#isUsernameAvailable").html("This username is already taken. Please pick a new one!");
		// }else{
		// 	$("#isUsernameAvailable").html("Username Available!");
		// }


	// });

});

}

});
















})