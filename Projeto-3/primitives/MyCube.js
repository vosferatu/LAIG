/**
 * MyCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyCube(scene) {
	CGFobject.call(this,scene);

	this.quad = new MyQuad(this.scene);
	this.quad.initBuffers();

	this.twoSidesDisplay = function() {
		this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,0,-0.5);
		this.scene.rotate(Math.degToRad(180), 1,0,0);
		this.quad.display();
		this.scene.popMatrix();
	}
};

MyCube.prototype = Object.create(CGFobject.prototype);
MyCube.prototype.constructor=MyCube;

MyCube.prototype.display = function () {
	
	this.scene.pushMatrix();
	this.twoSidesDisplay();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.rotate(Math.degToRad(90), 0,1,0);
	this.twoSidesDisplay();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.rotate(Math.degToRad(90), 1,0,0);
	this.twoSidesDisplay();
	this.scene.popMatrix();

}