/**
 * MyLinearAnimation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyLinearAnimation(scene, speed, controlPoints) {
  CGFobject.call(this,scene);

  this.scene = scene;

  this.speed = speed;
  this.points = controlPoints;

  this.dists = [];
  
  var totalDist = 0;

  for(let i = 0; i < this.points.length-1; i++){
    totalDist += dist(this.points[i], this.points[i+1]);
    this.dists.push(totalDist);
  }

  this.times = this.dists.slice();

  for(let i = 0; i < this.times.length; i++){
    this.times[i] /= this.speed;
  }


  this.time = totalDist / this.speed;

  console.log(this.times);
  console.log(this.time);
  console.log(this.dists);
  
  this.angle = 0;

};

function dist(a, b){
  return (Math.sqrt( (Math.pow(a[0]-b[0],2)) + (Math.pow(a[1]-b[1],2)) + (Math.pow(a[2]-b[2],2)) ));
}

MyLinearAnimation.prototype.getMatrix = function (deltaTime) {

  var i = 0;
  for(; i < this.times.length ; i++){
      if(deltaTime <= this.times[i])
        break;
      else deltaTime -= this.times[i];
  }

  console.log(deltaTime);

  var currentDist = deltaTime * this.speed;

  var p1 = this.points[i];
  var p2 = this.points[i+1];

  var lastDist = ( i == 0) ? 0 : this.dists[i-1];

  var variation = (1.0*deltaTime)/this.times[i];
  
	var rotation = Math.atan((p2[0]-p1[0]) / (p2[2]-p1[2]));

	if (p2[2]-p1[2] < 0)
		rotation += Math.PI;

	if (p2[0]-p1[0] == 0 && p2[2]-p1[2] == 0)
		rotation = this.angle;

	this.angle = rotation;  


  var animationMatrix = mat4.create();
  mat4.identity(animationMatrix);
  mat4.translate(animationMatrix, animationMatrix, [(p2[0]-p1[0]) * variation + p1[0], (p2[1]-p1[1]) * variation + p1[1], (p2[2]-p1[2]) * variation+p1[2]]);
  mat4.rotate(animationMatrix, animationMatrix, rotation, this.scene.graph.axisCoords['y']);

  return animationMatrix;
}
