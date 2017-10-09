/**
 * MyTriangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTriangle(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3, minS=0, maxS=1, minT=0, maxT=1) {
	CGFobject.call(this,scene);

    this.x1 = x1;
    this.x2 = x2;
    this.x3 = x3;
    this.y1 = y1;
    this.y2 = y2;
    this.y3 = y3;
    this.z1 = z1;
    this.z2 = z2;
    this.z3 = z3;
	this.minS = minS;
	this.maxS = maxS;
	this.minT = minT;
	this.maxT = maxT;
	
	this.initBuffers();
};

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor=MyTriangle;

MyTriangle.prototype.initBuffers = function () {
	this.vertices = [
            this.x1, this.y1, this.z1,	//inferior esquerdo
            this.x2, this.y2, this.z2,	//inferior direito
            this.x3, this.y3, this.z3	//superior esquerdo
			];

	this.indices = [
            //0, 2, 1
			1, 2, 0
        ];

   	this.normals = [ 
		0, 0, 1,
		0, 0, 1,
		0, 0, 1

   	];  

   	this.texCoords = [
		this.minS, this.maxT,
		this.maxS, this.maxT,
		this.minS, this.minT
	];

			
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MyTriangle.prototype.amplify = function (ampS, ampT){



}