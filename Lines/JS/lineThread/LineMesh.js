function LineMesh(size){
	this._size = size;
	this._count = 0;
	this._lines = new t3.Geometry();

	this._material = new t3.MeshBasicMaterial({ color:0xffffff, opacity: 1, vertexColors: THREE.VertexColors});

	this._mesh = null;
	
	this.isUpdating = false;

	this._init();
}

LineMesh.prototype = {
	_init:function(){
		var normal = new v3(0, 0, 1);
		var colors = [new t3.Color( 0x00ff00 ), new t3.Color( 0x00ff00 ), new t3.Color( 0x00ff00 ), new t3.Color( 0x00ff00 )];

		for (var i = 0; i < this._size; i++){
			this._lines.vertices.push(v3(50000, 50000, -10));
			this._lines.vertices.push(v3(50000, 50000, -10));
			this._lines.vertices.push(v3(50000, 50000, -10));
			this._lines.vertices.push(v3(50000, 50000, -10));

			var index = i*4;

			this._lines.faces.push(new t3.Face3(index+2, index+1, index  ));
			this._lines.faces.push(new t3.Face3(index+1, index+2, index+3));
		}
		this._lines.computeFaceNormals();

		this._mesh = new t3.Mesh(this._lines, this._material);
		this._mesh.frustumCulled = false;
	},
	addToScene:function(scene){
		scene.add(this._mesh);
	},
	getNewLine:function(){
		var res = this._count;
		this._count = this._count < this._size - 1 ? this._count + 1 : 0;
		return res;
	},
	_setLinePos:function(id, pos){
		var index = id*4;
		this._mesh.geometry.vertices[index    ].set(pos[0], pos[1], -10);
		this._mesh.geometry.vertices[index + 1].set(pos[2], pos[3], -10);
		this._mesh.geometry.vertices[index + 2].set(pos[4], pos[5], -10);
		this._mesh.geometry.vertices[index + 3].set(pos[6], pos[7], -10);
	},
	updateLineArray:function(positions){
		if(this.isUpdating)
			return;
		this.isUpdating = true;
		var scope = this;
		scope.timedUpdate(positions, scope, 0);
	},
	needsUpdate:function(scope){
		this._mesh.geometry.verticesNeedUpdate = true;
		this.isUpdating = false;
	},
	timedUpdate:function(positions, scope, lastKey){
		var key = lastKey || 0;
		var start = +new Date();
		while(key < positions.length && (+new Date() - start) < 10){
			var pos = positions[key];
			if(pos)
				scope._setLinePos(key, pos);
			key++;
		}
		if(key < positions.length)
			window.setTimeout(function(){
				scope.timedUpdate(positions, scope, key);
			}, 10);
		else
			scope.needsUpdate();
	},
	clear:function(){
		this._mesh.visible = false;
		for (var i = 0; i < this._size*4; i++){
			this._lines.vertices[i].set(50000, 50000, -10);
		}
		this._mesh.geometry.verticesNeedUpdate = true;
		this._count = 0;
		this._mesh.visible = true;
	}
}