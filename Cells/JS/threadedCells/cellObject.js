function CellObject(id, x, y){
	this.id = id;
	
	this.currentState = new State(x, y, 100, 45);
	this.lastState = new State(x, y, 100, 45);
	this.animationState = new State(x, y, 100, 45);
	
	this.live = 0;
	this.growTime = 4000;
	this.splitTime = t3.Math.randInt(20000, 30000);
	this.wantsToSplit = false;
	this.hasSplit = false;
	this.deathTime = this.splitTime + t3.Math.randInt(20000, 35000);
	this.wantsToDie = false;
	
	this.currentSize = 1;
	
	this.growConstant = MAX_CELL_SIZE/this.growTime;
	
	this.currentNoiseDir = null;

	this.currentColorOverride = null;
}

CellObject.prototype = {
	animate:function(otherCells, nonCells, dt){
		//animation
		this.currentNoiseDir = null;
		this.animationState = this.currentState.clone();
		this.lastState = this.currentState.clone();
		
		this._integrate(otherCells, nonCells, dt);
		
		//live Stuff
		var growInThisStep = (MAX_CELL_SIZE - this.currentSize) / 50.0;
		this.currentSize += growInThisStep;
		this.currentState.radius = this.currentSize * 0.6;
				
		if(!this.hasSplit && this.live > this.splitTime)
			this.wantsToSplit = true;
		
		if(this.live > this.deathTime)
			this.wantsToDie = true;
		
		this.live += dt;
		
		var split = false;
		if(this.wantsToSplit && !this.hasSplit){
			split = true;
			this.hasSplit = true;
		}
		
		return {
			split: split,
			x: this.currentState.position.x,
			y: this.currentState.position.y,
			die: this.wantsToDie
		}
	},
	
	/*********** integration ****************/
	_evaluate:function(otherCells, nonCells){
		var output = new Derivative();
		output.velocity = this.currentState.velocity.clone();
		output.force = this._forces(otherCells, nonCells);
		return output;
	},
	_evaluateDt:function (otherCells, nonCells, derivative, dt){
		var deriv = derivative.clone();
		this.currentState.position.add(deriv.velocity.multiplyScalar(dt));
		this.currentState.momentum.add(deriv.force.multiplyScalar(dt));
		this.currentState.recalculate();
		
		return this._evaluate(otherCells, nonCells);
	},
	_integrate:function(otherCells, nonCells, dt){
		
		var collisions = this._collide(otherCells);
		
		var a = this._evaluate(collisions, nonCells);
		var b = this._evaluateDt(collisions, nonCells, a, dt*0.5);
		var c = this._evaluateDt(collisions, nonCells, b, dt*0.5);
		var d = this._evaluateDt(collisions, nonCells, c, dt);
		
		var vel = a.velocity.add(b.velocity.add(c.velocity).multiplyScalar(2)).add(d.velocity).multiplyScalar(1.0/6.0 * dt);
		var force = a.force.add(b.force.add(c.force).multiplyScalar(2)).add(d.force).multiplyScalar(1.0/6.0 * dt);
		
		this.currentState.position.add(vel);
		this.currentState.momentum.add(force);
		this.currentState.recalculate();
	},
	/***************** FORCES *****************/
	_forces:function(collisions, nonCells){
		var force = this._randomMovement();
		force.add(this._interactions(force, nonCells));
		force.add(this._gravity());
		force.add(this._damping());
		force.add(collisions);
		force = this._collideWithWall(force);
		return force;
	},
	_randomMovement:function(){
		var posX = this.currentState.position.x / WIDTH;
		var posY = this.currentState.position.y / HEIGHT;
		
		var noiseX = noise.perlin2(posX, posY)/200;
		noise.seed(Math.random());
		var noiseY = noise.perlin2(posY, posX)/200;
		
		this.currentNoiseDir = v2(noiseX, noiseY);
		return this.currentNoiseDir;
	},
	_interactions:function(force, nonCells){
		var resForce = v2();
		
		for(var key in nonCells)
			resForce.add(nonCells[key].interact(force, this));
		return resForce;
	},
	_gravity:function(){
		var dir = this.currentState.position.clone().negate().normalize();
		return dir.multiplyScalar(0.0001);
	},
	_damping:function(){
		return this.currentState.velocity.clone().multiplyScalar(-linearDamping);
	},
	_collide:function(otherCells){
		var accForce = v2();
		var key = 0;
		while (key < otherCells.length){
			if(otherCells[key] && otherCells[key].id !== this.id)
				accForce.add(this._calculateCollisionForce(otherCells[key].currentState));
			key++;
		}
		return accForce;
	},
	_calculateCollisionForce:function(stateB){
		var force = v2();
		var a_to_b = stateB.position.clone().sub(this.currentState.position);
		var cellWidthSq = (this.currentState.radius + stateB.radius) * (this.currentState.radius + stateB.radius);
		if(a_to_b.lengthSq() > cellWidthSq)
			return force; //no collision
		
		//collision
		var a_to_b_norm = a_to_b.normalize();
		var B = a_to_b_norm.clone().negate().multiplyScalar(stateB.radius);
		var A = a_to_b_norm.multiplyScalar(this.currentState.radius);
		return B.sub(A).multiplyScalar(BOUNCE);
	},
	_collideWithWall:function(force){
		var repell = 15;
		//horizintale Wände
		if(this.currentState.position.x >= WIDTH/2 + MARGIN_HORI){
			force.x *= (force.x > 0) ? -repell : repell;
			this.currentState.position.x = WIDTH/2 + MARGIN_HORI;
		}else if(this.currentState.position.x <= WIDTH/-2 - MARGIN_HORI){
			force.x *= (force.x < 0) ? -repell : repell;
			this.currentState.position.x = WIDTH/-2 - MARGIN_HORI;
		}
		//vertikale Wände
		if(this.currentState.position.y >= HEIGHT/2 + MARGIN_VERT){
			force.y *= (force.y > 0) ? -repell : repell;
			this.currentState.position.y = HEIGHT/2 + MARGIN_VERT;
		}else if(this.currentState.position.y <= HEIGHT/-2 - MARGIN_VERT){
			force.y *= (force.y < 0) ? -repell : repell;
			this.currentState.position.y = HEIGHT/-2 - MARGIN_VERT;
		}
		return force;
	},
	/******************** INTERPOLATE *********************/
	interpolate:function(alpha){
		var state = this.lastState;
		state.position.lerp(this.currentState.position, alpha);
		state.momentum.lerp(this.lastState.momentum, alpha);
		state.recalculate();
		this.animationState = state;
	},
	/******************** COMMUNICATION *******************/
	getPositionsArray:function(){
		return {
			id: 		this.id,
			position: 	[this.animationState.position.x, 
					   	this.animationState.position.y],
			radius: 	this.animationState.radius,
			scale: 		this.currentSize,
			color: 		(this.currentColorOverride) ? 
							[this.currentColorOverride.x, 
							this.currentColorOverride.y, 
							this.currentColorOverride.z] : 
							[]
		}
	},
	getId:function(){
		return this.id;
	}
}