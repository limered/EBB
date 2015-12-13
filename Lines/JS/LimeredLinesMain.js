function LinesDemo(canvas){
	this._canvas = canvas;

	//scenes
	this._lineScene = new t3.Scene();
	this._particleScene = new t3.Scene();
	this._fsqScene = new t3.Scene();

	//camera
	this._camera = camera;//new Camera(v3(0, 0, 1000));
	this._fsqCamera = new t3.OrthographicCamera(WIDTH/-2, WIDTH/2, HEIGHT/2, HEIGHT/-2, 1, 1000);

	//renderer
	this._renderer = new t3.WebGLRenderer({antialias:true});
	this._renderer.setSize(WIDTH, HEIGHT);
	this._renderer.autoClear = false;
	this._renderer.setPixelRatio( window.devicePixelRatio );
	this._renderer.setClearColor( 0x000000 );
	this._canvas.appendChild(this._renderer.domElement);

	//simulation
	this._t = 0.0;
	this._dt = 20;
	this._currentTime = 0.0;
	this._accumulator = 0.0;

	//objects
	this._lineNumber = 0;
	this._lines = [];

	this._lineMesh = new LineMesh(MAX_LINES);
	this._lineMesh.addToScene(this._lineScene);

	this._particleMesh = new ParticleMesh(MAX_PARTICLES);
	this._particleMesh.addToScene(this._particleScene);

	//textures
	this._particleTexture = makeRenderTexture();
	this._horizBlurredPartikleTex = makeRenderTexture();
	this._blurredParticleTexture = makeRenderTexture();
	this._lineTexture = makeRenderTexture();
	this._lineGlowTexture = makeRenderTexture();
	this._lineComposeTex = makeRenderTexture();
	this._compositeTexture = makeRenderTexture();

	//composer - line
	this._lineComposer = new t3.EffectComposer( this._renderer, this._lineGlowTexture );
	this._lineComposer.addPass( new t3.RenderPass( this._lineScene, this._camera.getCamObject() ));

	this._blurLineHori = new t3.ShaderPass( LineConvolution1D );
	this._blurLineHori.uniforms['dir'].value = v2(2.0/WIDTH, 0.0);
	this._blurLineHori.uniforms['size'].value = 1.6;

	this._blurLineVert = new t3.ShaderPass( LineConvolution1D );
	this._blurLineVert.uniforms['dir'].value = v2(0.0, 2.0/HEIGHT);
	this._blurLineVert.uniforms['size'].value = 1.6;
	// this._blurLineVert.renderToTarget = true;

	this._lineBlend = new t3.ShaderPass( alphaBlendShader );
	this._lineBlend.uniforms['tDiffuse2'].value = this._lineTexture;
	this._lineBlend.renderToTarget = true;


	this._lineComposer.addPass(this._blurLineHori);
	this._lineComposer.addPass(this._blurLineVert);
	this._lineComposer.addPass(this._lineBlend);

	this._lineBlendComposer = new t3.EffectComposer( this._renderer, this._lineComposeTex);
	this._lineColor = new t3.ShaderPass( ColorChange );
	this._lineColor.uniforms['tDiffuse3'].value = this._lineGlowTexture;
	this._lineColor.uniforms['color'].value = COLOR;
	this._lineColor.renderToTarget = true;
	
	this._lineBlendComposer.addPass(this._lineColor);




	//composer - particle
	this._particleComposer = new t3.EffectComposer( this._renderer, this._compositeTexture );
	this._particleComposer.addPass( new t3.RenderPass( this._particleScene, this._camera.getCamObject() ));

	this._blurHori = new t3.ShaderPass( Convolution1D );
	this._blurHori.uniforms['dir'].value = v2(2.0/WIDTH, 0.0);
	this._blurHori.uniforms['size'].value = PARTICLE_SIZE;

	this._blurVert = new t3.ShaderPass( Convolution1D );
	this._blurVert.uniforms['dir'].value = v2(0.0, 2.0/HEIGHT);
	this._blurVert.uniforms['size'].value = PARTICLE_SIZE;
	// this._blurVert.renderToTarget = true;

	this._particleBlend = new t3.ShaderPass( alphaBlendShader );
	this._particleBlend.uniforms['tDiffuse2'].value = this._particleTexture;
	// this._particleBlend.renderToTarget = true;

	this._particleColor = new t3.ShaderPass( ColorChangeInv );
	this._particleColor.uniforms['color'].value = COLOR;
	// this._particleColor.renderToScreen = true;

	this._particleComposer.addPass(this._blurHori);
	this._particleComposer.addPass(this._blurVert);
	this._particleComposer.addPass(this._particleBlend);
	this._particleComposer.addPass(this._particleColor);

	//composer - all
	this._allBlend = new t3.ShaderPass( alphaBlendShader );
	this._allBlend.uniforms['tDiffuse2'].value = this._lineComposeTex;
	this._allBlend.renderToScreen = true;
	this._particleComposer.addPass(this._allBlend);

	//camera Effect
	this._currentCamEffect = new CameraEffect(
		[0, 500, ], 
		[v3(400, 200, 1000), v3(-400, 200, 1000), v3(-400, -200, 1000)], 
		this._camera,
		"linear",
		null);

	this._testScene = new LineScene(0, 2000, 
		new CameraEffect([0, 500, 1000, 2000], [v3(400, 200, 1000), v3(-400, 200, 1000), v3(-400, -200, 1000), v3(0, 0, 1000)], this._camera, "linear", null),
		new LinePath([0, 500, 1000], LinePath.LINE, [v2(400, 200), v2(-400, 200), v2(-400, -200)], 20, false));

	this._program = new Program(lineChorio);
	// this._program = new Program(testChorio);

	this.AudioInterface = this.AudioInterface = new AudioInterface("JS/StruckturedLines.mp3", this.render.bind(this));;

	//stats
	this._stats = new Stats();
	this._stats.domElement.style.position = 'absolute';
	this._stats.domElement.style.top = '200px';
//	document.querySelector("body").appendChild(this._stats.domElement);

	//per frame rendering
	this._framecounter = 0;

	//Worker
	this._particleWorker = new Worker("JS/particleThread/particleThread.js");
	this._particleWorker.onmessage = this._onParticleWorkerMessage.bind(this);

	this._lineWorker = new Worker("JS/lineThread/LineThread.js");
	this._lineWorker.onmessage = this._onLineWorkerMessage.bind(this);
}


