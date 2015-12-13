function Camera(pos){
	this._pos = pos;

	this._camObject = new t3.PerspectiveCamera( 110, WIDTH / HEIGHT, 1, 10000 );
	this._rotationVec = v3(0, 0, 1);
	
	this._init();
}

Camera.prototype = {
	_init:function(scene){
		this._camObject.position.set(this._pos.x, this._pos.y, this._pos.z);
	},
	addToScene:function(scene){
		scene.add(this._camObject);
	},
	removeFromScene:function(scene){
		scene.remove(this._camObject);
	},
	getCamObject:function(){
		return this._camObject;
	},
	setPosition:function(pos){
		this._camObject.position.set(pos.x, pos.y, pos.z);
	},
	setRotation:function(angle){
		this._camObject.rotation.setFromVector3(this._rotationVec.clone().multiplyScalar(angle), "XYZ");
	}
}

function CameraEffect( times, positions, cam, type, tangents ){
	this._times = times;
	this._positions = positions;
	this._tangents = tangents;
	this._type = type;

	this._cam = cam;

	this._pointer = 0;
}

CameraEffect.prototype = {
	animate:function(t){
		if(t < this._times[0] || t > this._times[this._times.length - 1])
			return;
		if(this._pointer < this._times.length - 1 && t >= this._times[this._pointer + 1])
			this._pointer++;

		this._moveCamera(t);
	},
	_moveCamera:function(t){
		var tLocal = this._tLocal(t);
		var nextPos = this._nextCamPosition(tLocal);

		this._cam.setPosition(nextPos.pos);
		this._cam.setRotation(nextPos.rot);
	},
	_tLocal:function(t){
		var startTime = this._times[this._pointer];
		var endTime = (this._pointer >= this._times.length-1) ? 
			Number.MAX_VALUE : 
			this._times[this._pointer + 1];
		return (t - startTime)/(endTime - startTime);
	},
	_nextCamPosition:function(tLocal){
		var start = this._positions[this._pointer];
		var end = (this._pointer >= this._positions.length-1) ? 
			this._positions[this._pointer] : 
			this._positions[this._pointer + 1];

		var startRot = start.w;
		var startPos = v3(start.x, start.y, start.z);

		var endRot = end.w;
		var endPos = v3(end.x, end.y, end.z);		

		switch (this._type){
			case "linear":
				return {
					pos: startPos.clone().lerp(endPos, tLocal),
				 	rot: endRot * tLocal  + (1.0-tLocal) * startRot
				}
			case "spline":
				return;
		}
	}
}