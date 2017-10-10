/**
 * MyPatch
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyPatch(scene, u, v) {
	CGFobject.call(this,scene);

	this.u = u;
	this.v = v;
	

};

MyPatch.prototype = Object.create(CGFobject.prototype);
MyPatch.prototype.constructor = MyPatch;

MyPatch.prototype.initBuffers = function() {

}

MyPatch.prototype.amplify = function(ampS, ampT){

}

MyPatch.prototype.display = function(){
	
}