function CellsDemo(canvas){
	this.canvas = canvas;
	//scenes
	this.backgroundScene = new t3.Scene();
	this.middleScene = new t3.Scene();
	this.frontScene = new t3.Scene();

	this.scene = new t3.Scene();

	//camera
	this.camera = new t3.OrthographicCamera(WIDTH/-2, WIDTH/2, HEIGHT/2, HEIGHT/-2, 1, 1000);

	//renderer
	this.renderer = new t3.WebGLRenderer();
	this.renderer.setSize(WIDTH, HEIGHT);
	this.renderer.autoClear = false;
	this.renderer.setClearColor( 0xffffff );
	this.canvas.appendChild(this.renderer.domElement);

	//simulation
	this.t = 0.0;
	this.dt = 20;
	this.currentTime = 0;
	this.accumulator = 0.0;

	//objects
	this.bg = new Background(128, 128);
	
	this.cellNumber = 0;
	this.cells = [];
	
	this.cellsMeshes = new CellContainer(MAX_CELL_COUNT, this.middleScene);
	this.cellWorker = new Worker('JS/threadedCells/cellsThread.js');
	this.cellWorker.onmessage = this._onCellWorkerMessage.bind(this);
	
	this.floaterMeshes = new FloaterMeshes(MAX_EYE_COUNT, this.frontScene);
	this.floaterWorker = new Worker('JS/threadedLensObject/FloaterWorker.js');
	this.floaterWorker.onmessage = this._onFloaterWorkerMessage.bind(this);
	
	this.cellsToRemove = [];
	this.eyeNumber = 0;
	this.eyeObjects = [];
	this.fusselToRemove = [];

	this.nonCells = [];
	this.nonCellsToRemove = [];
	this.nonCellsCounter = 0;

	//textures
	this.backgroundTex = makeRenderTexture();
	this.middlegroundTex = makeRenderTexture();
	this.foregroundTex = makeRenderTexture();
	this.blurredForegroundTex = makeRenderTexture();

	//middle + back
	alphaBlendShader.uniforms['tDiffuse1'].value = this.backgroundTex;
	alphaBlendShader.uniforms['tDiffuse2'].value = this.middlegroundTex;
	alphaBlendShader.uniforms['tDiffuse3'].value = this.blurredForegroundTex;
	var material = new t3.ShaderMaterial( alphaBlendShader );

	this.fsq = new FullScreenQuad(WIDTH, HEIGHT, material, this.scene);

	//other
	this.stats = new Stats();
	this.stats.domElement.style.position = 'absolute';
	this.stats.domElement.style.bottom = '200px';
	this.light = new t3.PointLight(0xffffff, 1.5, 5000);

	//composer
	this.composer = new THREE.EffectComposer( this.renderer, this.blurredForegroundTex );
	this.composer.addPass( new t3.RenderPass( this.frontScene, this.camera ));

	this.blurHoriz = new t3.ShaderPass( blurShader );
	this.blurHoriz.uniforms['tex'].value = this.foregroundTex;
	this.composer.addPass( this.blurHoriz );

	this.AudioInterface = new AudioInterface("JS/Zellen.mp3", this.render.bind(this));

	this.program = new Interpreter(cellProgramm);
	
	this.webcam = null;
	if(Camera.hasGetUserMedia)
		this.webcam = new Camera(document.querySelector("#webcam"), v2(128, 128));
	this.blobs = [];
	
	this.timeElement = document.querySelector("#time");
	
	this.eyeCounter = 0;
}

