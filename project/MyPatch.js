/**
 * MyPatch
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyPatch(scene, u, v) {
	CGFobject.call(this,scene);

	this.u = u;
	this.v = v;
	
	this.initBuffers();
};

MyPatch.prototype = Object.create(CGFobject.prototype);
MyPatch.prototype.constructor = MyPatch;

MyPatch.prototype.initBuffers = function() {

	this.vertices = new Array();
	this.normals = new Array();
	this.indices = new Array();
	this.texCoords = new Array();

	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
}