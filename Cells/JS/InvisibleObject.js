function InvisibleObject(x, y, velX, velY, radius, type, deathTime){
	this.currentState = new State(x, y, 300, radius);
	this.lastState = new State(x, y, 300, radius);

	this.fixedVel = v2(velX, velY);

	this.live = 0;
	this.deathTime = deathTime;

	this.type = type;
}

InvisibleObject.prototype = {
	init: function(){},

	animate: function(dt){
		this.lastState = this.currentState.clone();

		this.integrate(dt);


		if(this.live > this.deathTime)
			this.die();

		this.live += dt;
	},

	evaluate: function(){
		var output = new Derivative();
		output.velocity = this.currentState.velocity.clone();
		output.force = this.forces();
		return output;
	},

	evaluateDt:function(dt, derivative){
		var clonedDeriv = derivative.clone();
		this.currentState.position.addVectors(this.currentState.position, clonedDeriv.velocity.multiplyScalar(dt));
		this.currentState.momentum.addVectors(this.currentState.momentum, clonedDeriv.force.multiplyScalar(dt));
		this.currentState.recalculate();

		var output = new Derivative();
		output.velocity = this.currentState.velocity.clone();
		output.force = this.forces();
		return output;
	},

	integrate:function(dt){
		var a = this.evaluate();
		var b = this.evaluateDt(dt*0.5, a);
		var c = this.evaluateDt(dt*0.5, b);
		var d = this.evaluateDt(dt, c);

		var vel = a.velocity.add(b.velocity.add(c.velocity).multiplyScalar(2)).add(d.velocity).multiplyScalar(1.0/6.0 * dt);
		var force = a.force.add(b.force.add(c.force).multiplyScalar(2)).add(d.force).multiplyScalar(1.0/6.0 * dt);

		this.currentState.position.addVectors(this.currentState.position, vel);
		this.currentState.momentum.addVectors(this.currentState.momentum, force);
		this.currentState.recalculate();
	},

	forces: function(){
		return this.fixedVel.clone().multiplyScalar(0.0001);
	},

	interpolate: function(alpha){
		interpolate(this.currentState, this.lastState, alpha);
	},

	interact: function(force, cell){
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

		}
	},

	die: function(){
		cellsDemo.removeNonCell(this);
	},

	//effects
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
	}
}

