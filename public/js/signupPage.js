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

		var newUser = {
				userName: $("#userName").val().trim(),
				password: $("#password").val().trim(),
				firstName: $("#firstName").val().trim(),
				address_1: $("#address_1").val().trim(),
				address_2: $("#address_2").val().trim(),
				city: $("#city").val().trim(),
				state: $("#state").val().trim(),
				zipCode: $("#zipCode").val().trim(),
				country: $("#country").val().trim(),
				phone: $("#phone").val().trim(),
				email: $("#email").val().trim(),
				token: ""			
			}


		if(validateUserInput() === true){

		var phoneObj ={ phone: $("#phone").val().trim()};
	

		$.post("/requestSms", phoneObj, function(data){

			//if sms successfully sent!
		
			if(data){

				console.log("inside if data" + (data));

				if(data.success){

					console.log("inside if data.success" + (data.success));
			

		$("#token").val("");
		$("#isRightPhone").empty();

		$("#verifyPhoneToken").modal();

		

		
		$("#tokenVerification").on("click", function(){

			newUser.token = $("#token").val().trim();
			
			console.log("afrer token" + newUser);

			$.post("/createProfile", newUser, function(data){
				console.log("/createProfile");

				newUser={};

				console.log("beofre if");

				console.log(data);

				if((data)&&(data.error)){
					console.log("GOT ERROR");

					$("#isRightPhone").html(data.error);
				}else{
					console.log("before window");
					window.location = data;
				}
				console.log("outside");		
			});

		});
		}//if(data)
		//if 200
		else{
			//if the sms was not sent successfully
			$("#isRightInput").html(data.error);
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

				} else {
					window.location = data;
				}
						
			});	

		}else{

			$("#loginResult").html("Please Fill out the missing input");

		}

	})






}); //ready
