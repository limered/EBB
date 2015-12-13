var t3 = THREE;

var OBJECT_TYPES = {
	PUSH: 1,
	PULL: 2,
	GROW: 3,
	SHRINK: 4,
	ROTATE_RIGHT: 5,
	ROTATE_LEFT: 6,
	COLOR: 7,
	CLEAR_COLOR: 8,
	CLEAR_COLOR_ALL: 9
}

var WIDTH = 1024;
var HEIGHT = 576;

var MARGIN_VERT = -10;
var MARGIN_HORI = -10;

var COLOR = new t3.Vector4(0.85, 0.0, 0.0, 1.0);
var COLORUPDATED = false;

var MAX_CELL_SIZE = 65;
var MAX_CELL_COUNT = 100;
var max_EFFECT_COUNT = 30;

var MAX_EYE_COUNT = 200;
var ADD_EYE_INTERVAL = 30;

var vR = 0.5;

var linearDamping = 0.02;

var EFFECT_DIRECTION = v2();
var EFFECT_SIZE = 25;
var EFFECT_TYPE = OBJECT_TYPES.SHRINK;
var EFFECT_LIVE = 100;

var c = 10;
var k = 100;
var b = 5;
var f = 3;

var BOUNCE = 0.00001;

var RANDOM_TIMER_MIN = 1000;
var RANDOM_TIMER_MAX = 5000;

function v2(x, y){
	x = x || 0;
	y = y || 0;
	return new t3.Vector2(x, y);
}

function v3(x, y, z){
	x = x || 0;
	y = y || 0;
	z = z || 0;
	return new t3.Vector3(x, y, z);
}

function v4(x, y, z, a){
	x = x || 0;
	y = y || 0;
	z = z || 0;
	a = a || 0;
	return new t3.Vector4(x, y, z, a);
}

function State(posX, posY, mass, radius){
	posX = posX || 0;
	posY = posY || 0;
	//primary
	this.position = v2(posX, posY);
	this.momentum = v2();

	//secondary
	this.velocity = v2();

	//statics
	this.mass = mass;
	this.invMass = 1/this.mass;
	this.radius = radius;

	this.recalculate = function(){
		this.velocity = this.momentum.clone().multiplyScalar(this.invMass);
	}

	this.clone = function(){
		var res = new State(this.position.x, this.position.y, this.mass, this.radius);
		
		res.position = this.position.clone();
		res.momentum = this.momentum.clone();

		this.velocity = this.velocity.clone();

		return res;
	}
}

function Derivative(){
	this.velocity = v2();
	this.force = v2();

	this.clone = function(){
		var res = new Derivative();
		res.velocity = this.velocity.clone();
		res.force = this.force.clone();
		return res;
	}
}

function interpolate(stateA, stateB, alpha){
	var state = stateA.clone();
	state.position = state.position.lerp(stateB.position, alpha);
	state.momentum = state.momentum.lerp(stateB.momentum, alpha);
	state.recalculate();
	return state;
}

function evaluate(otherCells, cell, nonCells){
	var output = new Derivative();
	output.velocity = cell.currentState.velocity.clone();
	output.force = forces(otherCells, cell, nonCells);
	return output;
}

function evaluateDt(otherCells, cell, dt, derivative, nonCells){
	var clonedDeriv = derivative.clone();
	cell.currentState.position.addVectors(cell.currentState.position, clonedDeriv.velocity.multiplyScalar(dt));
	cell.currentState.momentum.addVectors(cell.currentState.momentum, clonedDeriv.force.multiplyScalar(dt));
	cell.currentState.recalculate();

	var output = new Derivative();
	output.velocity = cell.currentState.velocity.clone();
	output.force = forces(otherCells, cell, nonCells);
	return output;
}

