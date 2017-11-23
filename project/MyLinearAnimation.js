/**
 * MyLinearAnimation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyLinearAnimation(scene, speed, controlPoints) {
  CGFobject.call(this,scene);

  this.scene = scene;

  this.speed = speed;
  this.controlPoints = controlPoints;
  
}

MyLinearAnimation.prototype.getMatrix = function (deltaTime) {

  var animationMatrix = mat4.create();
  mat4.identity(animationMatrix);

  return animationMatrix;

}
