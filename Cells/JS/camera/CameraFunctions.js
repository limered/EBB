function Camera(videoElement, pixelCount) {
    this.minBlobMass = 50;
    
    
	this._video = videoElement;
    this.imageWidth = videoElement.width;
    this.invWidth = 1.0/this.imageWidth;
    this.imageHeight = videoElement.height;

	//motion detection
	this._lastImageData;
	this._canvasSource = document.querySelector("#source");
	this._canvasBlend = document.querySelector("#blend");
    this._canvasBlob = document.querySelector("#blobs");

	this._contextSource = this._canvasSource.getContext("2d");
	this._contextBlend = this._canvasBlend.getContext("2d");
    this._contextBlob = this._canvasBlob.getContext("2d");
    
    this.outImage = this._contextSource.createImageData(this.imageWidth, this.imageHeight);

    this.pixelCount = pixelCount;
    this.pixelImage = new Int32Array(this.pixelCount.x * this.pixelCount.y);
    this.pixelDim = v2(parseInt(this.imageWidth / this.pixelCount.x), parseInt(this.imageHeight / this.pixelCount.y));
    this.pixelWeight = 1.0/(this.pixelDim.x * this.pixelDim.y);
    this.xPosMulti = 1.0/this.imageWidth * this.pixelCount.x;
    this.yPosMulti = 1.0/this.imageHeight * this.pixelCount.y;
    
    
    
    
    this.labelBuffer = [];
    this.labelTable = [];
    this.minTable = [];
    this.maxTable = [];
    this.massTable = [];
    this.currentBlobId = 0;
    this.blobList = [];
    
	//stats
//	this._stats = new Stats();
//	this._stats.domElement.style.position = 'absolute';
//	this._stats.domElement.style.top = '0px';
//
//	document.querySelector("body").appendChild( this._stats.domElement );

	this._init();
}

