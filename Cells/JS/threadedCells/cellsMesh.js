function CellContainer(size, scene){
	this.size = size;
	this.scene = scene;
	this.cellMeshes = [];
	
	this.isUpdating = false;
	
	this.mat = new t3.ShaderMaterial( cellShaderMaterial );
}

CellContainer.prototype = {
	getNewId:function(){
		var res = -1;
		for (var i = 0; i < this.size; i++){
			if(this.cellMeshes[i] === null || this.cellMeshes[i] === undefined){
				res = i;
				break;
			}
		}
		return res;
	},
	addCellMesh:function(id, x, y){
		var geometry = new t3.SphereGeometry( 1, 15, 15 );
		var mesh = new t3.Mesh(geometry, this.mat.clone() );
		mesh.material.uniforms['centerColor'].value = COLOR;
		mesh.material.needsUpdate = true;
		mesh.position.z = -180;
		this.cellMeshes[id] = mesh;
		this.scene.add(mesh);
	},
	needsUpdate:function(){
		COLORUPDATED = false;
		this.isUpdating = false;
	},
	render:function(positions){
		if(this.isUpdating)
			return;
		this.isUpdating = true;
		var scope = this;
		window.setTimeout(function(){
			scope.timedUpdate(positions, scope, 0);
		}, 10);
	},
	
	renderCell:function(id, x, y, radius, scale, color){
		var cell = this.cellMeshes[id];
		if(cell){
			cell.scale.set(scale, scale, scale);
			cell.position.set(x, y, -radius*2);
		
			var colorChange = !COLOR.equals(cell.material.uniforms['centerColor'].value);
			if(colorChange || color.length > 0){
				var thisColor = (color.length > 0) ? v4(color[0], color[1], color[2], 1.0) : cell.material.uniforms['centerColor'].value;
				var newColor = thisColor.clone().lerp(COLOR, 0.1);
				cell.material.uniforms['centerColor'].value = newColor;
				cell.material.needsUpdate = true;
			}
		}
	},
	timedUpdate:function(positions, scope, lastKey){
		var key = lastKey || 0;
		var start = +new Date();
		while (key < positions.length && (+new Date() - start) < 10){
			var cell = positions[key];
			if (cell)
				scope.renderCell(cell.id, cell.position[0], cell.position[1], cell.radius, cell.scale, cell.color);
			key++;
		}
		if (key < positions.length)
			window.setTimeout(function(){
				scope.timedUpdate(positions, scope, key);
			}, 5);
		else
			scope.needsUpdate();
	},
	killCell:function(id){
		var cell = this.cellMeshes[parseInt(id)];
		this.scene.remove(cell);
		this.cellMeshes[parseInt(id)] = undefined;
	}
}
