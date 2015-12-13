self.importScripts('../ext/three.js', '../ext/perlin.js', '../shortcuts.js', 'floaterObject.js');

self.floaters = [];
self.updateTime = 0;
self.dt = 30;
self.t = 0;
self.accumulator = 0;
self.currentTime = 0;

self.onmessage = function(evt){
	var data = evt.data;
	switch(data.op){
		case "start":
			self.start();
			break;
		case "update":
			self.addUpdateTime(data.frameTime);
			break;
		case 'addFloater':
			self.addFloater(data.id, data.x, data.y);
			break;
	}
}
/**
 * Adds renderTime to accumulator
 * @param {Number} frameTime Time of last frame
 */
self.addUpdateTime = function (frameTime) {
    self.updateTime += frameTime;
}
/**
 * Resets all containers etc...
 */
self.clear = function(){
	self.floaters = [];
	self.postMessage({op: 'clear'});
}
/**
 * Starts this thread
 */
self.start = function(){
	self.setTimeout(self.update.bind(self), self.dt);
}

/**
 * Adds a new floater to simulation
 * @param {Number} id The Id
 * @param {Number} x  x Position
 * @param {Number} y  y Position
 */
self.addFloater = function(id, x, y){
	self.floaters[id] = new FloaterObject(id, x, y);
}

/**
 * Updates Simulation
 */
self.update = function(){
	var newTime = +new Date();
	self.t = newTime;
	
	var frameTime = newTime - self.currentTime;
	if(frameTime > 250)
		frameTime = 250;
	currentTime = newTime;
	
	self.accumulator += frameTime;
	
	while(self.accumulator > self.dt){
		self.animate();
		
		self.accumulator -= self.dt;
	}
	
	var alpha = self.accumulator / self.dt;
	self.interpolate(alpha);
	
	self.sendPositions();
	
	self.setTimeout(self.update.bind(self), 5);
}
/**
 * Animates all floaters
 */
self.animate = function(){
	var deaths = [];
	self.floaters.forEach(function(floater){
		if(floater)
			var die = floater.animate(self.dt);
			if(die)
				deaths.push(floater.getId());
	});
	
	for (var i = deaths.length-1; i >= 0; i--){
		self.floaters[deaths[i]] = undefined;
		self.postMessage({ op: 'killFloater', id: deaths[i] });
	}
}
/**
 * Interpolates animation state of floaters
 * @param {Number} alpha 0.0 to 1.0 pos from last state to current state
 */
self.interpolate = function(alpha){
	self.floaters.forEach(function(floater){
		if(floater)
			floater.interpolate(alpha);
	});
}
self.isSending = false;
/**
 * Sends rendering positions to main thread
 */
self.sendPositions = function(){
	if(self.isSending)
		return;
	self.isSending = true;
	var positions = [];
	self.floaters.forEach(function(floater){
		if(floater)
			positions.push(floater.getPositionsArray());
	});
	self.postMessage({ op: 'updateFloaters', positions: positions });
	self.isSending = false;
}