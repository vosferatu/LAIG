/**
 * MyLinearAnimation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyLinearAnimation(scene, args) {
  CGFobject.call(this,scene);

  this.animation = null;//stores linear or circular or bezier or combo animations
};

MyLinearAnimation.prototype.update = function(currTime) {

}
