function EffectFactory(){
	this.RANDOM = 0;
	this.POINT = 1;
	this.LINE = 2;
	this.BSPLINE_PERIODIC = 3;
	this.BSPLINE_OPEN = 4;
	this.NURBS = 5;
	this.CIRCLE = 6;
	this.SPIRAL = 7;
}

EffectFactory.prototype = {
	makePath:function(form, points, length){
		var result = [];
		switch (form){
			case this.RANDOM:
				for (var i = 0; i < length; i++){
					result.push(v2(t3.Math.randInt(points[0].x, points[1].x), 
						t3.Math.randInt(points[0].y, points[1].y)));
				}
				return result;
			case this.POINT:
				for (var i = 0; i < length; i++){
					result.push(points[0].clone());
				}
				return result;
			case this.LINE:
				var stepSize = 1.0/length;
				for (var line = 0; line < points.length - 1; line++){
					for (var i = 0; i < length; i++){
						result.push(points[line].clone().lerp(points[line+1], stepSize*i));
					}
				}
				return result;
		}
	}
}

function LinePath(times, form, points, length, instant, lineDir, lineSpeed){
	this._times = times;
	this._form = form;
	this._points = points;
	this._length = length;
	this._lineDir = lineDir;
	this._lineSpeed = lineSpeed;

	this._resultTime = this._generateTimePoints();
	this._resultPoints = this._generatePositions();
}

LinePath.prototype = {
	_generateTimePoints:function(){
		var result = [];
		for (var t = 0; t < this._times.length - 1; t++){
			var step = (this._times[t + 1] - this._times[t])/this._length;
			for (var i = 0; i < this._length; i++){
				result.push(this._times[t] + step*i);
			}
		}
		return result;
	},
	_generatePositions:function(){
		var result = [];
		switch(this._form){
			case LinePath.RANDOM:
				for (var i = 0; i <= this._length; i++){
					result.push(v2(t3.Math.randInt(this._points[0].x, this._points[1].x), 
						t3.Math.randInt(this._points[0].y, this._points[1].y)));
				}
				break;
			case LinePath.POINT:
				for (var i = 0; i <= this._length; i++){
					result.push(this._points[0].clone());
				}break;
			case LinePath.LINE:
				var stepSize = 1.0/this._length;
				for (var line = 0; line < this._points.length - 1; line++){
					for (var i = 0; i < this._length; i++){
						result.push(this._points[line].clone().lerp(this._points[line+1], stepSize*i));
					}
				}
				result.push(this._points[this._points.length-1]);
				break;
			case LinePath.BSPLINE_OPEN:
				// var stepSize = 1.0/this._length;
				var curve = new t3.SplineCurve(this._points);
				result = curve.getPoints(this._length);
		}

		return result;
	}, 
	length:function(){
		return this._resultTime.length;
	},
	time:function(t){
		return this._resultTime[t];
	},
	point:function(t){
		return this._resultPoints[t];
	},
	dir:function(){
		return this._lineDir;
	},
	speed:function(){
		return this._lineSpeed;
	}
}

LinePath.RANDOM = 0;
LinePath.POINT = 1;
LinePath.LINE = 2;
LinePath.BSPLINE_PERIODIC = 3;
LinePath.BSPLINE_OPEN = 4;
LinePath.NURBS = 5;
LinePath.CIRCLE = 6;
LinePath.SPIRAL = 7;