$(document).ready(function(){
	//initialize the password match boolean variable
	var isPasswordMatched = false;

	// function to validate user input on the login
	function validateUserInput() {
		//initilize a boolean variable and set it to true
		var validInput = true;
		//loop through each user input.
		$(".userInput").each(function() {
			//if any value is empty
		    if ( $(this).val() === "" ){
				//change validInput boolean to false
				validInput = false;
			}
		});
		//return boolean value
		return validInput;
	} // validateUserInput function ends here.

//===============XXXXXXXXXXX===========================

	//function to validate username input when creating a profile
	function validateUserNameInput() {
		//initilize a boolean variable and set it to true
		var validInput = true;
			//loopthrough the input
			$(".userNameInput").each(function() {
				//if the input value is empty
				if ( $(this).val() === "" ){
					//set the boolean to false
					validInput = false;
				}
			});
		return validInput;
	} // validateUserNameInput function ends here
	// body...

//===============XXXXXXXXXXX===========================

	//checks if the user name is available
	$("#checkUsername").on("click", function(){
		//if the user has input a username
		if(validateUserNameInput() === true){

			// console.log("HRLLO");

			// initialize an object variable with the user input value
			var userNameObj = { 
				userName: $("#userName").val().trim()
			}

			// console.log(userNameObj);

			// make a call to the server to check the username in the database
			$.post("/checkUserName", userNameObj, function(data){
				//Graping Result
				// if the server returns a value
				if(data){
					//tell the user the error. Server will return something along
					// the lines of "username is already taken"
					$("#isUsernameAvailable").html(data.error);
				}
			});
		}
		else{
			// if the username validation returns false, ask the user to input
			// proper username.
			$("#isUsernameAvailable").html("Please Select a username, 5-8 characters long.");
		}
	}); //check username function ends here

//===============XXXXXXXXXXX===========================

	//checks if the passwords match, when creating a profile.
	$("#reTypePassword").on("keyup", function(){

		// original password input
		var password1 = $("#password").val().trim();
		// retype passwword input
		var password2 = $("#reTypePassword").val().trim();
		// if the two strings match
		if(password1 == password2){
			//show the user that the passwords matched
			$("#isUsernameAvailable").html("Password match!");
			//change the passwordMatched boolean to true
			isPasswordMatched = true;
		}
		// if the two strings are different
		else{
			// tell the user that the passwords do not match
			$("#isUsernameAvailable").html("Your Password do not match!")
			// keep the passwodMatched boolean to false.
			isPasswordMatched = false;
		}
	});

//===============XXXXXXXXXXX===========================

	$("#createProfile").on("click", function(){
		
		// console.log("inside on click");
		// console.log(validateUserInput());
		// console.log(isPasswordMatched);

		// create an object with all the user inputs
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

		// check if the userInput and the isPasswordMatched variables are true
		if(validateUserInput() === true && isPasswordMatched == true){
			// console.log("inside validation");
			// console.log(validateUserInput());
			// console.log(isPasswordMatched);

			// create an object variable with the user's phone number
			var phoneObj ={ phone: $("#phone").val().trim()};
	
			// call the authentication function from the server
			$.post("/requestSms", phoneObj, function(data){

				//if sms successfully sent!
				if(data){

					// console.log("inside if data" + (data));
					// if the data return with value of true, i.e. e-mail succesfully sent.
					if(data.success){

						//console.log("inside if data.success" + (data.success));
						
						//show empty box where user will input validation code
						$("#token").val("");
						//empty space where user will see the result of validation
						$("#isRightPhone").empty();
						//show validation modal
						$("#verifyPhoneToken").modal();
						// when user clicks on the validate button
						$("#tokenVerification").on("click", function(){
							// take the user input code from the input box
							newUser.token = $("#token").val().trim();
							
							// console.log("afrer token" + newUser);

							// make a server call to create the profile
							$.post("/createProfile", newUser, function(data){
								// console.log("/createProfile");
								newUser={};

								// console.log("beofre if");

								// console.log(data);
								// if the call successfully returns data, and there is an error
								if((data)&&(data.error)){
									// console.log("GOT ERROR");
									// show the user what the error is
									$("#isRightPhone").html(data.error);
								}else{
									// console.log("before window");
									// otherwise store the data on the page
									window.location = data;
								}
								// console.log("outside");		
							});
						});//token
					}//if(data success)
					//if 200
					// i.e. sms was not sent successfully
					else{
						//show the user the error
						$("#isRightInput").html(data.error);
					}
				}
			}); //post sms
		}
		// if username and password input validation is false.
		else{
			// ask the user to verify his/her inputs
			$("#isRightInput").html("Please verify your input and try again");
		}
	});

//===============XXXXXXXXXXX===========================	
	// when the user clicks the login button
	$("#login").on("click", function(){
		// validate the user input to make sure input boxes are not left empty.
		if(validateUserInput() === true){
			// store the userinput in an object variable.
			var returnedUser = {
				userName : $("#userName").val().trim(),
				password : $("#password").val().trim()
			}

			// make a server call to login. Server code would verify the input
			// and return error if username is not found, or the password doesn't match.
			$.post("/loggedIn", returnedUser, function(data){
				// if error
				if(data.error){
					//show the user the error.
					$("#loginResult").html(data.error);
				} 
				// if no error
				else {
					//store the data received, i.e. userinformation to the window (cookies)
					window.location = data;
				}
						
			});	
		}
		// if the user leaves the username or password input box empty.
		else {
			//ask the user to input the values
			$("#loginResult").html("Please enter your username and password to login");
		}
	});
}); //ready
