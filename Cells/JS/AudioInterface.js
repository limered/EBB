function AudioInterface(uri, callback){
	this.uri = uri;
	this.callback = callback;
	this.maxMixValues = 5;
	this.mixValues = new Array(this.maxMixValues);
	this.pMixValues = 0;
}

AudioInterface.prototype = {
	init:function(){
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
		this.audio.play()

		this.callback();
	},

	showStuff: function(){
		this.analyzer.fftSize = 128;
		this.analyzer.getByteFrequencyData(this.freqs);
		var value = (this.freqs[0] + this.freqs[3] + this.freqs[5]) / 3;

		this.mixValues[this.pMixValues] = value;
		for(var i = 0; i < this.mixValues.length; i++)
			value += this.mixValues[i];
		value /= this.maxMixValues + 1;

		this.pMixValues = ((this.pMixValues + 1) % this.maxMixValues)

		rgb = HSVToRGB(value/165 * 360, 1.0, 0.65);
		COLOR = v4(rgb.x, rgb.y, rgb.z, 1.0);
		COLORUPDATED = true;
	},
	getTime:function(){
		return this.context.currentTime * 1000;
	}
}