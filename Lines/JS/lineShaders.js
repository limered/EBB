var alphaBlendShader = {
	uniforms:{ 
		tDiffuse: 			{type: "t", value: null },
		tDiffuse2: 			{type: "t", value: null }
	},
	vertexShader: [
		"varying vec2 vUv;",
			
		"void main() {",
			"vUv = uv;",
		 	"gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
		"}"
	].join("\n"),
	fragmentShader: [
		"uniform sampler2D tDiffuse2;",
		"uniform sampler2D tDiffuse;",

		"varying vec2 vUv;",
			
		"void main() {",
		  	"vec4 texel1 = texture2D( tDiffuse, vUv );",
			"vec4 texel2 = texture2D( tDiffuse2, vUv );",
			"float brightness = (0.2126 * texel2.r + 0.7152 * texel2.g + 0.0722 * texel2.b);",


			"gl_FragColor = mix(texel1, texel2, brightness);",
		"}"
	].join("\n")
}

var Convolution1D = {
	defines:{
		"KERNEL_SIZE_INT": "25",
		"KERNEL_SIZE_FLOAT": "25.0"
	},
	uniforms:{
		"tDiffuse": {type:"t", value: null},
		"dir": {type: "v2", value: null},
		"size": {type: "f", value: 2.5}
	},
	vertexShader: [
		"varying vec2 vUv;",
			
		"void main() {",
			"vUv = uv;",
		 	"gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
		"}"
	].join("\n"),
	fragmentShader:[
		"uniform sampler2D tDiffuse;",
		"uniform vec2 dir;",
		"uniform float size;",

		"varying vec2 vUv;",

		"void main(){",
			"vec4 sum = vec4( 0.0 );",
			"for (int i = -KERNEL_SIZE_INT; i <= KERNEL_SIZE_INT; i++){",
				"float weight = (KERNEL_SIZE_FLOAT-abs(float(i)))/KERNEL_SIZE_FLOAT;",
				"vec2 disp = dir*float(i);",
				"sum += texture2D(tDiffuse, vUv+disp) * weight;",
			"}",
			"gl_FragColor = sum/KERNEL_SIZE_FLOAT*size;",
		"}"
	].join("\n")
}
var LineConvolution1D = {
	defines:{
		"KERNEL_SIZE_INT": "15",
		"KERNEL_SIZE_FLOAT": "15.0"
	},
	uniforms:{
		"tDiffuse": {type:"t", value: null},
		"dir": {type: "v2", value: null},
		"size": {type: "f", value: 2.5}
	},
	vertexShader: [
		"varying vec2 vUv;",
			
		"void main() {",
			"vUv = uv;",
		 	"gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
		"}"
	].join("\n"),
	fragmentShader:[
		"uniform sampler2D tDiffuse;",
		"uniform vec2 dir;",
		"uniform float size;",

		"varying vec2 vUv;",

		"void main(){",
			"vec4 sum = vec4( 0.0 );",
			"for (int i = -KERNEL_SIZE_INT; i <= KERNEL_SIZE_INT; i++){",
				"float weight = (KERNEL_SIZE_FLOAT-abs(float(i)))/KERNEL_SIZE_FLOAT;",
				"vec2 disp = dir*float(i);",
				"sum += texture2D(tDiffuse, vUv+disp) * weight;",
			"}",
			"gl_FragColor = sum/KERNEL_SIZE_FLOAT*size;",
		"}"
	].join("\n")
}
var ColorChangeInv = {
	uniforms:{
		"tDiffuse": {type:"t", value: null},
		"color": {type:"v4", value: v4(1.0, 0.0, 0.0, 1.0)}
	},
	vertexShader: [
		"varying vec2 vUv;",
			
		"void main() {",
			"vUv = uv;",
		 	"gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
		"}"
	].join("\n"),
	fragmentShader:[
		"uniform sampler2D tDiffuse;",
		"uniform vec4 color;",

		"varying vec2 vUv;",

		"void main(){",
			
			"vec4 texel = texture2D(tDiffuse, vUv);",
			"float brightness = texel.r;",
			"vec3 invColor = vec3(1.0-color.r, 1.0-color.g, 1.0-color.b);",

			"gl_FragColor = vec4(invColor*brightness, 1.0);",
		"}"
	].join("\n")
}
var ColorChange = {
	uniforms:{
		"tDiffuse3": {type:"t", value: null},
		"color": {type:"v4", value: v4(1.0, 0.0, 0.0, 1.0)}
	},
	vertexShader: [
		"varying vec2 vUv;",
			
		"void main() {",
			"vUv = uv;",
		 	"gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
		"}"
	].join("\n"),
	fragmentShader:[
		"uniform sampler2D tDiffuse3;",
		"uniform vec4 color;",

		"varying vec2 vUv;",

		"void main(){",
			
			"vec4 texel = texture2D(tDiffuse3, vUv);",
			"float brightness = texel.r;",
			"vec3 newColor = vec3(color.r + 0.9, color.g + 0.9, color.b + 0.9);",
			"gl_FragColor = vec4(newColor*brightness, 1.0);",
		"}"
	].join("\n")
}