CellsDemo.prototype = {
	init:function(){
		this.backgroundScene.add(this.light);
		this.light.position.set(0, 0, 100);

//		document.querySelector("body").appendChild( this.stats.domElement );

		this.bg.make();
		this.bg.addToScene(this.backgroundScene);

		this.cellWorker.postMessage({
			op:'start'
		});
		
		this.floaterWorker.postMessage({
			op: 'start'
		});
		
		this.AudioInterface.init();
		this.startTime = +new Date();

	},
	render:function(){
		requestAnimationFrame( this.render.bind(this) );

		this.program.progress(this.t);
		// this.AudioInterface.showStuff();

		this.eyeCounter++;
		if(this.eyeCounter >= ADD_EYE_INTERVAL){
			this.addEyeObject();
			this.eyeCounter = t3.Math.randInt(0, ADD_EYE_INTERVAL);
		}

		if(window.AudioContext || window.webkitAudioContext){
			var newTime = this.AudioInterface.getTime();
			this.t = this.AudioInterface.getTime();
		}else{
			var newTime = +new Date() - this.startTime;
			this.t = newTime;
		}
		
		var sec = (this.t / 1000) | 0;
		var mili = (this.t | 0).toString();
//		this.timeElement.innerHTML = sec + "." + mili.substr(mili.length-3);
		
		var frameTime = newTime - this.currentTime;
		if(frameTime > 1000/30)
			frameTime = 1000/30;
		currentTime = newTime;

		this.accumulator += frameTime;
				
		while(this.accumulator >= this.dt){
//			this.animate(this.t, this.dt);
			this.bg.animate(this.dt);

			this.accumulator -= this.dt;
		}

		var alpha = this.accumulator / this.dt;

		//integrate rest
//		this.interpolate(alpha);
		this.bg.interpolate(alpha);

//		this.renderCells();
		this.bg.render();

		//vignette Radius
		vR = 0.1 * (this.t/500);
		if(vR < 0.55){
			vR = t3.Math.clamp(vR, 0.0, 0.55);	
			this.fsq.mesh.material.uniforms['vignette_radius'].value = vR;
			this.fsq.mesh.material.needsUpdate = true;	
		}
		
		this.renderer.clear(0xffffff);

		//render background
		this.renderer.render( this.backgroundScene, this.camera, this.backgroundTex, true );
		// this.backgroundTex.needsUpdate = true;

		this.renderer.render( this.middleScene, this.camera, this.middlegroundTex, true );
		// this.renderer.render( this.frontScene, this.camera );
		
		this.renderer.render( this.frontScene, this.camera, this.foregroundTex, true );

		this.composer.render();

		//render fsq
		this.renderer.render( this.scene, this.camera );

//		this.stats.update();
		
		//movement
		this.blobs = this.webcam.update();
		this.addBlobs();
		
	},

	addBlobs:function(){
		this.blobs.forEach(function(blob){
			if(blob){
                var center = blob.getCenter();
                if(center){
					var x = (center.x / 128 * WIDTH) - (WIDTH/2);
					var y = ((128-center.y) / 128 * HEIGHT) - (HEIGHT/2);
					cellsDemo.addNonCell(x, y, EFFECT_DIRECTION.x, EFFECT_DIRECTION.y, EFFECT_SIZE, EFFECT_TYPE, EFFECT_LIVE);
                }
            }
		});
	},
	
	removeCell:function(cell){
		this.middleScene.remove(cell.cell);
		this.cellsToRemove.push(cell);
	},

	addEyeObject:function(){
		var id = this.floaterMeshes.getNewId();
		this.floaterWorker.postMessage({
			op:'addFloater',
			id: id,
			x: t3.Math.randInt( WIDTH/-2, WIDTH/2 ),
			y: t3.Math.randInt( HEIGHT/-2, HEIGHT/2 )
		});
		
		this.floaterMeshes.addFloaterMesh(id);
	},
	removeEyeObject:function(fussel){
		this.frontScene.remove(fussel.mesh);
		this.fusselToRemove.push(fussel);
	},

	addNonCellBatch:function(nonCells){
		this.cellWorker.postMessage({
			op: "addNonCellBatch",
			list: nonCells
		});
	},
	addNonCell: function(x, y, vX, vY, radius, type, deathTime){
		this.cellWorker.postMessage({
			op: 'addNonCell',
			x: x,
			y: y,
			vX: vX,
			vY: vY,
			radius:radius,
			type:type,
			deathTime:deathTime
		});
	},
	removeNonCell: function(nonCell){
		this.nonCellsToRemove.push(nonCell);
	},
	/********************** new *****************/
	addCells:function(x, y){
		for (var i = 0; i < 2; i++){
			var id = this.cellsMeshes.getNewId();
			if(id < 0)
				return;
			this.cellsMeshes.addCellMesh(id, x, y);
			this.cellWorker.postMessage({
				op: 'addCell',
				id:id,
				x:x,
				y:y
			});
		}
	},
	/************* WORKER ********************/
	_onCellWorkerMessage:function(evt){
		var data = evt.data;
		if(data.op === "updateCells"){
			this.cellsMeshes.render(data.positions);
			this.stats.update();
		}
		if(data.op === "addCells")
			this.addCells(data.x, data.y);
		if(data.op === "killCell")
			this.cellsMeshes.killCell(data.id);
	},
	_onFloaterWorkerMessage:function(evt){
		var data = evt.data;
		if(data.op === "updateFloaters")
			this.floaterMeshes.render(data.positions);
		if(data.op === 'killFloater')
			this.floaterMeshes.killFloater(data.id);
	}

}

var cellsDemo = new CellsDemo(document.querySelector("#drawing"));

function startCells(){
	cellsDemo.init();
}

function toggleCamera(){
	if($('#blobs').hasClass('hidden'))
		$('#blobs').removeClass('hidden');
	else
		$('#blobs').addClass('hidden');
}

////onlick etc
//document.querySelector("#drawing").onclick = function(evt){
////	var x = parseInt(evt.layerX) - WIDTH/2;
////	var y = HEIGHT - parseInt(evt.layerY) - HEIGHT/2;
////
////	cellsDemo.addNonCell(x, y, 0, 0, 50, OBJECT_TYPES.COLOR, 1000);
//}

document.querySelector("#color-slider").onchange = function(evt){
	var value = parseInt(evt.currentTarget.value);
	// MAX_CELL_SIZE = value;
	rgb = HSVToRGB(value, 1.0, 0.65);
	COLOR = v4(rgb.x, rgb.y, rgb.z, 1.0);
	COLORUPDATED = true;
}