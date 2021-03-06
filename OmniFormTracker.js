//JavaScript Document
/*
<<<<<<< Updated upstream
Code Name: OmniFormTracker 1.2.2
=======
Code Name: OmniFormTracker 1.2.3
>>>>>>> Stashed changes
Code URI: https://github.dowjones.net/martzz/OmniFormTracker
Description: JavaScript Tracks all form processes on a page and creates a path. Once page leaves on (Refresh, Navigate, Form Submit) send list to omniture.
Author: Zachary A. Martz
Author URI: http://www.zamartz.com
Version: 1.0.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Tags: omniture, form, field, tracking, analytics
*/
var omniFormPath;
var linkName;
var currentId;
var focusedElement;
var clickElement;
var errorflagclass = "error";

// Watches for page to be leaft
window.onbeforeunload = function() {
	//Send Event Before Page Leaves
	if (omniFormPath){
	submitomniFormPath(event,omniFormPath);
	}
	return null;
};

// Looks for someone to click on field
document.addEventListener("focus", function(e) {
    focusedElement = e.event;
	// check if input
	runFocusCheck();
}, true);
document.addEventListener("blur", function(e) {
    focusedElement = null;
	focusedElementBlur = e.event;
	//logErrorFieldsBlur(focusedElementBlur);
}, true);
// Looks for button click
document.addEventListener("click", function(e) {
    clickElement = e.event;
	// check if button
	runErrorCheck();
}, true);

// Check if form fileds have focus
function runFocusCheck(focusedElement){
 	//get active element tag name
	theTag = document.activeElement.tagName;
	if (theTag == "INPUT" || theTag == "SELECT" || theTag == "TEXTAREA" || theTag == "BUTTON" ){
		var theReportItem;
		//get ID and Name of tag
		currentId = document.activeElement.getAttribute("id");
		currentName = document.activeElement.getAttribute("name");
		//check if has Name or Id
		if (currentId || currentName){ 
			if (currentId){theReportItem = currentId; }
			else{theReportItem = currentName; }
		}else{ theReportItem = "No ID or NAME";}
		//add to form path
		if (omniFormPath){
		omniFormPath += " | ";
		omniFormPath += theReportItem;
		}else{omniFormPath = theReportItem; }
		console.log(omniFormPath);
	}
}

// Check if button was clicked
function runErrorCheck(clickElement){
 	//get active element tag name
	theTag = document.activeElement.tagName;
	//theClasses = document.getactiveElement.getAttribute("class")
	if (theTag == "BUTTON" ){
		logErrorFields();
		console.log(omniFormPath);
	}
}

// Log errors on form submission designated with a "*"
function logErrorFields(){
	var i;
	theClasses = document.getElementsByClassName(errorflagclass), i;
	for (i in theClasses) {
		console.log(i);
		if(theClasses[i].getAttribute){
			theReportItem = theClasses[i].getAttribute("id");
			if (omniFormPath){
			omniFormPath += " | * ";
			omniFormPath += theReportItem;
			}else{omniFormPath = "* "; omniFormPath += theReportItem; }
		}
	}	
}

// What to send to Omniture
function omniFormPath(){
		submitomniFormPath(event,omniFormPath);
};

// Send to Omniture function
function submitomniFormPath(event,omniFormPath){
	console.log(event,omniFormPath);
    var fullurl = document.location.href
  	var baseurl = document.location.protocol +'//' + document.location.host + document.location.pathname;
   	s.prop5 = baseurl;
  	s.prop6 = fullurl;
	//SEND SPECIFIC PROPS
    /*s.linkTrackVars = 'prop5,prop6,events';*/
	//SENDS ALL ON PAGE
	s.linkTrackVars = '';
	s.linkTrackEvents = event;
    s.events = event;
	s.tl(true, 'o', omniFormPath);
};

