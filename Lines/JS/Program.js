function LineScene(startTime, endTime, camEffect, linePath, dontClearScene){
	this._startTime = startTime;
	this._endTime = endTime;
	this._camEffect = camEffect;
	this._linePath = linePath;
	this._dontClearScene = dontClearScene || false;

	this._pLinePath = 0;
}

LineScene.prototype = {
	animate:function(t){
		if(t < this._startTime || t > this._endTime)
			return;
		this._camEffect.animate(t);
		this._makeLines(t);
	},
	_makeLines:function(t){
		while(this._pLinePath < this._linePath.length() - 1 && t >= this._linePath.time(this._pLinePath + 1) ){
			this._pLinePath++;
			this._addCurrentLine();
		}
	},
	_addCurrentLine:function(){
		lineDemo.addLineArray(this._linePath.point(this._pLinePath), this._linePath.dir(), this._linePath.speed());
	},
	startTime:function(){
		return this._startTime;
	},
	clearAfter:function(){
		return !this._dontClearScene;
	}
}

function Program(chorio){
	this._chorio = chorio;	//Array containing LineScenes

	this._pointer = 0;
}

Program.prototype = {
	animate:function(t){
		if(this._pointer < this._chorio.length - 1 && t >= this._chorio[this._pointer + 1].startTime()){
			if(this._chorio[this._pointer].clearAfter())
				this._clearScenes();
			this._pointer++;
			this._advanceChorio();
		}

		this._chorio[this._pointer].animate(t);
	},
	_clearScenes:function(){
		lineDemo.clearScenes();
	},
	_advanceChorio:function(){

	}
}