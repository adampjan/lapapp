var startB;
var lapB;
var stopB;
var record = false;
//var numRacers = 1;
var raceDist = 3200;
var lapDist = 400;
var lapsLeft = raceDist/lapDist;
var lapNum = 0;
var startT;
var lastTime = 0;
var lapTimes = [];
var time = 0;
var projectedTime = 0;
var timeUI;
var projectedTimeUI;

window.onload = function(){
	timeUI = document.getElementById("timeUI");
	projectedTimeUI = document.getElementById("projectedTimeUI");

	startB = document.getElementById("startB");
	startB.onclick = start;
	
	lapB = document.getElementById("lapB");
	lapB.onclick = lap;
	
	stopB = document.getElementById("stopB");
	stopB.onclick = stop;
};


function start(){
	//numRacers = document.getElementById("racerCount").value;
	raceDist = document.getElementById("raceDistance").value;
	lapDist = document.getElementById("lapDistance").value;
	if (raceDist == ""){
	raceDist = 3200};
	if (lapDist == ""){
	lapDist = 400};
	lapsLeft = raceDist/lapDist;
	document.getElementById("lapLabel").innerHTML = "<b>Lap:</b>" + '<i font-size=5px> (x/' + lapsLeft.toFixed(0) + ")</i>";
	var div = document.getElementById("inputs");
	div.parentNode.removeChild(div);
	record = true;
	timeRace();
	//createAppUI();
}

function timeRace(){
	startT = Date.now();
	lastTime = 0;
	setInterval(function() {
		if (record){
			time = Date.now() - startT;
			timeUI.innerHTML = "Time: ".concat(formatTime(time));
		}
	}, 10);
}

function lap(){
	if (record) {
	lapNum += 1;
	lapsLeft -=1;
	var lapTime = time-lastTime;
	lapTimes.push(lapTime);
	
	projectedTime = 0;
	for (var i = 0; i < lapTimes.length; i++){
		projectedTime += lapTimes[i];
	}
	projectedTime += lapTimes[lapTimes.length - 1] * lapsLeft;
	projectedTimeUI.innerHTML = "Projected Time: ".concat(formatTime(projectedTime));
	var lapTimef = formatTime(lapTime);
	var timef = formatTime(time);
		var pace = formatTime((lapTime * 1609 / lapDist));
	
	var lapnode = document.createElement("li");
	var splitnode = document.createElement("li");
	var timenode = document.createElement("li");
	var pacenode = document.createElement("li");
lapnode.appendChild(document.createTextNode(String(lapNum)));
		splitnode.appendChild(document.createTextNode(lapTimef));
		timenode.appendChild(document.createTextNode(timef));
	pacenode.appendChild(document.createTextNode(pace));
	document.getElementById("laps").appendChild(lapnode);
	document.getElementById("laptimes").appendChild(splitnode);
	document.getElementById("racetimes").appendChild(timenode);
	document.getElementById("lappaces").appendChild(pacenode);
	lastTime = time;
	}
}

function stop(){
	if (!record){
	location.reload();
	}
	
	if (record){
	record = false;
	stopB.innerHTML = "Reset";
	}
}

function formatTime(t){
	var secs = t / 1000;
	var minutes = Math.floor(secs/60);
	var seconds = Math.floor(secs%60);
	var milsecs = shorten(t%1000,2);
	var out = "";
	if (seconds < 10){
		out = String(minutes).concat(":0",String(seconds),".",String(milsecs));
	}else{
		out = String(minutes).concat(":",String(seconds),".",String(milsecs));
	}
	return out;
}

function shorten(val, precision) {
	var str = String(val);
	var result = str.substring(0,precision);
	return parseInt(result);
}

function createAppUI(){
	/*var pUI = document.createElement("p");
	var laps = document.createTextNode("12345678");
	pUI.appendChild(laps);
	var divUI = getElementById("appUI");
	divUI.appendChild(pUI);*/
}