/**
 * MyCircularAnimation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyCircularAnimation(scene, speed, centerx, centery, centerz, radius, startang, rotang) {
  CGFobject.call(this,scene);

  this.scene = scene;

  this.speed = speed;
  this.centerx = centerx;
  this.centery = centery;
  this.centerz = centerz;
  this.radius = radius;
  this.startang = startang;
  this.rotang = rotang;
  
};

MyCircularAnimation.prototype.update = function(currTime) {

  var deltaTime = currTime - this.scene.startTime;

}
