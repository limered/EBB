function ParticleObject(id, pos, force, maxLive){
	this._id = id;
	this._currentState = new State(pos.x, pos.y, 100, 0);
	this._lastSate = this._currentState.clone();
	this._animationSate = this._currentState.clone();

	this._life = 0;
	this._maxLive = maxLive;
	this._isMoving = true;

	this._initForce = force;
	this._initForceDuration = 60;

	//static vectors
	this._gravityVec = v2(0, -0.001);
}

ParticleObject.prototype = {
	animate:function(dt){
		if(!this._isMoving)
			return;

		this._lastSate = this._currentState.clone();
		this._integrate(dt);

		if(this._life >= this._maxLive)
			this._isMoving = false;

		this._life += dt;
	},
	reset:function(){
		this._currentState = new State(-50000, -50000, 100, 0);
		this._lastSate = this._currentState.clone();
		this._animationSate = this._currentState.clone();
		
		this._isMoving = false;
	},
	_integrate:function(dt){
		var a = this._evaluate();
		var b = this._evaluateDt(dt*0.5, a);
		var c = this._evaluateDt(dt*0.5, b);
		var d = this._evaluateDt(dt, c);

		var vel = a.velocity.add(b.velocity.add(c.velocity).multiplyScalar(2)).add(d.velocity).multiplyScalar(1.0/6.0 * dt);
		var force = a.force.add(b.force.add(c.force).multiplyScalar(2)).add(d.force).multiplyScalar(1.0/6.0 * dt);

		this._currentState.position.add(vel);
		this._currentState.momentum.add(force);
		this._currentState.recalculate();
	},
	_evaluate:function(){
		var output = new Derivative();
		output.velocity = this._currentState.velocity.clone();
		output.force = this._forces();
		return output;
	},
	_evaluateDt:function(dt, derivative){
		var clonedDeriv = derivative.clone();
		this._currentState.position.add(clonedDeriv.velocity.multiplyScalar(dt));
		this._currentState.momentum.add(clonedDeriv.force.multiplyScalar(dt));
		this._currentState.recalculate();

		var output = new Derivative();
		output.velocity = this._currentState.velocity.clone();
		output.force = this._forces();
		return output;
	},

	_forces:function(){
		var force = this._initialForce();
		force.add(this._movement());
		force.add(this._damping());
		force.add(this._gravity());
		return force;
	},
	_initialForce:function(){
		var amount = 1 - (this._life / this._initForceDuration)
		if(amount > 0)
			return this._initForce.multiplyScalar(amount/20.0);
		return v2();
	},
	_movement:function(){
		var posX = this._currentState.position.x/WIDTH;
		var posY = this._currentState.position.y/HEIGHT;

		var noiseX = noise.perlin2(posX, posY)/20;
		noise.seed(Math.random());
		var noiseY = noise.perlin2(posY, posX)/20;

		var amount = 1 - (this._life / this._maxLive);
		return v2(noiseX, noiseY).multiplyScalar(amount);
	},
	_damping:function(){
		return this._currentState.velocity.clone().multiplyScalar(-linearDamping);
	},
	_gravity:function(){
		return this._gravityVec;
	},

	interpolate:function(alpha){
		if(!this._isMoving)
			return;
		this._animationSate.position = this._lastSate.position.clone().lerp(this._currentState.position, alpha);
		this._animationSate.momentum = this._lastSate.momentum.clone().lerp(this._currentState.momentum, alpha);
		this._animationSate.recalculate();
	},
	getPositionArray:function(){
		return [this._animationSate.position.x, this._animationSate.position.y];
	},
	getId:function(){
		return this._id;
	}
}