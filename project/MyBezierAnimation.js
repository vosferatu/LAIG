/**
 * MyBezierAnimation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyBezierAnimation(scene, args) {
  CGFobject.call(this,scene);

  this.animation = null;//stores linear or circular or bezier or combo animations
};

MyBezierAnimation.prototype.update = function(currTime) {

}
