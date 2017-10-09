/**
 * MyRectangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyRectangle(scene, x1, z1, x2, z2, minS=0, maxS=1, minT=0, maxT=1) {
	CGFobject.call(this,scene);

	this.x1 = x1;
	this.x2 = x2;
	this.z1 = z1;
	this.z2 = z2;

	this.minS = minS;
	this.maxS = maxS;
	this.minT = minT;
	this.maxT = maxT;

	this.initBuffers();
};


MyRectangle.prototype = Object.create(CGFobject.prototype);
MyRectangle.prototype.constructor=MyRectangle;

MyRectangle.prototype.initBuffers = function () {
	this.vertices = [
            this.x1, this.z1, 0,
            this.x2, this.z1, 0,
            this.x1, this.z2, 0,
            this.x2, this.z2, 0
			];

	this.indices = [
		0, 2, 1, 
		2, 3, 1
	];

	
		
	this.primitiveType=this.scene.gl.TRIANGLES;

	this.normals = [
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1
	];

	this.texCoords = [

		this.minS, this.maxT,
		this.maxS, this.maxT,
		this.minS, this.minT, 
		this.maxS, this.minT
		 
	];

	this.initGLBuffers();
};

MyRectangle.prototype.amplify = function (){

	
}