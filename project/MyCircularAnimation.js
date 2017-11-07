/**
 * MyCircularAnimation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyCircularAnimation(scene, args) {
  CGFobject.call(this,scene);

  this.animation = null;//stores linear or circular or bezier or combo animations
};

MyCircularAnimation.prototype.update = function(currTime) {

}
