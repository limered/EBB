self.importScripts("../ext/three.js", "../shortcuts.js", "LineObject.js");
self._lines = new Array(MAX_LINES);		//Simulated Lines
self.updateTime = 0;					//accumulated update time
self.dt = 30;							//update step

self.animationStart = 0;
self.lineID = 0;

self.setTimeout(updateLines, self.dt);

/**
 * Message Handler
 * @param {Object} evt evt.data has all send Data
 */
self.onmessage = function(evt){
	var data = evt.data;
	if(data.op === "update")
		addUpdateTime(data.dt);
	if(data.op === "interpolate")
		interpolateLines(data.alpha);
	if(data.op === "addLine")
		addLine(data.position, data.direction, data.speed);
	if(data.op === "clear")
		clear();
}
/**
 * Adds Simulation Time
 * @param {Number} dt Last FrameTime
 */
function addUpdateTime(dt){
	self.updateTime += dt;
}
/**
 * Add a Line to the Simulation
 * @param {Number} id        Id of the Line
 * @param {Array}  origin    X and Y Coordinates of origin
 * @param {Number} direction Value to generate a direction (strength of difference from 90 grad lines)
 * @param {String} speed     "slow", "normal" or "fast"
 */
function addLine(origin, direction, speed){
	self._lines[self.lineID] = new LineObject(self.lineID, v2(origin[0], origin[1]), direction, speed, self);
	self.lineID = (self.lineID + 1) % MAX_LINES;
}

self.t = 0;
self.accumulator = 0;
self.currentTime = 0;
self.lastKey = 0;

self.lastTime = 0;

/**
 * Animation Function
 */
function updateLines(){
	self.animationStart = +new Date();
	
	var newTime = +new Date();
	self.t = newTime;
	
	var frameTime = newTime - self.currentTime;
	if(frameTime > 250)
		frameTime = 250;
	currentTime = newTime;
	
	self.accumulator += frameTime;
	
//	console.log(self.accumulator);
	
	while (self.accumulator > self.dt){
		animateLines();
		
		self.accumulator -= self.dt;
	}
	
	var alpha = self.accumulator / self.dt;
	self.interpolateLines(alpha);

	finishAnimation();
}
function finishAnimation(){
	sendLinePositions();
	
	self.setTimeout(updateLines, 5);
}
/**
 * Animates all Lines
 */
function animateLines(){
	var key = 0;
	while (key < self._lines.length){
		var line = self._lines[key];
		if(line)
	 		line.animate(self._lines, self.dt);
		key++;
	}
}
/**
 * Interpolates draw position of lines
 * @param {Number} alpha 0.0 to 1.0 t from last pos to new pos
 */
function interpolateLines(alpha){
	 self._lines.forEach(function(line){
	 	line.interpolate(alpha);
	 });
}
/**
 * Sends Updates to Main Thread
 */
function sendLinePositions(){
//	var start = +new Date();
	var positions = [];
	 self._lines.forEach(function(line){
		if(line)
	 		positions[line.getId()] = line.getPositionArray();
	 });
	self.postMessage({
		op: 'updateLines',
		positions: positions
	});
}
/**
 * Clears Simulation Lines
 */
function clear(){
	var key = 0;
	while (key < self._lines.length){
		var line = self._lines[key];
		if(line)
	 		line.reset();
		key++;
	}
	self._updateTime = 0;
	self.lineID = 0;
}