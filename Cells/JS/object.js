function Cell(x, y, id){
	this.id = id;

	this.currentState = new State(x, y, 100, 45);
	this.lastState = new State(x, y, 100, 45);

	this.live = 0;
	this.growTime = 4000;
	this.splitTime = t3.Math.randInt(10000, 20000);
	this.wantsToSplit = false;
	this.hasSplit = false;
	this.deathTime = this.splitTime + t3.Math.randInt(20000, 35000);
	this.wantsToDie = false;

	this.currentSize = 1

	this.growConstant = MAX_CELL_SIZE/this.growTime;

	this.init();
}

Cell.prototype = {
	init: function(){
		var geometry = new t3.SphereGeometry( this.currentSize , 15, 15);
		var material = new t3.ShaderMaterial( cellShaderMaterial );
		this.cell = new t3.Mesh(geometry, material);
		this.cell.position.z = -this.currentState.radius*4;
	},
	animate: function(dt, otherCells, nonCells){
		this.lastState = this.currentState.clone();
		integrate(otherCells, this, dt, nonCells);

		var growInThisStep = (MAX_CELL_SIZE - this.currentSize) / 50.0;
		this.currentSize += growInThisStep;
		this.cell.scale.set(this.currentSize, this.currentSize, this.currentSize);
		this.currentState.radius = this.currentSize * 0.6;
		this.cell.position.z = -this.currentState.radius*4;


		if(!this.hasSplit && this.live > this.splitTime)
			this.wantsToSplit = true;

		if(this.live > this.deathTime)
			this.wantsToDie = true;

		this.live += dt;
	},
	interpolate: function(alpha){
		interpolate(this.lastState, this.currentState, alpha);
	},
	render: function(){
		this.cell.position.x = this.currentState.position.x;
		this.cell.position.y = this.currentState.position.y;

		if(COLORUPDATED){
			this.cell.material.uniforms['centerColor'].value = COLOR;
			this.cell.material.needsUpdate = true;
		}

		if(this.wantsToSplit && !this.hasSplit)
			this.split();

		if(this.wantsToDie)
			this.die();
	},
	split: function(){
		this.hasSplit = true;
		cellsDemo.generateCell(this.currentState.position.x, this.currentState.position.y);
		cellsDemo.generateCell(this.currentState.position.x, this.currentState.position.y);
	},
	die: function(){
		cellsDemo.removeCell(this);
	},

	interactions: function(force, nonCells){
		var res = v2();
		var self = this;
		nonCells.forEach(function(nonCell){
			res.add(nonCell.interact(force, self));
		});
		return res;
	}
}