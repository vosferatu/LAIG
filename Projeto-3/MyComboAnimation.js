/**
 * MyComboAnimation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyComboAnimation(scene, animations) {
  CGFobject.call(this,scene);
  this.scene = scene;

  this.animations = animations;

  this.time = this.timeAllAnimations();
};

MyComboAnimation.prototype.getMatrix = function (currTime) {

  var animationMatrix = mat4.create();
  mat4.identity(animationMatrix);

  var elapsedTime = (currTime > this.time ? this.time : currTime);

  for (let i = 0; i < this.animations.length; i++) {

    var animationID = this.animations[i];

    var currAnimation = this.scene.graph.animations[animationID];

    if (elapsedTime > currAnimation.animation.time) {
      elapsedTime -= currAnimation.animation.time;
      continue;
    }

    mat4.copy(animationMatrix, currAnimation.getMatrix(elapsedTime));

    break;

  }

  return animationMatrix;
}

MyComboAnimation.prototype.timeAllAnimations = function(){

  let sum = 0;
  
  for (let i = 0; i < this.animations.length; i++) {
    let currAnimation = this.scene.graph.animations[this.animations[i]];

    sum += currAnimation.animation.time;
  }

  return sum;
}
