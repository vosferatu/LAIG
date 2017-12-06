/**
 * MyCircle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyCircle(scene, slices, radius, z) {
	CGFobject.call(this,scene);

	this.z = z;

	this.slices = slices || 12;
	this.angle = (2*Math.PI) / this.slices;
	this.radius = radius || 1;

	this.initBuffers();
};

MyCircle.prototype = Object.create(CGFobject.prototype);
MyCircle.prototype.constructor = MyCircle;

MyCircle.prototype.initBuffers = function() {

	this.vertices = new Array();
	this.normals = new Array();
	this.indices = new Array();
	this.texCoords = new Array();

	this.vertices.push(0,0,this.z);
  	this.normals.push(0,0,1);
  	this.texCoords.push(0.5,0.5);

	for(i = 0; i < this.slices; i++){

		this.vertices.push(Math.cos(i*this.angle)*this.radius, Math.sin(i*this.angle)*this.radius, this.z);
      	this.normals.push(0, 0, 1);

	}

	for(slice = 1; slice <= this.slices; slice++){

		if(slice == this.slices){
			this.indices.push(0,slice,1);
		}

		else {
			this.indices.push(0,slice,slice+1);
		}
	}

    for(i = 0; i < this.slices; i++){
    	  this.texCoords.push(((Math.cos(i*this.angle))/2) + 0.5 , ((Math.sin(i*this.angle)) /2) + 0.5);
	}
		
	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
}