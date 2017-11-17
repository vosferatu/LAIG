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

};

MyBezierAnimation.prototype.update = function(currTime) {

}
