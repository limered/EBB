function Background(width, height){
	this.currentState = new State(WIDTH/2, HEIGHT/2, 1000, 0);
	this.lastState = new State(WIDTH/2, HEIGHT/2, 1000, 0);
	this.width = width;
	this.height = height;

	this.linearDamping = 0.002;

	this.mesh = null;
}

Background.prototype = {

	generate: function(){
		function componentToHex(c) {
		    var hex = c.toString(16);
		    return hex.length == 1 ? "0" + hex : hex;
		}

		function rgbToHex(r, g, b) {
		    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
		}

		var canvas = document.createElement("canvas");
		canvas.width = this.width;
		canvas.height = this.height;

		var context = canvas.getContext("2d");

		var seed = Math.random();
		noise.seed(seed);

		for (var i = 0; i < this.width; i++){
			for (var j = 0; j < this.height; j++){
				context.beginPath();
			    context.arc( i, j, 1, 0, 2 * Math.PI, false );
			    var color = 200-parseInt(noise.perlin2(i/(this.width/8), j/(this.width/8))*240);
			    color *= (color < 0) ? -1 : 1;
			    color = (color > 255) ? 255 : color;
			    context.fillStyle = rgbToHex(color, color, color)
			    context.fill();
			}
		}
		return canvas;
	},
	make: function(){
		var texture = new t3.Texture(this.generate());
		texture.needsUpdate = true;

		var material = new t3.MeshLambertMaterial({
			color: 0xffffff,
			map: texture
		});

		var geometry = new t3.PlaneBufferGeometry(WIDTH*3, HEIGHT*3, 4, 4);

		this.mesh = new t3.Mesh(geometry, material);

		this.mesh.position.set(0, 0, -200);

	},

	addToScene: function(scene){
		scene.add(this.mesh);
	},

	animate:function(dt){
		this.lastState = this.currentState.clone();
		this.integrate(dt);
	},


	//physics
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
		forces.add(this.damping());
		forces.add(this.collision(forces));
		return forces;
	},
	movement:function(){
		var posX = this.currentState.position.x/WIDTH;
		var posY = this.currentState.position.y/HEIGHT;

		var noiseX = noise.perlin2(posX, posY)/100;
		noise.seed(Math.random());
		var noiseY = noise.perlin2(posX, posY)/100;

		return v2(noiseX, noiseY);
	},
	damping:function(){
		return this.currentState.velocity.clone().multiplyScalar(-this.linearDamping);
	},
	collision:function(force){
		if (this.currentState.position.x < -WIDTH){
			this.currentState.position.x = -WIDTH;
			force.x *= (force.x < 0) ? -2 : 2;
		}else if (this.currentState.position.x > WIDTH){
			this.currentState.position.x = WIDTH;
			force.x *= (force.x > 0) ? -2 : 2;
		}

		if (this.currentState.position.y < -HEIGHT){
			this.currentState.position.y = -HEIGHT;
			force.y *= (force.y < 0) ? -2 : 2;
		}else if (this.currentState.position.y > HEIGHT){
			this.currentState.position.y = HEIGHT;
			force.y *= (force.y > 0) ? -2 : 2;
		}
		return force;
	},
	interpolate:function(alpha){
		interpolate(this.currentState, this.lastState, alpha);
	},


	render: function(){
		this.mesh.position.set(this.currentState.position.x, this.currentState.position.y, -200);
	}
}