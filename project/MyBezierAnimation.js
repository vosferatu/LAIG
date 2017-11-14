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

  this.animation = null;//stores linear or circular or bezier or combo animations
};

MyBezierAnimation.prototype.update = function(currTime) {

}