LinesDemo.prototype = {
	init:function(){
		this.startTime = +new Date();
		this.AudioInterface.init();
//		this.render();
	},

	render:function(){
		requestAnimationFrame( this.render.bind(this) );

		if(window.AudioContext || window.webkitAudioContext)
			this._t = this.AudioInterface.getTime();
		else
			this._t = +new Date() - this.startTime;
		
		//start rendering functions
		this.preSimulationFunction(this._t);
		
		//end_function
		this.postRenderingFunction();
		
		
		this._stats.update();
		
		COLORUPDATED = false;
	},
	preSimulationFunction:function(){
		this._framecounter++;

		if(this._framecounter % 3 === 0)
			this.AudioInterface.showStuff();

		this._program.animate(this._t);
	},
	postRenderingFunction:function(){
		this._renderer.render( this._lineScene, this._camera.getCamObject(), this._lineTexture, true );
		this._renderer.render( this._particleScene, this._camera.getCamObject(), this._particleTexture, true );

		if(PARTICLE_SIZE_UPDATED){
			this._blurHori.uniforms['size'].value = PARTICLE_SIZE;
			this._blurVert.uniforms['size'].value = PARTICLE_SIZE;
		}
		if(COLORUPDATED){
			this._lineColor.uniforms['color'].value = COLOR;
			this._particleColor.uniforms['color'].value = COLOR;
		}

		this._lineComposer.render();
		this._lineBlendComposer.render();
		this._particleComposer.render();

		PARTICLE_SIZE_UPDATED = false;
		COLORUPDATED = false;
	},

	/* objects */
	addLineArray:function(position, direction, speed){
		var message = {
			op: "addLine",
			position: [position.x, position.y],
			direction: direction,
			speed: speed
		}
		this._lineWorker.postMessage(message);
	},
	addParticleArray:function(particlePositions, particleDirections){
		var message = {
			op: "addParticles",
			ids: [],
			positions: [],
			directions: []
		}
		for(var i = 0; i < particlePositions.length; i++){
			message.ids.push(this._particleMesh.getNewParticle());
			message.positions.push([particlePositions[i].x, particlePositions[i].y]);
			message.directions.push([particleDirections[i].x, particleDirections[i].y]);
		}
		this._particleWorker.postMessage(message);
	},
	clearScenes:function(){
		this._particleWorker.postMessage({op: "clear"});
		this._lineWorker.postMessage({op: "clear"});
	},

	_onParticleWorkerMessage:function(evt){
		var data = evt.data;
		if(data.op === "updateParticles")
			this._particleMesh.updateParticleArray(data.positions);
	},
	_onLineWorkerMessage:function(evt){
		var data = evt.data;
		if(data.op === "updateLines"){
			this._lineMesh.updateLineArray(data.positions);
//			this._stats.update();
		}
		if(data.op === "addParticles")
			this._particleWorker.postMessage(data);
	}
}

var lineDemo = new LinesDemo(document.querySelector('#drawing'));

function startLines(){
	lineDemo.init();
}

document.onkeydown = function(evt){
	if(evt.keyIdentifier === "Right"){
		PARTICLE_SIZE += 0.05;
		PARTICLE_SIZE_UPDATED = true;
	}
	if(evt.keyIdentifier === "Left"){
		PARTICLE_SIZE -= 0.05;
		PARTICLE_SIZE_UPDATED = true;
	}
	console.log(evt.keyIdentifier);
}

document.querySelector("#color-slider").onchange = function(evt){
	var value = parseInt(evt.currentTarget.value);
	// MAX_CELL_SIZE = value;
	rgb = HSVToRGB(value, 1.0, 0.65);
	COLOR = v4(rgb.x, rgb.y, rgb.z, 1.0);
	COLORUPDATED = true;
}