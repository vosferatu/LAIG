/**
 * MyCircle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyCircle(scene, slices, radius) {
	CGFobject.call(this,scene);

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
/*
    this.index = 0;
	var teta = 0.0;
	var centro = this.index;

	this.vertices.push(0); this.vertices.push(0); this.vertices.push(0);
	this.texCoords.push(0.5, 0.5);
	this.index++;
	
	for(j = 0; j < this.slices; j++){
		this.vertices.push(Math.cos(teta)*this.radius); this.vertices.push(Math.sin(teta)*this.radius); this.vertices.push(0);
		this.texCoords.push((Math.cos(teta)+1)/2.0,((-Math.sin(teta)+1)/2.0));

 		this.index++; //1
		teta += this.angulo;

 		this.vertices.push(Math.cos(teta)*this.radius); this.vertices.push(Math.sin(teta)*this.radius); this.vertices.push(0);
 		this.index++;//2

			//	 centro	*
			//			* *
			//			*  *
			//			*    *
			//	teta1	******* teta2
			
		this.texCoords.push((Math.cos(teta)+1)/2.0,((-Math.sin(teta)+1)/2.0));

		
		this.indices.push(centro); this.indices.push(this.index-2); this.indices.push(this.index-1);
		this.normals.push(0); this.normals.push(0); this.normals.push(1);
		this.normals.push(0); this.normals.push(0); this.normals.push(1);
		this.normals.push(0); this.normals.push(0); this.normals.push(1);
		
	}
*/
/*	var index = 1;
	
	this.vertices.push(0,0,0);
	this.normals.push(0,0,1);
	this.texCoords.push(.5,.5);
 
	//top
	for(var j= 0; j < this.slices; j++){
		this.vertices.push(
			this.radius * Math.cos((j)*this.ang),
			this.radius * Math.sin((j)*this.ang),
			0
			);
		this.vertices.push(
			this.radius * Math.cos((j+1)*this.ang),
			this.radius * Math.sin((j+1)*this.ang),
			0
			);
		this.texCoords.push(
				-.5 *  Math.cos((j)*this.ang) +.5,
				.5 * Math.sin((j)*this.ang)+.5
		);
		this.texCoords.push(
				-.5 * Math.cos((j+1)*this.ang) +.5,
				.5 * Math.sin((j+1)*this.ang)+.5
		);
		this.indices.push(
		1, index, index+1
		);
		for(var rep = 0; rep < 2 ; rep++){
			this.normals.push(0,0,1);
		}
		index+=2;	
	}
	this.indices.push(index-1,0,1);

	*/

	this.vertices.push(0,0,0);
  this.normals.push(0,0,1);
  this.texCoords.push(0.5,0.5);

		for(i = 0; i < this.slices; i++){

			this.vertices.push(Math.cos(i*this.angle)*this.radius, Math.sin(i*this.angle)*this.radius, 0);
      this.normals.push(0, 0, 1);

		}

		for(slice = 1; slice <= this.slices; slice++){

			if(slice == this.slices){
				this.indices.push(0,slice,1);
			}

			else{
				this.indices.push(0,slice,slice+1);
			}

		}

    for(i = 0; i < this.slices; i++){
      this.texCoords.push(((Math.cos(i*this.angle))/2) + 0.5 , ((Math.sin(i*this.angle)) /2) + 0.5);
		}
		
	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
}