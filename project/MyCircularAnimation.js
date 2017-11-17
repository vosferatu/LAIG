/**
 * MyCircularAnimation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyCircularAnimation(scene, speed, centerx, centery, centerz, radius, startang, rotang) {
  CGFobject.call(this,scene);

  this.scene = scene;

  this.speed = speed;
  this.centerx = centerx;
  this.centery = centery;
  this.centerz = centerz;
  this.radius = radius;
  this.startang = startang;
  this.rotang = rotang;

  this.angularSpeed = this.speed / this.radius;

  this.animationMatrix = mat4.create();

  
};

MyCircularAnimation.prototype.update = function(currTime) {

  var deltaTime = currTime - this.scene.startTime;

  var currAngle = this.startang + this.angularSpeed * deltaTime;
  mat4.identity(this.animationMatrix);

  mat4.translate(this.animationMatrix, this.animationMatrix, [-centerx, -centery, -centerz]);
  mat4.rotate(this.animationMatrix, this.animationMatrix, currAngle, this.scene.axisCoords['y']);
  mat4.translate(this.animationMatrix, this.animationMatrix, [centerx, centery, centerz]);


}
