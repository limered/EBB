function FloaterMeshes(size, scene){
	this.size = size;
	this.scene = scene;
	this.floaterMeshes = [];
	
	this.isUpdating = false;
	
	this.mat = new t3.ShaderMaterial( EyeShaderMaterial );
}

FloaterMeshes.prototype = {
	getNewId:function(){
		var res = -1;
		for(var i = 0; i < this.size; i++){
			if(this.floaterMeshes[i] === null || this.floaterMeshes[i] === undefined){
				res = i;
				break;
			}
		}
		return res;
	},
	addFloaterMesh:function(id){
		var geo = new t3.SphereGeometry( t3.Math.randInt(5, 12), 
										16, 16, 
										t3.Math.randFloat(0, Math.PI), 
										t3.Math.randFloat(0, Math.PI * 2), 
										t3.Math.randFloat(0, Math.PI / 2), 
										t3.Math.randFloat(0, Math.PI) );
		var mesh = new t3.Mesh( geo, this.mat );
		mesh.position.set(10000, 10000, 0);
		this.floaterMeshes[id] = mesh;
		this.scene.add(mesh);
	},
	render:function(positions){
		if(this.isUpdating)
			return;
		this.isUpdating = true;
		var scope = this;
		window.setTimeout(function(){
			scope.timedUpdate(positions, scope, 0);
		}, 5);
	},
	renderFloater:function(id, x, y){
		var floater = this.floaterMeshes[id];
		if(floater){
			floater.position.set(x, y, 0);
			var rand = t3.Math.randInt(1,4);
			var axis = ( rand === 1 ) ? v3(1,0,0) : ( rand=== 2 ) ? v3(0,1,0) : v3(0,0,1);
			var rotation = new t3.Quaternion().setFromAxisAngle(axis, t3.Math.random16() * Math.PI/100);
			floater.quaternion.multiply(rotation);
		}
	},
	timedUpdate:function(positions, scope, lastKey){
		var key = lastKey || 0;
		var start = +new Date();
		while (key < positions.length && (+new Date() - start) < 15){
			var floater = positions[key];
			if(floater)
				scope.renderFloater(floater.id, floater.x, floater.y);
			key++;
		}
		if(key < positions.length)
			window.setTimeout(function(){
				scope.timedUpdate(positions, scope, key);
			}, 5);
		else
			scope.isUpdating = false;
	},
	killFloater:function(id){
		var floater = this.floaterMeshes[id];
		this.scene.remove(floater);
		this.floaterMeshes[id] = undefined;
	}
}