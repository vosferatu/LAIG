/**
 * MyBezierAnimation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyBezierAnimation(scene, speed, controlPoints) {
  CGFobject.call(this,scene);

  this.scene = scene;

  this.speed = speed;
  this.controlPoints = controlPoints;

  console.log("CONTROL POINTS _ BEZIER");
  console.log(this.controlPoints);

};

MyBezierAnimation.prototype.getMatrix = function (deltaTime) {

  var animationMatrix = mat4.create();
  mat4.identity(animationMatrix);

  return animationMatrix;

}

MyBezierAnimation.prototype.casteljauAlgorithm = function (controlPoints){

}