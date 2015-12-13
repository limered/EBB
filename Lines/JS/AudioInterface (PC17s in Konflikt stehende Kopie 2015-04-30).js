function AudioInterface(uri, callback){
	this.context = new (window.AudioContext || window.webkitAudioContext)();
	this.uri = uri;
	this.callback = callback;
	this.audio = document.querySelector("audio"); //document.createElement('audio');// new Audio();
	this.audio.src = this.uri;
	// this.audio.crossOrigin="anonymous";
	// this.audio.oncanplay = 

	this.maxMixValues = 5;

	this.mixValues = new Array(this.maxMixValues);
	this.pMixValues = 0;

	window.onload = this.setupAudioNodes.bind(this);
}

AudioInterface.prototype = {
	setupAudioNodes: function(){
		this.source = this.context.createMediaElementSource(this.audio);

		this.analyzer = this.context.createAnalyser();
		this.analyzer.connect(this.context.destination);

		this.source.connect(this.analyzer);
  		this.freqs = new Uint8Array(128);

  		this.play();
	},

	play: function(){
		this.audio.play();

		this.callback();
	},

	showStuff: function(){
		this.analyzer.fftSize = 64;
		this.analyzer.getByteFrequencyData(this.freqs);
		var value = this.freqs[20];// + this.freqs[3] + this.freqs[5]) / 3;

		// this.mixValues[this.pMixValues] = value;
		// for(var i = 0; i < this.mixValues.length; i++)
		// 	value += this.mixValues[i];
		// value /= this.maxMixValues + 1;

		// this.pMixValues = ((this.pMixValues + 1) % this.maxMixValues)

		value /= 255;
		value = (value < 0) ? 0 : value * 15;

		PARTICLE_SIZE = value;
		console.log(PARTICLE_SIZE);
		PARTICLE_SIZE_UPDATED = true;


		// BOUNCE = value/195 * 0.00005 - 0.000025;
		// if(this.pMixValues === 0)
		// 	console.log(BOUNCE);
		// rgb = HSVToRGB(value/165 * 360, 1.0, 0.65);
		// COLOR = v4(rgb.x, rgb.y, rgb.z, 1.0);
		// COLORUPDATED = true;
	}
}