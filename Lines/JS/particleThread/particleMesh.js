function ParticleMesh(size){
	this._size = size;
	this._count = 0;
	this._partiicles = new t3.Geometry();

	this._material = new t3.PointCloudMaterial( {size: 3, sizeAttenuation: false, color: new t3.Color(0xffffff), alphaTest: 0.5, transparent: true } );

	this._mesh = null;

	this._init();
}

ParticleMesh.prototype = {
	_init:function(){
		for (var i = 0; i < this._size; i++)
			this._partiicles.vertices.push(v3(50000, 50000, -10));
		this._mesh = new t3.PointCloud(this._partiicles, this._material);
		this._mesh.frustumCulled = false;
	},
	addToScene:function(scene){
		scene.add(this._mesh);
	},
	getNewParticle:function(){
		var res = this._count;
		this._count = this._count < this._size - 1 ? this._count + 1 : 0;
		return res;
	},
	setParticlePos:function(id, pos){
		this._mesh.geometry.vertices[id].x = pos[0];
		this._mesh.geometry.vertices[id].y = pos[1];
	},
	updateParticleArray:function(positions){
		this.timedUpdate(positions, this, 0);
	},
	needsUpdate:function(){
		this._mesh.geometry.verticesNeedUpdate = true;	
	},
	timedUpdate:function(positions, scope, lastKey){
		var key = lastKey;
		var start = +new Date();
		while(key < positions.length && (new Date() - start) < 25){
			var pos = positions[key];
			if(pos)
				scope.setParticlePos(key, positions[key]);
			key++;
		}

		if(key < positions.length)
			window.setTimeout(function(){
				scope.timedUpdate(positions, scope, key);
			}, 5);
		else
			scope.needsUpdate();
	},
	clear:function(){
		this._mesh.visible = false;
		for (var i = 0; i < this._size; i++)
			this._partiicles.vertices[i].set(50000, 50000, -10);
		this._mesh.geometry.verticesNeedUpdate = true;
		this._count = 0;
		this._mesh.visible = true;
	}
}