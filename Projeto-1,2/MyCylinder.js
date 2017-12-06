/**
 * MyCylinder
 * @constructor
 */

function MyCylinder(scene, height, botradius, topradius, stacks, slices, topcap = 0, botcap = 0, minS, maxS, minT, maxT){
	CGFobject.call(this, scene);

	if(slices == null)
		slices = 8;
	
	if(stacks == null)
		stacks = 20;
	
	this.slices = slices;
	this.stacks = stacks;
	this.height = height || 0.0;

	this.minS = minS || 0.0;
	this.maxS = maxS || 1.0;
	this.minT = minT || 0.0;
	this.maxT = maxT || 1.0;
	this.botradius = botradius;
	this.topradius = topradius;
	this.topcap = topcap;
	this.botcap = botcap;

	this.incS = (this.maxS - this.minS) / this.slices;
	this.incT = (this.maxT - this.minT) / this.stacks;

	this.radiusvar = (topradius-botradius)/this.stacks;

	this.angulo = (2*Math.PI) / this.slices;

	this.top = ((topcap == 1) ? new MyCircle(this.scene, this.slices, this.topradius, this.height) : null);
	this.bot = ((botcap == 1) ? new MyCircle(this.scene, this.slices, this.botradius, 0) : null);

	this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function(){
	this.vertices = new Array();
	this.normals = new Array();
	this.indices = new Array();
	this.texCoords = new Array();

	var altura = this.height / this.stacks;

	var teta = 0;
	var radius = this.botradius;
	var xText = this.maxS;

	for (i = 0; i <= this.slices; i++, teta += this.angulo, xText -= this.incS){

		var yText = this.maxT;

		var z = 0;

		for (j = 0; j <= this.stacks; j++, z += altura, yText -= this.incT){
			var x = Math.cos(teta)*(this.botradius+(this.radiusvar*j));
			var y = Math.sin(teta)*(this.botradius+(this.radiusvar*j));
			this.vertices.push(x, y, z);
			this.normals.push(x, y, 0);
			this.texCoords.push(xText, yText);
		}
	}
	
	var ind = 1;

	for (var i = 0; i < this.slices; i++){
		for (var j = 0; j < this.stacks; j++){
			this.indices.push(ind, ind+this.stacks, ind+this.stacks+1);
			this.indices.push(ind+this.stacks, ind, ind-1);
			this.indices.push(ind+this.stacks+1, ind+this.stacks, ind);
			this.indices.push(ind, ind+this.stacks, ind-1);

			ind++;
		}

		ind++;
	}

	
	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};



MyCylinder.prototype.display = function (){

	this.drawElements(this.primitiveType);
	
	if(this.top != null){
		this.scene.pushMatrix();
			this.top.display();
		this.scene.popMatrix();

	} 

	if (this.bot != null) {
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI, 1,0,0);
			this.bot.display();
		this.scene.popMatrix();

	}


}


MyCylinder.prototype.amplify = function (ampS, ampT){
}