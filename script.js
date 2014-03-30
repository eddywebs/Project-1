var scrollTotal = 1000;
var scrolled = 0; // A variable to keep track of how far we've scrolled.
var fractionScrolled = scrolled / scrollTotal;

var downTriangle = document.getElementById("next-triangle");

downTriangle.addEventListener("click", downClickHandler, false);

// You can read more about the mosuewheel event at https://developer.mozilla.org/en-US/docs/DOM/DOM_event_reference/mousewheel
if (document.addEventListener) {
	document.addEventListener("mousewheel", MouseWheelHandler, false);
}


var waypoints = document.getElementsByClassName('waypoint');
for (i = 0; i < waypoints.length; i++) {
	// Here we attach a handler to the click event for every waypoint,
	// https://developer.mozilla.org/en-US/docs/Web/Reference/Events/click
	waypoints[i].addEventListener("click", waypointClickHandler, false);
}

function updateWaypoints() {
	fractionScrolled = scrolled / scrollTotal;

	// 0 <= fractionScrolled <= 1, so *10 gives us 10; Math.floor rounds down
	var whichWaypoint = Math.max(0, Math.floor(fractionScrolled * 10) - 1);

	for (i = 0; i < 10; i++) {
		// Notice we constructed our li#id names to make this easy
		var currentWaypoint = document.getElementById('waypoint-' + i);
		
		if ( i == whichWaypoint ) {
			currentWaypoint.classList.add('active-waypoint');
		}
		
		else {
			currentWaypoint.classList.remove('active-waypoint');
		}
	}

	// Seek to the proportional time of the 38s clip of Bey's "Countdown"
	document.getElementById('Countdown').currentTime = fractionScrolled * 38.0;
	document.getElementById('detail').getElementsByTagName('H1')[0].innerHTML= "Playback time at: "+document.getElementById('Countdown').currentTime+"s";
}

function downClickHandler(e){
	var currentActiveWayPoint = document.getElementsByClassName("active-waypoint");
	//find the div of the with active-waypoint class
	for(i=0; i<10;i++){
		if(document.getElementById("waypoint-"+i)===currentActiveWayPoint[0]){
			console.log("boo yeah"+i);
			break;
		}
			
	}
	
	scrolled = (i+2)*100;
			updateWaypoints();

	//updateWaypoints();
	//waypointClickHandler(e);
	console.log(scrolled);
}

function waypointClickHandler(e) {
	
	console.log('click');
	for (i = 0; i < waypoints.length; i++) {
		if (waypoints[i] === this) {
		//if(waypoints[i] ===)
			scrolled = (i+1)*100;
			updateWaypoints();
			console.log(scrolled);
		}
	}
}


function MouseWheelHandler(e) {
	// This function is called every time there's a mousewheelevent

	var rawScrolled = Math.max(-1, Math.min(1, e.wheelDelta));
	scrolled = Math.min(Math.max(0, scrolled - rawScrolled), scrollTotal);

	document.getElementsByTagName('header')[0].innerHTML = scrolled;
	
	updateWaypoints();
}