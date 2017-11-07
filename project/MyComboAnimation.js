/**
 * MyComboAnimation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyComboAnimation(scene, args) {
  CGFobject.call(this,scene);

  this.animation = null;//stores linear or circular or bezier or combo animations
};

MyComboAnimation.prototype.update = function(currTime) {

}
