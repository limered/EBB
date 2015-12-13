function EyeObject(x, y, radius, id){
	this.id = id;
	this.radius = radius;
	this.currentState = new State(x, y, 1000, 0);
	this.lastState = new State(x, y, 1000, 0);

	this.linearDamping = 0.005;
	this.gravityConstant = 0.00005;

	this.geometry = new t3.SphereGeometry( 10, 16, 16, 
		t3.Math.randFloat(0, Math.PI), 
		t3.Math.randFloat(0, Math.PI * 2), 
		t3.Math.randFloat(0, Math.PI/2), 
		t3.Math.randFloat(0, Math.PI) );
	this.material = new t3.ShaderMaterial( EyeShaderMaterial );
	this.mesh = new t3.Mesh( this.geometry, this.material );

	this.live = 0;
	this.deathTime = t3.Math.randInt(20000, 30000);
	this.wantsToDie = false;
}

EyeObject.prototype = {	
	addToScene:function(scene){
		scene.add(this.mesh);
	},

	animate:function(dt){
		this.lastState = this.currentState.clone();
		this.integrate(dt);

		if(this.live > this.deathTime)
			cellsDemo.removeEyeObject(this);

		this.live += dt;
	},

	//movement
	evaluate:function(){
		var output = new Derivative();
		output.velocity = output.velocity = this.currentState.velocity.clone();
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
	integrate: function(dt){
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
		var forces = this.movement();
		forces.add(this.gravity());
		forces.add(this.damping());
		forces.add(this.collision(forces));
		return forces;
	},

	movement:function(){
		var posX = this.currentState.position.x/WIDTH;
		var posY = this.currentState.position.y/HEIGHT;

		var noiseX = noise.perlin2(posX, posY)/200;
		noise.seed(Math.random());
		var noiseY = noise.perlin2(posY, posX)/200;

		return v2(noiseX, noiseY);
	},
	damping:function(){
		return this.currentState.velocity.clone().multiplyScalar(-this.linearDamping);
	},
	collision:function(force){
		if (this.currentState.position.x < WIDTH/-2 - this.radius){
			this.currentState.position.x = WIDTH/2 + this.radius;
			force.x *= (force.x > 0) ? -1 : 1;
		}else if (this.currentState.position.x > WIDTH/2 + this.radius){
			this.currentState.position.x = WIDTH/-2 - this.radius;
			force.x *= (force.x < 0) ? -1 : 1;
		}

		if (this.currentState.position.y < HEIGHT/-2 - this.radius){
			this.currentState.position.y = HEIGHT/2 + this.radius;
			force.y *= (force.y > 0) ? -1 : 1;
		}else if (this.currentState.position.y > HEIGHT/2 + this.radius){
			this.currentState.position.y = HEIGHT/-2 - this.radius;
			force.y *= (force.y < 0) ? -1 : 1;
		}
		return force;
	},
	gravity:function(){
		var zero = v2(0, 0);
		var dir = zero.sub(this.currentState.position).normalize();
		return dir.multiplyScalar(this.gravityConstant);
	},
	interpolate:function(alpha){
		interpolate(this.currentState, this.lastState, alpha);
	},


	render:function(){
		this.mesh.position.set(this.currentState.position.x, this.currentState.position.y, -200);
		var rand = t3.Math.randInt(1,4);
		var axis = (rand === 1) ? v3(1,0,0) : (rand === 2) ? v3(0,1,0) : v3(0,0,1);
		var rotation = new t3.Quaternion().setFromAxisAngle(axis, t3.Math.random16() * Math.PI/100);
		this.mesh.quaternion.multiply(rotation);
	}

}