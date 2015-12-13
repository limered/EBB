function LineObject(id, origin, direction, speedString, thread){
	this._id = id;
	this._startPos = v2(origin.x, origin.y);
	this._dir = null;
	this._invDir = null;
	this._vertexDisplacement = null;
	this._speed = 0;

	this._frontState = new State(this._startPos.x, this._startPos.y, 100, 1);
	this._frontAnimationState = this._frontState.clone();
	this._lastFrontState = this._frontState.clone();

	this._backState = new State(this._startPos.x, this._startPos.y, 100, 1);
	this._backAnimationState = this._backState.clone();
	this._lastBackState = this._backState.clone();

	this._timeAlive = 0;
	
	this._isMoovingFront = true;
	this._isMoovingBack = true;

	this._linesStopped = {};

	this._thread = thread;

	this._init(direction, speedString);
}

LineObject.prototype = {
	_init:function(direction, speedString){
		this._dir = this._setDirectionFromString(direction);
		this._speed = this._setSpeedFromString(speedString);
		this._vertexDisplacement = this._calculateVertexDisplacement();

		this._dir.multiplyScalar(this._speed);
		this._invDir = this._dir.clone().negate();
	},
	_setDirectionFromString:function(direction){
		var x = t3.Math.randFloat(-1, 1);
		var y = t3.Math.randFloat(-1, 1);

		if (t3.Math.randInt(0, 2) == 0)
			x *= direction;
		else
			y *= direction;
		
		var dir = v2(x, y);
		dir.normalize();

		return dir;
	},
	_calculateVertexDisplacement:function(){
		return v2(-this._dir.y, this._dir.x).multiplyScalar(3);
	},
	_setSpeedFromString:function(speedString){
		switch(speedString){
			case "slow": 
				return LINE_BASE_SPEED/10.0;
			case "normal":
				return LINE_BASE_SPEED;
			case "fast":
				return LINE_BASE_SPEED * 10;
		}
	},
	reset:function(){
		this._frontState = new State(50000, 50000, 100, 1);
		this._frontAnimationState = this._frontState.clone();
		this._lastFrontState = this._frontState.clone();

		this._backState = new State(50000, 50000, 100, 1);
		this._backAnimationState = this._backState.clone();
		this._lastBackState = this._backState.clone();
		
		this._isMoovingFront = false;
		this._isMoovingBack = false;
	},
	animate:function(otherLines, dt){
		if(this._isMoovingFront){
			this._lastFrontState = this._frontState.clone();
			var intersection = this._intergrate(otherLines, dt, this._frontState, this._dir, this._lastFrontState);
			if(intersection){
				this._isMoovingFront = false;
				this._emitParticles(this._frontState.position, this._frontState.velocity);
				this._frontAnimationState = this._frontState = this._lastFrontState;
			}
		}
		if(this._isMoovingBack){
			this._lastBackState = this._backState.clone();
			var intersection = this._intergrate(otherLines, dt, this._backState, this._invDir, this._lastBackState);	
			if(intersection){
				this._isMoovingBack = false;
				this._emitParticles(this._backState.position, this._backState.velocity);
				this._backAnimationState = this._backState = this._lastBackState;
			}
		}
	},
	interpolate:function(alpha){
		if(this._isMoovingFront)
			this._frontAnimationState = this._interpolateState(this._lastFrontState.clone(), this._frontState, alpha);
		if(this._isMoovingBack)
			this._backAnimationState = this._interpolateState(this._lastBackState.clone(), this._backState, alpha);
	},
	/* simulation */
	_emitParticles:function(position, dir){
		var count = t3.Math.randInt(3, 7);
		var positions = [];
		var directions = [];
		for (var i = 0; i < count; i++){
			var pos = position.clone();
			var dir = dir.clone();
			positions.push([pos.x, pos.y]);
			directions.push([dir.x, dir.y]);
		}
		this._thread.postMessage({op:"addParticles", positions: positions, directions: directions});
	},
	_intergrate:function(otherLines, dt, state, dir, lastState){		
		var a = this._evaluate(state, dir);
		var b = this._evaluateDt(otherLines, state, dt*0.5, a, dir);
		var c = this._evaluateDt(otherLines, state, dt*0.5, b, dir);
		var d = this._evaluateDt(otherLines, state, dt, c, dir);

		var vel = a.velocity.add(b.velocity.add(c.velocity).multiplyScalar(2)).add(d.velocity).multiplyScalar(1.0/6.0 * dt);
		var force = a.force.add(b.force.add(c.force).multiplyScalar(2)).add(d.force).multiplyScalar(1.0/6.0 * dt);
		
		var intersected = this._intersect(otherLines, state);
		if(intersected)
			return true;
		
		state.position.add(vel);
		state.momentum.add(force);
		state.recalculate();

		return false;
	},
	_evaluate:function(state, dir){
		var output = new Derivative();
		output.velocity = state.velocity.clone();
		output.force = this._forces(state, dir);
		return output;
	},
	_evaluateDt:function(otherLines, state, dt, derivative, dir){
		var clonedDeriv = derivative.clone();
		state.position.add(clonedDeriv.velocity.multiplyScalar(dt));
		state.momentum.add(clonedDeriv.force.multiplyScalar(dt));
		state.recalculate();

		var output = new Derivative();
		output.velocity = state.velocity.clone();
		output.force = this._forces(state, dir);
		return output;
	},
	_forces:function(state, dir){
		return dir.clone().multiplyScalar(0.25);
	},
	_interpolateState:function(stateA, stateB, alpha){
		stateA.position = stateA.position.lerp(stateB.position, alpha);
		stateA.momentum = stateA.momentum.lerp(stateB.momentum, alpha);
		stateA.recalculate();
		return stateA;
	},
	_intersect:function(otherLines, state){
		var self = this;
		var intersection = false;
		var key = 0;
		while (key < otherLines.length){
			if(!otherLines[key]){ key++; continue; }
			
			if(self._id === otherLines[key]._id || self.hasStoppedLine(otherLines[key]._id)){
				key++;
				continue;
			}

			var intersectionObj = self._intersectLines(otherLines[key], state);
			if(intersectionObj.intersected && this._confirmIntersection(intersectionObj, state)){
				intersection = true;
				break;
			}
			key++;
		}
		return intersection;
	},
	_confirmIntersection:function(intersectionObj, state){
		return intersectionObj.t > 0.9 && intersectionObj.t < 1.1;
	},
	_intersectLines:function(that, state){
		var thisBox = this.getBoundingBox(this._startPos, state.position);
		var thatBox = that.getBoundingBox();
		if(!thisBox.intersect(thatBox))
			return false;	//wenn b-boxes sich nicht schneiden -> kein Schnittpunkt

		var A = this.getStartAndEnd(this._startPos, state.position.clone());
		var B = that.getStartAndEnd();

		var s10_x = A.x1 - A.x0;
		var s10_y = A.y1 - A.y0;
		var s32_x = B.x1 - B.x0;
		var s32_y = B.y1 - B.y0;

	    var denom = s10_x * s32_y - s32_x * s10_y;
	    if (denom == 0)
			return { intersected: false, x: null, y: null }
		var denomPositive = denom > 0;

		var s02_x = A.x0 - B.x0;
		var s02_y = A.y0 - B.y0;
		var s_numer = s10_x*s02_y - s10_y*s02_x;
		if((s_numer < 0) == denomPositive)
			return { intersected: false, x: null, y: null }

		var t_numer = s32_x*s02_y - s32_y*s02_x;
		if((t_numer < 0) == denomPositive)
			return { intersected: false, x: null, y: null }

		if(((s_numer > denom) == denomPositive) || ((t_numer > denom) == denomPositive))
			return { intersected: false, x: null, y: null }

		t = t_numer / denom;
		return { 
			intersected: true,
			x: A.x0 + (t * s10_x),
			y: A.y0 + (t * s10_y),
			t: t
		}
	},
	
	render:function(){
		var frontL = (this._frontState.position.clone().add(this._vertexDisplacement));
		var frontR = (this._frontState.position.clone().sub(this._vertexDisplacement));

		var backL = (this._backState.position.clone().add(this._vertexDisplacement));
		var backR = (this._backState.position.clone().sub(this._vertexDisplacement));

		this._mesh.geometry.vertices[0].set(frontL.x, frontL.y, -10);
		this._mesh.geometry.vertices[1].set(frontR.x, frontR.y, -10);

		this._mesh.geometry.vertices[2].set(backL.x, backL.y, -10);
		this._mesh.geometry.vertices[3].set(backR.x, backR.y, -10);

		this._mesh.geometry.verticesNeedUpdate = true;
	},
	getBoundingBox:function(A, B){
		if(A && B)
			return new BoundingBox(A.x, A.y, B.x, B.y);
		return new BoundingBox(this._frontState.position.x,
			this._frontState.position.y,
			this._backState.position.x,
			this._backState.position.y);
	},
	getStartAndEnd:function(A, B){
		if( A && B )
			return {
				x0: A.x,
				y0: A.y,
				x1: B.x,
				y1: B.y
			}
		return {
			x0: this._frontState.position.x,
			y0: this._frontState.position.y,
			x1: this._backState.position.x,
			y1: this._backState.position.y
		}
	},
	addStoppedLine:function(id){
		this._linesStopped[id] = true;
	},
	hasStoppedLine:function(id){
		return this._linesStopped[id] || false;
	},
	getPositionArray:function(){
		var frontL = (this._frontAnimationState.position.clone().add(this._vertexDisplacement));
		var frontR = (this._frontAnimationState.position.clone().sub(this._vertexDisplacement));

		var backL = (this._backAnimationState.position.clone().add(this._vertexDisplacement));
		var backR = (this._backAnimationState.position.clone().sub(this._vertexDisplacement));

		return [
			frontL.x, frontL.y,
			frontR.x, frontR.y,
			backL.x, backL.y,
			backR.x, backR.y
		];
	},
	getId:function(){
		return this._id;
	}

}

function BoundingBox(x0, y0, x1, y1){
	this.right = Math.max(x0, x1);
	this.left = Math.min(x0, x1);
	this.top = Math.max(y0, y1);
	this.bottom = Math.min(y0, y1);
}

BoundingBox.prototype = {
	intersect: function(that){
		return !( that.left > this.right || that.right < this.left 
			|| that.top < this.bottom || that.bottom > this.top)
	}
}