function integrate(otherCells, cell, dt, nonCells){
	var a = evaluate(otherCells, cell, nonCells);
	var b = evaluateDt(otherCells, cell, dt*0.5, a, nonCells);
	var c = evaluateDt(otherCells, cell, dt*0.5, b, nonCells);
	var d = evaluateDt(otherCells, cell, dt, c, nonCells);

	var vel = a.velocity.add(b.velocity.add(c.velocity).multiplyScalar(2)).add(d.velocity).multiplyScalar(1.0/6.0 * dt);
	var force = a.force.add(b.force.add(c.force).multiplyScalar(2)).add(d.force).multiplyScalar(1.0/6.0 * dt);

	cell.currentState.position.addVectors(cell.currentState.position, vel);
	cell.currentState.momentum.addVectors(cell.currentState.momentum, force);
	cell.currentState.recalculate();
}

function forces(otherCells, cell, nonCells){
	var forces = randomMovement(cell.currentState);
	forces.add(cell.interactions(forces, nonCells));
	forces.add(gravity(cell));
	forces.addVectors(forces, damping(cell));
	forces.addVectors(forces, collide(otherCells, cell));
	forces = collideWithWall(cell, forces);
	return forces;
}

function damping(cell){
	return cell.currentState.velocity.clone().multiplyScalar(-linearDamping);
}

function collide(otherCells, cell){
	var accForce = v2();
	otherCells.forEach(function(oCell){
		if(oCell.id !== cell.id){
			accForce.add(calculateCollisionForce(cell.currentState, oCell.currentState));
		}
	})

	return accForce;
}
function gravity(cell){
	var zero = v2(0, 0);
	var dir = zero.sub(cell.currentState.position).normalize();
	return dir.multiplyScalar(0.0001);
}

function calculateCollisionForce(stateA, stateB){
	var force = v2();
	var a_to_b = v2().subVectors(stateB.position, stateA.position);
	if (a_to_b.lengthSq() > (stateA.radius + stateB.radius)*(stateA.radius + stateB.radius))
		return force;	//no collision

	//collision
	var a_to_b_norm = a_to_b.clone().normalize();
	var B = a_to_b_norm.clone().negate().multiplyScalar(stateB.radius);
	var A = a_to_b_norm.clone().multiplyScalar(stateA.radius);
	var penetrationVec = B.sub(A);

	return penetrationVec.multiplyScalar(BOUNCE);
}

function collideWithWall(cell, force){
	if(cell.currentState.position.x >= WIDTH/2 + MARGIN_HORI){
		force.x *= (force.x > 0) ? -10 : 10;
		cell.currentState.position.x = WIDTH/2 + MARGIN_HORI;
	}else if(cell.currentState.position.x <= WIDTH/-2 - MARGIN_HORI){
		force.x *= (force.x < 0) ? -10 : 10;
		cell.currentState.position.x = WIDTH/-2 - MARGIN_HORI;
	}

	if(cell.currentState.position.y >= HEIGHT/2 + MARGIN_VERT){
		force.y *= (force.y > 0) ? -10 : 10;
		cell.currentState.position.y = HEIGHT/2 + MARGIN_VERT;
	}else if(cell.currentState.position.y <= HEIGHT/-2 - MARGIN_VERT){
		force.y *= (force.y < 0) ? -10 : 10;
		cell.currentState.position.y = HEIGHT/-2 - MARGIN_VERT;
	}

	return force;
}

function randomMovement(state){
	var posX = state.position.x/WIDTH;
	var posY = state.position.y/HEIGHT;

	var noiseX = noise.perlin2(posX, posY)/100;
	noise.seed(Math.random());
	var noiseY = noise.perlin2(posY, posX)/100;

	return v2(noiseX, noiseY);

	// return v2((1-2*Math.random())/350, (1-2*Math.random())/350);
}


function makeRenderTexture(w, h){
	w = w || WIDTH;
	h = h || HEIGHT;
	return new t3.WebGLRenderTarget(w, h, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat });
}

function HSVToRGB(H, S, V){
	var h = parseInt(H/60.0);
	var f = (H/60 - h);
	
	var p = V*(1 - S);
	var q = V*(1 - S*f);
	var t = V*(1 - S*(1 - f));

	switch (h){
		case 0:
			return v3(V, t, p);
		case 1:
			return v3(q, V, p);
		case 2:
			return v3(p, V, t);
		case 3:
			return v3(p, q, V);
		case 4:
			return v3(t, p, V);
		case 5:
			return v3(V, p, q);
		case 6:
			return v3(V, t, p);
	}
}

