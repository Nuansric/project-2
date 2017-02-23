$(document).ready(function(){

	
function validateUserInput() {
	var validInput = true;
		  $(".userInput").each(function() {
		    if ( $(this).val() === "" )
		        validInput = false;
		  });
		  return validInput;
	}

function validateUserNameInput() {
	var validInput = true;
		  $(".userNameInput").each(function() {
		    if ( $(this).val() === "" )
		        validInput = false;
		  });
		  return validInput;
	}


	// body...

$("#checkUsername").on("click", function(){

	if(validateUserNameInput() === true){

	console.log("HRLLO");

	var userNameObj = { 
		userName: $("#userName").val().trim()
	}

	console.log(userNameObj);

	$.post("/checkUserName", userNameObj, function(data){

				//Graping Result

		if(data){
			$("#isUsernameAvailable").html(data.error);
		}


	});
}else{

		$("#isUsernameAvailable").html("Please Select a username, 5-8 characters long.");


}
});
	$("#createProfile").on("click", function(){

		if(validateUserInput() === true){

		console.log("hey0")
		var phoneObj ={ phone: $("#phone").val().trim()};
		console.log("hey1");

		$.post("/requestSms", phoneObj, function(data){

			console.log("hey"+ data);

			if(data){
				if(data.success){
			

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

				if(data.error){

					$("#isRightPhone").html(data.error);
				}
						
			});

		});
		}//if(data)
		//if 200
		else{
			//if the sms was not sent successfully
			$("#isRightInput").html("The phone Number you entered needs to be a 10 digits cell phone");
		}
	}

		});
	}else{
			$("#isRightInput").html("Please Fill out the missing input");
	}
	});

	$("#login").on("click", function(){


		if(validateUserInput() === true){


			var returnedUser = {
				userName : $("#userName").val().trim(),
				password : $("#password").val().trim()
			}

			$.post("/loggedIn", returnedUser, function(data){

				if(data.error){
					
					$("#loginResult").html(data.error);

				};


						
			});	

		}else{

			$("#loginResult").html("Please Fill out the missing input");

		}

	})






}); //ready
