/**
 * MyPatch
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyPatch(scene, divU, divV, degree1, degree2, cpoints) {
	CGFobject.call(this,scene);

	this.divU = divU;
	this.divV = divV;

	this.degree1 = degree1;
	this.degree2 = degree2;
	this.cpoints = cpoints;

	// console.log("degree1 = " + this.degree1 + "\n");
	// console.log("degree2 = " + this.degree2 + "\n");
	
	this.nurbsObj;

	this.init();

};

MyPatch.prototype = Object.create(CGFobject.prototype);
MyPatch.prototype.constructor = MyPatch;

MyPatch.prototype.init = function() {

	this.makeSurface(this.degree1, this.degree2, this.cpoints);

	this.display();
}

MyPatch.prototype.getKnotsVector = function(degree) {
	
	var v = new Array();
	for (var i=0; i<=degree; i++) {
		v.push(0);
	}
	for (var i=0; i<=degree; i++) {
		v.push(1);
	}
	return v;
}

MyPatch.prototype.makeSurface = function (degree1, degree2, controlvertexes) {
		
	var knots1 = this.getKnotsVector(degree1); 
	var knots2 = this.getKnotsVector(degree2);
		
	for(var i = 0; i < controlvertexes.length; i++){
		// console.log("i = " + i + ": ");
		for(var j = 0; j < controlvertexes[i].length; j++){
			for (var k = 0; k < controlvertexes[i][j].length; k ++){
				// console.log("var = " + controlvertexes[i][j][k] + " j = " + j + " k = " + k + "; ");
			}	
		}
		// console.log("\n");
	}
	
	var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes);
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	this.nurbsObj = new CGFnurbsObject(this.scene, getSurfacePoint, this.divU, this.divV);

}

MyPatch.prototype.display = function(){
  	this.nurbsObj.display();
}

MyPatch.prototype.amplify = function(ampS, ampT){

}