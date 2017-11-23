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

  this.time = Math.degToRad(Math.abs(this.rotang))/this.angularSpeed;

};

MyCircularAnimation.prototype.getMatrix = function(deltaTime) {

  var currAngleRad = this.angularSpeed * deltaTime * (this.rotang > 0 ? 1 : -1);

  var animationMatrix = mat4.create();
  mat4.identity(animationMatrix);

  mat4.translate(animationMatrix, animationMatrix, [this.centerx, this.centery, this.centerz]);
  mat4.rotate(animationMatrix, animationMatrix, currAngleRad, this.scene.graph.axisCoords['y']);
  mat4.rotate(animationMatrix, animationMatrix, Math.degToRad(this.startang), this.scene.graph.axisCoords['y']);
  mat4.translate(animationMatrix, animationMatrix, [this.radius, 0, 0]);

  return animationMatrix;

}
