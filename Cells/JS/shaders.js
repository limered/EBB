var cellShaderMaterial = {
	uniforms:{ 
		centerColor: {type: "v4", value: COLOR },
		outerColor: {type: "v4", value: new t3.Vector4(1.0, 1.0, 1.0, 0.0) },
		center: {type: "v2", value: new t3.Vector2(0, 0) }
	},
	vertexShader: [
		"varying vec3 N;",
		"varying vec3 V;",
				
		"void main() {",
			"N = normalize(normalMatrix * normal);",
			"V = vec3(0, 0, 1);",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
		"}"
	].join("\n"),
	fragmentShader: [
		"uniform vec4 centerColor;",
		"uniform vec4 outerColor;",
		"uniform vec2 center;",

		"varying vec3 N;",
		"varying vec3 V;",
			
		"void main() {",

			"float ratio = dot(normalize(V), normalize(N));",
			"ratio = clamp(ratio, 0.0, 1.0);",
			"vec4 foregroundColor = mix(outerColor, centerColor, ratio);",
			"gl_FragColor = foregroundColor;",
		"}"
	].join("\n")
}

var EyeShaderMaterial = {
	uniforms:{
		centerColor: {type : "v4", value: v4(1.0, 1.0, 1.0, 0.0)},
		outerColor: { type: "v4", value: v4(0.3, 0.3, 0.3, 0.9)}
	},
	vertexShader:[
		"varying vec3 N;",
		"varying vec3 V;",
				
		"void main() {",
			"N = normalize(normalMatrix * normal);",
			"V = vec3(0, 0, 1);",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
		"}"
	].join("\n"),
	fragmentShader:[
		"uniform vec4 centerColor;",
		"uniform vec4 outerColor;",

		"varying vec3 N;",
		"varying vec3 V;",
			
		"void main() {",

			"float ratio = dot(normalize(V), normalize(N));",
			"ratio = clamp(ratio, 0.0, 1.0);",
			"vec4 foregroundColor = mix(outerColor, centerColor, ratio);",
			"gl_FragColor = foregroundColor;",
		"}"
	].join("\n")
}

var alphaBlendShader = {
	uniforms:{ 
		tDiffuse1: 			{type: "t", value: null },
		tDiffuse2: 			{type: "t", value: null },
		tDiffuse3: 			{type: "t", value: null },
		vignette_center:    {type: "v2", value: v2(0.5, 0.5)},
		vignette_radius: 	{type: "f", value: 0.6 },
		vignette_amount:    {type: "f", value: 1.0 }

	},
	vertexShader: [
		"varying vec2 vUv;",
			
		"void main() {",
			"vUv = uv;",
		 	"gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
		"}"
	].join("\n"),
	fragmentShader: [
		"uniform sampler2D tDiffuse1;",
		"uniform sampler2D tDiffuse2;",
		"uniform sampler2D tDiffuse3;",
		"uniform vec2 vignette_center;",
		"uniform float vignette_radius;",
		"uniform float vignette_amount;",

		"varying vec2 vUv;",
			
		"void main() {",
		  	"vec4 texel1 = texture2D( tDiffuse1, vUv );",
			"vec4 texel2 = texture2D( tDiffuse2, vUv );",
			"vec4 texel3 = texture2D( tDiffuse3, vUv );",
			"float brightness1 = (0.2126 * texel2.r + 0.7152 * texel2.g + 0.0722 * texel2.b);",
			"float brightness2 = max(texel3.r, max(texel3.g, texel3.b));",

			//vignette
			"float d = distance(vignette_center, vUv) / vignette_radius;",

			"gl_FragColor = mix(texel3, mix(texel2, texel1, brightness1), brightness2) - d*d*d*d * vignette_amount;",
		"}"
	].join("\n")
}

var blurShader = {
	// 			"gl_FragColor = beta * texel3 + (1.0 - beta) * (alpha * texel1 + (1.0 - alpha) * texel2);",
	uniforms:{
		tex: { type:"t", value: null },
		h: { type:"f", value: 1.0 / 512.0 },
		size: { type: "i", value: 4 }
	},
	vertexShader:[
		"varying vec2 vUv;",
			
		"void main() {",
			"vUv = uv;",
		 	"gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
		"}"
	].join("\n"),
	fragmentShader:[
		"uniform sampler2D tex;",
		"uniform float h;",
		"uniform int size;",

		"varying vec2 vUv;",

		"void main() {",

			"vec4 sum = vec4( 0.0 );",

			"for (int i = -2; i <= 2; i++){",
				"for (int j = -2; j <= 2; j++){",
					"sum += texture2D( tex, vec2( vUv.x + float(i) * h, vUv.y + float(j) * h) );",
				"}",
			"}",

			"gl_FragColor = sum/25.0;",

		"}"
	].join("\n")
}