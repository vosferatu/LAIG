#ifdef GL_ES
precision highp float;
#endif

varying vec4 vFinalColor;
varying vec2 vTextureCoord;

uniform float timeFactor;
uniform vec4 selectedColor;

uniform sampler2D uSampler;

uniform bool uUseTexture;

void main() {
	// Branching should be reduced to a minimal. 
	// When based on a non-changing uniform, it is usually optimized.
	if (uUseTexture)
	{
		vec4 textureColor = texture2D(uSampler, vTextureCoord);

		vec4 highlightColor;
		highlightColor.r = (1.0-timeFactor)*textureColor.r + timeFactor*selectedColor.r; 
		highlightColor.g = (1.0-timeFactor)*textureColor.g + timeFactor*selectedColor.g; 
		highlightColor.b = (1.0-timeFactor)*textureColor.b + timeFactor*selectedColor.b;
		
		gl_FragColor = highlightColor * vFinalColor;
	}
	else
		gl_FragColor = vFinalColor;

}