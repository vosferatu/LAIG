/**
 * MyComboAnimation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyComboAnimation(scene, animations) {
  CGFobject.call(this,scene);

  this.animations = animations;
};

MyComboAnimation.prototype.getMatrix = function (deltaTime) {

  var animationMatrix = mat4.create();
  mat4.identity(animationMatrix);

  return animationMatrix;

}
