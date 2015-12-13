function FullScreenQuad(width, height, material, scene){
	this.geometry = new t3.PlaneBufferGeometry(width, height, 4, 4);
	this.mesh = new t3.Mesh(this.geometry, material);
	this.mesh.position.set(0, 0, -100);
	scene.add(this.mesh);
}