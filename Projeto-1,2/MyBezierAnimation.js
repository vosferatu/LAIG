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

  this.time = this.getBezierCurveDistance(this.controlPoints, 10) / this.speed;  

  this.translation = [0,0,0];
};

MyBezierAnimation.prototype.getMatrix = function (deltaTime) {

  var animationMatrix = mat4.create();
  mat4.identity(animationMatrix);
  
  this.getPositionAndRotation(deltaTime);

  mat4.translate(animationMatrix, animationMatrix, [this.translation[0], this.translation[1], this.translation[2]]);
  mat4.rotate(animationMatrix, animationMatrix, this.rotationAngle, [0, 1, 0]);

  return animationMatrix;

}


MyBezierAnimation.prototype.getPositionAndRotation = function (currTime) {
  var tan = [];

  this.oldTranslation = this.translation;
  let t = currTime/this.time;
  this.translation = this.getBezierInstantPoint(t);
  var tan = [this.translation[0] - this.oldTranslation[0], this.translation[2] - this.oldTranslation[2]];


  this.rotationAngle = Math.atan2(tan[0], tan[1]);

}

MyBezierAnimation.prototype.getBezierCurveDistance = function(controlPoints, stage){

  if(stage < 0) return "Stage must be a positive number";

  // Stop condition
  if (stage == 0) {
    return Math.getDistanceBetweenTwoPoins(controlPoints[0], controlPoints[1]) +
      Math.getDistanceBetweenTwoPoins(controlPoints[1], controlPoints[2]) +
      Math.getDistanceBetweenTwoPoins(controlPoints[2], controlPoints[3]);
  }

  let midPointCP01 = Math.midPoint(controlPoints[0], controlPoints[1]);
  let midPointCP12 = Math.midPoint(controlPoints[1], controlPoints[2]);
  let midPointCP23 = Math.midPoint(controlPoints[2], controlPoints[3]);

  let midPointMP01 = Math.midPoint(midPointCP01, midPointCP12);
  let midPointMP12 = Math.midPoint(midPointCP12, midPointCP23);

  let midPointF = Math.midPoint(midPointMP01, midPointMP12);

  let cpLeft = [controlPoints[0], midPointCP01, midPointMP01, midPointF];
  let cpRight = [midPointF, midPointMP12, midPointCP23, controlPoints[3]];

  return this.getBezierCurveDistance(cpLeft, stage - 1) + this.getBezierCurveDistance(cpRight, stage - 1);

}

MyBezierAnimation.prototype.getBezierInstantPoint = function(t){

  let resultPoint = [];

  for (let i = 0; i < 3; i++) {
    resultPoint[i] = Math.pow((1 - t), 3) * this.controlPoints[0][i] +
      3 * t * Math.pow((1 - t), 2) * this.controlPoints[1][i] +
      3 * Math.pow(t, 2) * (1 - t) * this.controlPoints[2][i] +
      Math.pow(t, 3) * this.controlPoints[3][i];
  }
  
  return resultPoint;
}