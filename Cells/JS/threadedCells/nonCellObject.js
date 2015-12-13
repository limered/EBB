function nonCellObject(id, x, y, velX, velY, radius, type, liveDuration){
	this.id = id;
	this.currentState = new State(x, y, 300, radius);
	this.lastState = new State(x, y, 300, radius);
	
	this.fixedVel = v2(velX, velY);
	
	this.live = 0;
	this.deathTime = liveDuration;
	
	this.type = type;
	
	var rand = Math.random();
	var pos = t3.Math.randInt(0, 3);
		
	this.randColor = v3((pos === 0) ? rand : 0, (pos === 1) ? rand : 0, (pos === 2) ? rand : 0);
	
}

nonCellObject.prototype = {
	animate: function(dt){
		this.lastState = this.currentState.clone();
		
		this._integrate(dt);
		
		this.live += dt;
		
		return {
			death: (this.live > this.deathTime)
		};
	},
	
	/*********** integration ****************/
	_evaluate:function(){
		var output = new Derivative();
		output.velocity = this.currentState.velocity.clone();
		output.force = this._forces();
		return output;
	},
	_evaluateDt:function (derivative, dt){
		var deriv = derivative.clone();
		this.currentState.position.add(deriv.velocity.multiplyScalar(dt));
		this.currentState.momentum.add(deriv.force.multiplyScalar(dt));
		this.currentState.recalculate();
		
		return this._evaluate();
	},
	_integrate:function(dt){
		
		var a = this._evaluate();
		var b = this._evaluateDt(a, dt*0.5);
		var c = this._evaluateDt(b, dt*0.5);
		var d = this._evaluateDt(c, dt);
		
		var vel = a.velocity.add(b.velocity.add(c.velocity).multiplyScalar(2)).add(d.velocity).multiplyScalar(1.0/6.0 * dt);
		var force = a.force.add(b.force.add(c.force).multiplyScalar(2)).add(d.force).multiplyScalar(1.0/6.0 * dt);
		
		this.currentState.position.add(vel);
		this.currentState.momentum.add(force);
		this.currentState.recalculate();
	},
	/***************** FORCES *****************/
	_forces:function(){
		return this.fixedVel.clone().multiplyScalar(0.001);
	},
	
	/***************** INTERACTION *****************/
	interact:function(cellForce, cell){
		if(this.type === OBJECT_TYPES.CLEAR_COLOR_ALL)
			cell.currentColorOverride = null;
		
		var force = v2();
		var a_to_b = v2().subVectors(cell.currentState.position, this.currentState.position);
		if (a_to_b.lengthSq() > (cell.currentState.radius + this.currentState.radius)*(cell.currentState.radius + this.currentState.radius))
			return force;	//no collision

		switch (this.type){
			case OBJECT_TYPES.PUSH: 
				return this.calculatePushForce(a_to_b.normalize());
			case OBJECT_TYPES.PULL:
				return this.calculatePullForce(a_to_b.normalize());
			case OBJECT_TYPES.GROW:
				return this.growCell(cell);
			case OBJECT_TYPES.SHRINK:
				return this.shrinkCell(cell);
			case OBJECT_TYPES.ROTATE_RIGHT:
				return this.calcRotation(a_to_b.normalize(), this.type);
			case OBJECT_TYPES.ROTATE_LEFT:
				return this.calcRotation(a_to_b.normalize(), this.type);
			case OBJECT_TYPES.COLOR:
				return this.changeCellColor(cell);
			case OBJECT_TYPES.CLEAR_COLOR:
				return this.changeCellColor(cell, true);
		}
	},
	/***************** EFFECTS *****************/
	calculatePushForce:function(this_to_cell){
		return this_to_cell.multiplyScalar(0.005);
	},
	calculatePullForce:function(this_to_cell){
		return this_to_cell.negate().multiplyScalar(0.005);
	},
	calcRotation: function(this_to_cell, dir){
		var dirForce = v2();

		if(dir == OBJECT_TYPES.ROTATE_RIGHT)
			dirForce = v2(-this_to_cell.y, this_to_cell.x).multiplyScalar(0.005);

		else if(dir == OBJECT_TYPES.ROTATE_LEFT)
			dirForce = v2(this_to_cell.y, -this_to_cell.x).multiplyScalar(0.005);

		return this_to_cell.negate().multiplyScalar(0.005).add(dirForce);
	},
	growCell:function(cell){
		cell.currentSize += 0.5;
		return v2();
	},
	shrinkCell:function(cell){
		cell.currentSize -= 0.3;
		return v2();
	},
	changeCellColor:function(cell, delColor){
		if(delColor)
			cell.currentColorOverride = null;
		else
			cell.currentColorOverride = v4(this.randColor.x, this.randColor.y, this.randColor.z, 1.0);
		return v2();
	},
	
	getId: function(){
		return this.id;
	}
}