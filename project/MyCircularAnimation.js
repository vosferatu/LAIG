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

  this.dist = (2*Math.PI*this.radius)/((this.rotang*Math.PI)/180.0);

  //this.time = this.rotang/this.angularSpeed;
  this.time = this.dist/this.speed;
};

MyCircularAnimation.prototype.getMatrix = function(deltaTime) {

  var currAngle = this.startang + this.angularSpeed * deltaTime;

  var animationMatrix = mat4.create();
  mat4.identity(animationMatrix);

  mat4.translate(animationMatrix, animationMatrix, [-this.centerx, -this.centery, -this.centerz]);
  mat4.rotate(animationMatrix, animationMatrix, currAngle, this.scene.graph.axisCoords['y']);
  mat4.translate(animationMatrix, animationMatrix, [this.centerx, this.centery, this.centerz]);

  return animationMatrix;

}
