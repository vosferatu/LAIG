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
	this.v = this.minT;
	
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
      0, 1, 2
  ];

	var nx = (this.y2-this.y1)*(this.z3-this.z1) - (this.z2-this.z1)*(this.y3-this.y1);
	var ny = (this.z2-this.z1)*(this.x3-this.x1) - (this.x2-this.x1)*(this.z3-this.z1);
	var nz = (this.x2-this.x1)*(this.y3-this.y1) - (this.y2-this.y1)*(this.x3-this.x1);

    this.normals = [
    nx, ny, nz,
    nx, ny, nz,
    nx, ny, nz
	];

	var a = Math.sqrt(Math.pow(this.x1-this.x3, 2) + Math.pow(this.y1-this.y3, 2) + Math.pow(this.z1-this.z3, 2));
	var b = Math.sqrt(Math.pow(this.x2-this.x1, 2) + Math.pow(this.y2-this.y1, 2) + Math.pow(this.z2-this.z1, 2));
    var c = Math.sqrt(Math.pow(this.x3-this.x2, 2) + Math.pow(this.y3-this.y2, 2) + Math.pow(this.z3-this.z2, 2));
    var ang = Math.acos((Math.pow(a, 2) - Math.pow(b, 2) + Math.pow(c, 2))/(2*a*c));
    
    this.texCoords = [
		c-a*Math.cos(ang), this.v-a*Math.sin(ang),
		0, this.v,
		c, this.v
    ];


	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MyTriangle.prototype.amplify = function (ampS, ampT){

	var a = Math.sqrt(Math.pow(this.x1-this.x3, 2) + Math.pow(this.y1-this.y3, 2) + Math.pow(this.z1-this.z3, 2));
	var b = Math.sqrt(Math.pow(this.x2-this.x1, 2) + Math.pow(this.y2-this.y1, 2) + Math.pow(this.z2-this.z1, 2));
    var c = Math.sqrt(Math.pow(this.x3-this.x2, 2) + Math.pow(this.y3-this.y2, 2) + Math.pow(this.z3-this.z2, 2));
    var ang = Math.acos((Math.pow(a, 2) - Math.pow(b, 2) + Math.pow(c, 2))/(2*a*c));
    
    this.texCoords = [
    	(c-a*Math.cos(ang))/ampS, (this.v-a*Math.sin(ang))/ampT,
		0, this.v,
		c/ampS, this.v/ampS
    ];

    this.updateTexCoordsGLBuffers();

}
