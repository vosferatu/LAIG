/**
 * MyComboAnimation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyComboAnimation(scene, animations) {
  CGFobject.call(this,scene);

  this.animations = animations;
};

MyComboAnimation.prototype.update = function(currTime) {

  for (let i = 0; i < animations.length; i++) {
    const anim = animations[i];

    anim.update(currTime);
    
  }
}
