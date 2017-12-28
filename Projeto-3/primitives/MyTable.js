/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

var TABLE_TX = "table.jpg"

function MyTable(scene, topLength, topWidth, topThickness, height) {
	CGFobject.call(this,scene);

	this.topLength = topLength;
	this.topWidth = topWidth;
	this.topThickness = topThickness;
	this.height = height;

	this.cube = new MyCube(this.scene);

	this.legDisplay = function () {

		this.scene.pushMatrix();
		this.scene.scale(this.topThickness, this.height - this.topThickness, this.topThickness);
		this.scene.translate(0,0.5,0);
		this.cube.display();
		this.scene.popMatrix();	

	}

	this.tableTx = new CGFtexture(this.scene, "./scenes/images/" + TABLE_TX);


};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function () {
	
	this.tableTx.bind();

	//TOP
	this.scene.pushMatrix();
	this.scene.translate(0, this.height - this.topThickness, 0);
	this.scene.scale(this.topLength, this.topThickness, this.topWidth);
	this.scene.translate(0,0.5,0);
	this.cube.display();
	this.scene.popMatrix();	

	//LEGS

	this.scene.pushMatrix();
	this.scene.translate(this.topLength/2-this.topThickness, 0, this.topWidth/2-this.topThickness);
	this.legDisplay();	
	this.scene.popMatrix();	

	this.scene.pushMatrix();
	this.scene.translate(-(this.topLength/2-this.topThickness), 0, this.topWidth/2-this.topThickness);
	this.legDisplay();	
	this.scene.popMatrix();	

	this.scene.pushMatrix();
	this.scene.translate(this.topLength/2-this.topThickness, 0, -(this.topWidth/2-this.topThickness));
	this.legDisplay();	
	this.scene.popMatrix();	

	this.scene.pushMatrix();
	this.scene.translate(-(this.topLength/2-this.topThickness), 0, -(this.topWidth/2-this.topThickness));
	this.legDisplay();	
	this.scene.popMatrix();	

}