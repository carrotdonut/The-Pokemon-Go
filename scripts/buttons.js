/*
Name:			Kelly Jia
File:			buttons.js
Class:			TEJ4M1-01
Date:			January 13, 2016
Description:	This program implements touch events to the buttons created in the HTML file to control the
				Boe-Bot. It contains all the maneuver functions (forward, left forward, right forward, etc)
				that calls the corresponding Python macro/function, which actually controls the Raspberry Pi
				pins. In this program, the bot can only move/turn if the forward or backward button is being pressed
*/

//global variables that hold the state of the forward button and the backward button
//(the boe-bot can only move when one of those buttons is pressed)
var ifForward = false;
var ifBackward = false;

//The function that is automatically called when the WebIOPi server is booted up and ready
webiopi().ready(function(){

	//Get the div element/button from the HTML file with the id "leftBtn"
	//When the left button is pressed, call the function "leftOn"
	//When the left button is released, call the function "leftOff"
	var left= document.getElementById("leftBtn"); 
	left.addEventListener("touchstart",leftOn); 
	left.addEventListener("touchend",leftOff); 
	
	//Get the div element/button from the HTML file with the id "rightBtn"
	//When the right button is pressed, call the function "rightOn"
	//When the right button is released, call the function "rightOff"
	var right= document.getElementById("rightBtn"); 
	right.addEventListener("touchstart",rightOn); 
	right.addEventListener("touchend",rightOff); 
	
	//Get the div element/button from the HTML file with the id "forwardBtn"
	//When the forward button is pressed, call the function "goForward"
	//When the forward button is released, call the function "forwardStop"
	var forward = document.getElementById("forwardBtn");
	forward.addEventListener("touchstart",goForward); 
	forward.addEventListener("touchend",forwardStop);  
	
	//Get the div element/button from the HTML file with the id "upBtn"
	//When the up button is pressed, call the function "goForward"
	//When the up button is released, call the function "forwardStop"
	//Performs the same function as the forward button
	var up = document.getElementById("upBtn");
	up.addEventListener("touchstart",goForward); 
	up.addEventListener("touchend",forwardStop);  	
	
	//Get the div element/button from the HTML file with the id "backwardBtn"
	//When the backwards button is pressed, call the function "goBackward"
	//When the backwards button is released, call the function "backwardStop"
	var backwards = document.getElementById("backwardBtn");
	backwards.addEventListener("touchstart",goBackward); 
	backwards.addEventListener("touchend",backwardStop); 

	//Get the div element/button from the HTML file with the id "downBtn"
	//When the down button is pressed, call the function "goBackward"
	//When the down button is released, call the function "backwardStop"
	//Performs the same function as the backward button
	var down = document.getElementById("downBtn");
	down.addEventListener("touchstart",goBackward); 
	down.addEventListener("touchend",backwardStop); 

});

//lefton() function
//Called when the left button is pressed
//When the left button is pressed, call the leftF (left forward) macro if the forward button is also pressed,
//call the leftB (left backward) macro if the backward button is pressed, and if the forward and backward button is
//not pressed, then stop the bot
function leftOn()
{
	if (ifForward)
	{
		webiopi().callMacro("leftF");
	}
	else if (ifBackward)
	{
		webiopi().callMacro("leftB");
	}
	else
	{
		webiopi().callMacro("stop");
	}
}

//leftOff() function
//Called when the left button is released
//When the left button is released, call the forward macro if the forward button is still being pressed,
//call the backward macro if the backward button is still being pressed, and stop the bot if none of those
//buttons are being pressed
function leftOff()
{
	if (ifForward)
	{
		webiopi().callMacro("forward");
	}
	else if (ifBackward)
	{
		webiopi().callMacro("backward");
	}
	else
	{
		webiopi().callMacro("stop");
	}
}

//rightOn() function
//Called when the right button is pressed
//When the right button is pressed, call the rightF (right forward) macro if the forward button is also pressed,
//call the rightB (right backward) macro if the backward button is pressed, and if the forward and backward button is
//not pressed, then stop the bot
function rightOn()
{
	if (ifForward)
	{
		webiopi().callMacro("rightF");
	}
	else if (ifBackward)
	{
		webiopi().callMacro("rightB");
	}
	else
	{
		webiopi().callMacro("stop");
	}
	
}

//rightOff() function
//Called when the right button is released
//When the right button is released, call the forward macro if the forward button is still being pressed,
//call the backward macro if the backward button is still being pressed, and stop the bot if none of those
//buttons are being pressed
function rightOff()
{
	if (ifForward)
	{
		webiopi().callMacro("forward");
	}
	else if (ifBackward)
	{
		webiopi().callMacro("backward");
	}
	else
	{
		webiopi().callMacro("stop");
	}
}

//goForward() function
//Called when the forward/up button is pressed
//Changes the ifForward variable to true and calls the forward macro
function goForward()
{
	ifForward = true;
	webiopi().callMacro("forward");
}

//forwardStop() function
//Called when the forward/up button is released
//Changes the ifForward variable to false
//If the backward/down button is still being pressed, then call the backward macro. Else, stop the bot
function forwardStop()
{
	ifForward = false;
	if (ifBackward)
	{
		webiopi().callMacro("backward");
	}
	else
	{
		webiopi().callMacro("stop");
	}
}

//goBackward() function
//Called when the backward/down button is pressed
//Changes the ifBackward variable to true and calls the backward macro
function goBackward()
{
	ifBackward = true;
	webiopi().callMacro("backward");
}

//backwardStop() function
//Called when the backward/down button is released
//Changes the ifBackward variable to false
//If the forward/up button is still being pressed, then call the forward macro. Else, stop the bot
function backwardStop()
{
	ifBackward = false;
	if (ifForward)
	{
		webiopi().callMacro("forward");
	}
	else
	{
		webiopi().callMacro("stop");
	}
}

