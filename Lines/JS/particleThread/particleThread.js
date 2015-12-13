self.importScripts("../ext/three.js", "../ext/perlin.js", "../shortcuts.js", "particleObject.js");
self._particles = new Array(MAX_PARTICLES);
self.updateTime = 0;
self.dt = 30;

self.particleID = 0;

self.setTimeout(updateParticles, self.dt);
/**
 * Message Handler
 * @param {Object} evt evt.data has all send Data
 */
self.onmessage = function(evt){
	var data = evt.data;
	if(data.op === "update")
		addUpdateTime(data.dt);
	if(data.op === "interpolate")
		interpolateParticles(data.alpha);
	if(data.op === "addParticles")
		addParticles(data.positions, data.directions);
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
 * Adds Particles to Simulation
 * @param {Array} ids        Array with IDs
 * @param {Array} positions  Array with positions
 * @param {Array} directions Array with Directions
 */
function addParticles( positions, directions){
//	 console.log("add particle count: " + positions.length);
	for(var i = 0; i < positions.length; i++){
		var particle = new ParticleObject(self.particleID, new v2(positions[i][0], positions[i][1]), new v2(directions[i][0], directions[i][1]), t3.Math.randInt(2000, 6000))
		self._particles[self.particleID] = particle;
		
		self.particleID++;
		self.particleID %= MAX_PARTICLES;
	}
}

self.t = 0;
self.accumulator = 0;
self.currentTime = 0;
self.lastKey = 0;

/**
 * Updates Simulation
 */
function updateParticles(){	
	var newTime = +new Date();
	self.t = newTime;
	
	var frameTime = newTime - self.currentTime;
	if(frameTime > 1000/30)
		frameTime = 1000/30;
	currentTime = newTime;
	
	self.accumulator += frameTime;

	while (self.accumulator > self.dt){
		animateParticles();
		
		self.accumulator -= self.dt;
	}

	var alpha = self.accumulator / self.dt;
	interpolateParticles(alpha);
	
	sendParticlePositions();

	self.setTimeout(updateParticles, 5);
}
/**
 * Animates Particles
 */
function animateParticles(){
	var key = 0;
	while (key < self._particles.length){
		var particle = self._particles[key];
		if(particle)
			particle.animate(self.dt);
		key++;
	 }
}
/**
 * Interpolates draw Posision
 * @param {Number} alpha 0.0 to 1.0 t from last pos to new pos
 */
function interpolateParticles(alpha){
	self._particles.forEach(function(part){
		part.interpolate(alpha);
	});
}
/**
 * Sends Updates to the main Thread
 */
function sendParticlePositions(){
	var positions = [];
	self._particles.forEach(function(particle){
		positions[particle.getId()] = particle.getPositionArray();
	});
	self.postMessage({
		op: "updateParticles",
		positions: positions
	});
}
/**
 * Clears Simulation Data
 */
function clear(){
	var key = 0;
	while (key < self._particles.length){
		var particle = self._particles[key];
		if(particle)
	 		particle.reset();
		key++;
	}
	self._updateTime = 0;
	self.lineID = 0;
}