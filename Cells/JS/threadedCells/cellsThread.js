self.importScripts('../ext/three.js', '../ext/perlin.js', '../shortcuts.js', 'cellObject.js', 'nonCellObject.js', 'Queue.js');

self.cells = [];
self.nonCells = [];
self.effectsToAdd = new Queue();
self.cellsToAdd = new Queue();
self.updateTime = 0;
self.dt = 30;
self.lastKeys = {
	effectsKey: 0,
	cellKey:0
}

self.onmessage = function (evt) {
    var data = evt.data;
	if (data.op === "start")
		self.start();
    if (data.op === "update")
        self.addUpdateTime(data.frameTime);
    if(data.op === "clear")
        self.clear();
	if(data.op === "addCell")
		self.addCell(data.id, data.x, data.y);
	if(data.op === "addNonCell")
		self.addNonCell(data.x, data.y, data.vX, data.vY, data.radius, data.type, data.deathTime);
	if(data.op === "addNonCellBatch")
		self.addNonCellBatch(data.list);
}

self.addUpdateTime = function (frameTime) {
    self.updateTime += frameTime;
}

self.clear = function () {
    self.cells = [];
    self.updateTime = 0;
    self.postMessage({op:"clear"});
}

self.start = function(){
	self.setTimeout(self.updateCells.bind(self), self.dt);
//	for(var i = 0; i < 150; i++)
		self.postMessage({
			op:'addCells',
			x:50,
			y:50
		});
}


self.addNonCellBatch = function(list){
	list.forEach(function(cell){
		self.effectsToAdd.enqueue(cell);
	});
}

self.addCell = function (id, x, y) {
    if(this.cells.length > MAX_CELL_COUNT)
		return;
	
	self.cells[id] = new CellObject(id, x, y);
}
self.addNonCell = function(x, y, vX, vY, radius, type, deathTime){
	var id = self.nonCells.length;
	self.nonCells.push(new nonCellObject(id, x, y, vX, vY, radius, type, deathTime));
}

self.t = 0;
self.accumulator = 0;
self.currentTime = 0;


self.updateCells = function () {	
	var newTime = +new Date();
	self.t = newTime;
	
	var frameTime = newTime - self.currentTime;
	if(frameTime > 250)
		frameTime = 250;
	currentTime = newTime;
	
	self.accumulator += frameTime;
	
	while (self.accumulator > self.dt){
		//animate
		self.animate(self.dt);

		self.accumulator -= self.dt;
	}
	
	//interpolate
	var alpha = self.accumulator / self.dt;
	self.interpolate(alpha);
	
	//send update
	self.sendPositions();
	
	self.setTimeout(self.updateCells.bind(self), 5);
}

self.animate = function(dt){
	self.animateEffects(dt);
	self.animateCells(dt);
}
self.animateCells = function(dt, lastKey){
	var splits = [];
	var deletes = [];
	var key = 0;
	while(key < self.cells.length){
		var cell = self.cells[key];
		if(cell){
			var res = cell.animate(self.cells, self.nonCells, dt);
			if(res.split)
				splits.push({ x:res.x, y:res.y });
			if(res.die)
				deletes.push(cell.getId());
		}
		key++;
	}
	
	for (var i = 0; i < splits.length; i++){
		self.postMessage({ op:'addCells', x: splits[i].x, y: splits[i].y });
	}
	for (var i = deletes.length-1; i >= 0; i--){
		self.cells[deletes[i]] = undefined;
		self.postMessage({ op:'killCell', id: deletes[i] });
	}
}
self.animateEffects = function(dt, lastKey){
	var deletes = [];
	var key = 0;
	while (key < self.nonCells.length){
		var nonCell = self.nonCells[key];
		if(nonCell){
			var res = nonCell.animate(dt);
			if(res.death)
				deletes.push(key);
		}
		key++;
	}
	
	var i = deletes.length-1;
	while(i >= 0){
		self.nonCells.splice(deletes[i], 1);
		i--;
	};
	
	//add new Effects
	while(!self.effectsToAdd.isEmpty()){
		var cell = self.effectsToAdd.dequeue();
		self.addNonCell(cell.x, cell.y, cell.vX, cell.vY, cell.radius, cell.type, cell.deathTime);
	}
}

self.interpolate = function(alpha){
	self.cells.forEach(function(cell){
		if(cell)
			cell.interpolate(alpha);
	});
}

self.isSending = false;

self.sendPositions = function(){
	if(self.isSending)
		return;
	self.isSending = true;
	var positions = [];
	self.cells.forEach(function(cell){
		if(cell)
			positions.push(cell.getPositionsArray());
	});
	
	self.postMessage({
		op: "updateCells",
		positions: positions
	});
	self.isSending = false;
}