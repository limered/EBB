function AudioInterface(uri, callback){
	this.uri = uri;
	this.callback = callback;
	this.maxMixValues = 3;
	this.mixValues = new Array(this.maxMixValues);
	this.pMixValues = 0;

//	this.setupAudioNodes();//.bind(this);
}

AudioInterface.prototype = {
	init: function(){
		if(window.AudioContext || window.webkitAudioContext){
			this.context = new (window.AudioContext || window.webkitAudioContext)();
		
			this.audio = document.querySelector("audio");
			this.audio.src = this.uri;

			this.setupAudioNodes();
		}else{
			this.audio = document.querySelector("audio");
			this.audio.src = this.uri;
			this.play();
		}
	},
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

		var smoothValue = this.freqs[26] + this.freqs[28] / 2;
		this.mixValues[this.pMixValues] = smoothValue;
		this.pMixValues = (this.pMixValues + 1) % this.maxMixValues;
		var smoother = 0;
		this.mixValues.forEach(function(val){
			smoother += val
		});
		smoother /= this.maxMixValues;
		value -= smoother;
		value /= 255;
		value = (value < 0) ? 0 : value * 18;

		PARTICLE_SIZE = value;
		PARTICLE_SIZE_UPDATED = true;
	},
	getTime:function(){
		return this.context.currentTime * 1000;
	}
}