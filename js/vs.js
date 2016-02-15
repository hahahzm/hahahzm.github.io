precision highp float;

float rand(vec2 p){
    return fract(sin(dot(p ,vec2(12.9898,78.233))) * 43758.5453);
}

attribute vec4 aPosition1;
attribute vec4 aPosition2;
attribute vec4 aPosition3;
attribute vec4 aPosition4;
attribute vec4 aPosition5;
attribute vec2 aDepth;

uniform mat4 perspectiveMatrix;
uniform mat4 viewMatrix;
uniform float rotation;
uniform float depth;
uniform float limit;
uniform float random;
uniform float alpha;

uniform float rate1;
uniform float rate2;
uniform float rate3;
uniform float rate4;
uniform float rate5;

varying vec4 vColor;

void main(void) {
	vec2 p1 = vec2(aPosition1.xy * rate1 + aPosition2.xy * rate2 + aPosition3.xy * rate3 + aPosition4.xy * rate4 + aPosition5.xy * rate5);
	vec2 p2 = vec2(aPosition1.zw * rate1 + aPosition2.zw * rate2 + aPosition3.zw * rate3 + aPosition4.zw * rate4 + aPosition5.zw * rate5);

	vec4 color = vec4(0.5, 0.5, 0.5, 0.0);
	color.r += rand(aPosition1.xy * random * 2.0) * 0.5;
	color.g += rand(aPosition1.xy * random * 8.0) * 0.5;
	color.b += rand(aPosition1.xy * random * 16.0) * 0.5;

	float z = sin(aDepth.x + rotation * aDepth.y)*depth*2.0 - depth;

	float d = distance(p1, p2);
	if (d < limit) {
		color.a = rate1 * alpha + rate2 * alpha * 0.5 + rate3 * alpha * 0.5 + rate4 * alpha * 0.75 + rate5 * alpha;
		color.a *= (limit - d)/limit;
	}

	vec4 position = vec4(p1, z, 1.0);
	vColor = color;
	gl_Position = perspectiveMatrix * viewMatrix * position;
}