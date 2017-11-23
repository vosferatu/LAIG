/**
 * MyLinearAnimation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyLinearAnimation(scene, speed, controlPoints) {
  CGFobject.call(this,scene);

  this.scene = scene;

  this.speed = speed;
  this.controlPoints = controlPoints;
  
  var totalDist = 0;

  for(let i = 0; i < this.controlPoints.length; i++){
    totalDist += dist(this.controlPoints[i], this.controlPoints[i+1]);
  }

  this.time = totalDist / this.speed;

};

function dist(a, b){
  return (Math.sqrt( (Math.pow(a[0]-b[0],2)) + (Math.pow(a[1]-b[1],2)) + (Math.pow(a[2]-b[2],2)) ));
}

MyLinearAnimation.prototype.getMatrix = function (deltaTime) {

  var animationMatrix = mat4.create();
  mat4.identity(animationMatrix);

  return animationMatrix;
}
