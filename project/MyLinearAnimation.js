/**
 * MyLinearAnimation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyLinearAnimation(scene, speed, controlPoints) {
  CGFobject.call(this, scene);

  this.scene = scene;

  this.speed = speed;
  this.controlPoints = controlPoints;

  this.time = this.timeAllAnimations();

};

MyLinearAnimation.prototype.getMatrix = function (currTime) {

  var animationMatrix = mat4.create();
  mat4.identity(animationMatrix);

  var elapsedTime = (currTime > this.time ? this.time : currTime);

  for (let i = 0; i < this.controlPoints.length-1; i++) {

    let currAnimationTime = this.getTime(this.controlPoints[i], this.controlPoints[i + 1]);
    if (elapsedTime > currAnimationTime) {
      elapsedTime -= currAnimationTime;
      continue;
    }

    mat4.copy(animationMatrix, this.getMatrixSimpleLinear(elapsedTime / currAnimationTime, this.controlPoints[i], this.controlPoints[i + 1]));

    break;

  }

  // mat4.translate(animationMatrix, animationMatrix, [(p2[0] - p1[0]) * variation + p1[0], (p2[1] - p1[1]) * variation + p1[1], (p2[2] - p1[2]) * variation + p1[2]]);
  // mat4.rotate(animationMatrix, animationMatrix, rotation, this.scene.graph.axisCoords['y']);

  return animationMatrix;
}

MyLinearAnimation.prototype.getMatrixSimpleLinear = function (deltaTime, point1, point2) {

  var animationMatrix = mat4.create();
  mat4.identity(animationMatrix);

  let result = point1.map(function (num, i) {
    return (1-deltaTime)*num + deltaTime*point2[i];
  });

  rotation = Math.atan2(point2[0] - point1[0],  point2[2] - point1[2]);
  
  mat4.translate(animationMatrix, animationMatrix, result);
  mat4.rotate(animationMatrix, animationMatrix, rotation, this.scene.graph.axisCoords['y']);

  console.log(animationMatrix);

  return animationMatrix;
}

MyLinearAnimation.prototype.timeAllAnimations = function () {

  let sum = 0;

  for (let i = 0; i < this.controlPoints.length-1; i++) {
    let currTime = this.getTime(this.controlPoints[i], this.controlPoints[i+1]);

    sum += currTime;
  }

  return sum;
}

MyLinearAnimation.prototype.getTime = function(point1, point2){

  return Math.getDistanceBetweenTwoPoins(point1, point2) / this.speed;
}