Camera.prototype = {
	_init:function(){
		var self = this;
		if(navigator.getUserMedia){
			navigator.getUserMedia({video:true}, function(stream){
				self._video.src = stream;
			}, Camera.webcamError);
		}else if(navigator.webkitGetUserMedia){
			navigator.webkitGetUserMedia({video: true}, function(stream){
				self._video.src = window.URL.createObjectURL(stream);
			}, Camera.webcamError);
		}else if(navigator.mozGetUserMedia){
			navigator.mozGetUserMedia({video: true}, function(stream){
				self._video.src = window.URL.createObjectURL(stream);
			}, Camera.webcamError);
		}

		//invert axis
		this._contextSource.translate(this._canvasSource.width, 0);
		this._contextSource.scale(-1, 1);

		this.update();
	},

	_drawVideo:function(){
		this._contextSource.drawImage(this._video, 0, 0, this._video.width, this._video.height);
	},
	_blend:function(){
		var width = this._canvasSource.width || 0;
		var height = this._canvasSource.height || 0;

		var sourceData = this._contextSource.getImageData(0, 0, width, height);
		if(!this._lastImageData) this._lastImageData = this._contextSource.getImageData(0, 0, width, height);

		this.blendData = new Uint8ClampedArray(width * height);
		this._difference(this.blendData, sourceData.data, this._lastImageData.data);

		this._lastImageData = sourceData;
	},

	update:function(dt){
		var self = this;

		this._drawVideo();
		this._blend();
        this._pixelateImage();
        this._drawPixelImage();
        
		this._detectBlobs();
        this._drawBlobs();

//		this._stats.update();
		
		return this.blobList;
	},

	_difference:function(target, data1, data2){
		if (data1.length != data2.length) return null;
		var i = 0;
		while (i < (data1.length * 0.25)) {
			var average1 = (data1[4*i] + data1[4*i+1] + data1[4*i+2]) / 3;
			var average2 = (data2[4*i] + data2[4*i+1] + data2[4*i+2]) / 3;
			var diff = threshold(fastAbs(average1 - average2));
			target[i] = diff;
			++i;
		}
	},
    _pixelateImage:function(){
        
        this.pixelImage = new Int32Array(this.pixelCount.x * this.pixelCount.y);
        for(var i = 0; i < this.blendData.length; i++){
            var x = i % this.imageWidth;
            var y = i * this.invWidth;
            
            var bufferIndex = floatToInt(y * this.yPosMulti) * this.pixelCount.y + floatToInt(x * this.xPosMulti);
            
            this.pixelImage[bufferIndex] += this.blendData[i];
        }
    },
    _drawPixelImage:function(){
        var outData = this.outImage.data;
        
        for(var i = 0; i < this.blendData.length; i++){
            var x = i % this.imageWidth;
            var y = i * this.invWidth;
            
            var bufferIndex = floatToInt(y * this.yPosMulti) * this.pixelCount.y + floatToInt(x * this.xPosMulti);
            
            var color = threshold(fastAbs(this.pixelImage[bufferIndex] * this.pixelWeight));
            
            outData[i * 4]      = color;
            outData[i * 4 + 1]  = color;
            outData[i * 4 + 2]  = color;
            outData[i * 4 + 3]  = 0xFF;
        }
        
        this._contextBlob.putImageData(this.outImage, 0, 0);
    },
    _detectBlobs:function(){
        var width = this._canvasSource.width || 0;
		var height = this._canvasSource.height || 0;
        
        var inImage = this._contextBlend.getImageData(0, 0, width, height);
        var outImage = this._contextBlend.createImageData(width, height);
        var resList = {};
        
        var pSrc = 0;
		var pA = -this.pixelCount.x - 1;
		var pB = -this.pixelCount.x;
		var pC = -this.pixelCount.x + 1;
		var pD = -1;
        
        var label = 1;
		
		this.labelTable = [];
		this.labelTable[0] = 0;
		this.labelBuffer = [];
        
        for (var i = 0; i < this.pixelImage.length; i++){
            var x = i % this.pixelCount.x;
            var y = i / this.pixelCount.x;
            this.labelBuffer[pSrc] = 0;
            
            if (this.pixelImage[i] > 0){
                //check neighbours
                var aLabel = (x > 0 && y > 0) ? this.labelTable[this.labelBuffer[pA]] : 0;
                var bLabel = (y > 0) ? this.labelTable[this.labelBuffer[pB]] : 0;
                var cLabel = (x < this.pixelCount.x - 1 && y > 0) ? this.labelTable[this.labelBuffer[pC]] : 0;
                var dLabel = (x > 0) ? this.labelTable[this.labelBuffer[pD]] : 0;
                
                var min = Number.MAX_VALUE;
                if(aLabel != 0 && aLabel < min)
                    min = aLabel;
                if(bLabel != 0 && bLabel < min)
                    min = bLabel;
                if(cLabel != 0 && cLabel < min)
                    min = cLabel;
                if(dLabel != 0 && dLabel < min)
                    min = dLabel;
                
                //if no neightbours
                if(min == Number.MAX_VALUE){
                    this.labelBuffer[pSrc] = label;
                    this.labelTable[label] = label;
                    
                    this.minTable[label] = v2(x, y);
                    this.maxTable[label] = v2(x, y);
                    this.massTable[label] = 1;
                    
                    label++;
                }else{  //neighbour found
                    this.labelBuffer[pSrc] = min;
                    
                    this.maxTable[min].y = y;
                    this.massTable[min]++;
                    if(x < this.minTable[min].x)
                        this.minTable[min].x = x;
                    if(x > this.maxTable[min].x)
                        this.maxTable[min].x = x;
                    
                    if(aLabel != 0)
                        this.labelTable[aLabel] = min;
                    if(bLabel != 0)
                        this.labelTable[bLabel] = min;
                    if(cLabel != 0)
                        this.labelTable[cLabel] = min;
                    if(dLabel != 0)
                        this.labelTable[dLabel] = min;
                }
            }
            
            pSrc++;
            pA++;
            pB++;
            pC++;
            pD++;
        }
        
//        this.blobList = [];
//        console.log( "pre: " + this.massTable);
        for(var i = this.labelTable.length - 1; i > 0; i--){
			//grouping of blobs
//            if(this.labelTable[i] != 1){
//                if(this.maxTable[i].x > this.maxTable[this.labelTable[i]].x)
//                    this.maxTable[this.labelTable[i]].x = this.maxTable[i].x;
//                
//                if(this.minTable[i].x < this.minTable[this.labelTable[i]].x)
//                    this.minTable[this.labelTable[i]].x = this.minTable[i].x;
//                
//                if(this.maxTable[i].y > this.maxTable[this.labelTable[i]].y)
//                    this.maxTable[this.labelTable[i]].y = this.maxTable[i].y;
//                
//                if(this.minTable[i].y < this.minTable[this.labelTable[i]].y)
//                    this.minTable[this.labelTable[i]].y = this.minTable[i].y;
//                
//                var j = i;
//                while ( j != this.labelTable[j])
//                    j = this.labelTable[j];
//                this.labelTable[i] = j;
//            }else{
                if(this.massTable[this.labelTable[i]] >= this.minBlobMass){
                    this.blobList[i] = new Blob(i, this.minTable[i], this.maxTable[i], this.massTable[i]);
                }
//            }
        }
//		console.log( "post: " + this.massTable);

	},
    _drawBlobs:function(){
        var self = this;
        var blobsToKill = [];
        this.blobList.forEach(function(blob){
            if(blob){
                var center = blob.getCenter();
                if(center){
                    self._contextBlob.fillStyle = 'rgb(' + 255 + ',' + 0 + ',' + 0 + ')';
                    self._contextBlob.fillRect(center.x /self.xPosMulti, center.y / self.yPosMulti, 20, 20);
                }else{
                    blobsToKill.push(blob.id);
                }
            }
        });
        
        blobsToKill.forEach(function(id){
           self.blobList[id] = null;
        });
    }
}

Camera.hasGetUserMedia = function(){
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia || navigator.msGetUserMedia);
}
Camera.webcamError = function(e){
//	alert('Webcam error!', e);
}

function fastAbs(value){
	return (value ^ (value >> 31)) - (value >> 31);
}
function threshold(value) {
	return (value > 0x1f) ? 0xFF : 0;
}
function floatToInt(value){
    return value | 0;
}