var VK_ENTER = 13
var displayName = "???";

/**
 * Sends the given message to the server.
 * 
 * @param message the message to send to the server
 */
function sendChatMessage( message ) {
	
	//do not send empty messages to the chat server
	if ( message != "") {
		sendMessage( "<CHAT> " + displayName + ": " + message );
	}
}

/**
 * Triggered when the user presses a key with the message box
 * in focus. If the user pressed "Enter", then the message in the
 * message box will be sent to the server as a chatroom message.
 * 
 * @param e properties regarding the keypress event
 */
function txtMessage_KeyPress( e ) {
	if ( !e ) {
		e = window.event;
	}
	keycode = e.which || e.keycode;
	if ( keycode === VK_ENTER ) {
		cmdSend_Click();
	}
}

/**
 * Triggered when the user clicks "Send". Sends the user's message to the server.
 */
function cmdSend_Click() {
	var message = document.getElementById( "txtMessage" ).value;
	sendChatMessage( message );
	txtMessage.value = ""
}

/**
 * Logs the user out of the chatroom.
 */
function cmdLogout_Click() {
	window.location.href = "login.html"
	websocket.disconnect();
}

/**
 * Loads the user's display name onto the web page.
 */
function loadDisplayName() {
	var formInput = window.location.search;
	
	//replace all "+"s with " "s
	while( formInput.indexOf( "+" ) != -1 ) {
		formInput = formInput.replace( "+" , " " );
	}
	
	var username = formInput.substring( formInput.indexOf( "displayName=" )+12 , formInput.length );
	var lblDisplayName = document.getElementById( "lblDisplayName" );
	lblDisplayName.innerHTML = "Logged in as <span class=\"displayNameText\">" + username + "</span>";
	displayName = username;
	validateLogin();
}

/**
 * Allows the user to private message the given user.
 * 
 * @param username the user to private message
 */
function privateMessage( username ) {

	var message = prompt( "Enter message to: " + username );
	if ( message != null && message != "" ) {
		var txtChatHistory = document.getElementById( "txtChatHistory" );
		txtChatHistory.value += "PM to " + username + ": " + message + "\n";
		txtChatHistory.scrollTop = txtChatHistory.scrollHeight;
		sendMessage( "<PM>" + "\u00D0" + username + "\u00D0" + message );
	}
}
