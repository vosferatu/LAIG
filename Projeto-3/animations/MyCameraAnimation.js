/**
 * MyCameraAnimation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyCameraAnimation(scene, speed, x0, x1) {
    CGFobject.call(this,scene);
 
    this.scene = scene;
    this.speed = speed;

    this.time = (Math.getDistanceBetweenTwoPoins(x0.position, x1.position) / this.speed)/2;
    console.log("time "); console.log(this.time);
 
    this.firstCam = x0;
    this.finalCam = x1;
 
    this.scene.camera = this.firstCam;
  }

MyCameraAnimation.prototype.calculateVector = function (p1, p2) {
    var res = [];
    for(var i = 0; i < p1.length; i++){
      res.push(p2[i]-p1[i]);
    }
    return res;
 };
 
MyCameraAnimation.prototype.linearInterpolation = function (p1, p2, r) {
     return (p1*(1.0-r) + (p2*r));
};
 
MyCameraAnimation.prototype.vectorLinearInterpolation = function (v1, v2, r){
   var res = [];
   for(var i = 0; i < v1.length; i++){
     res.push(this.linearInterpolation(v1[i], v2[i], r));
   }
   return res;
};
 
MyCameraAnimation.prototype.update = function(currTime){
   var elapsed = currTime;
   var r = elapsed/this.time;
 
   if(elapsed >= this.time){
     this.scene.cameraMoving = false;
     this.scene.cameraAnimation = null;
     return;
   }
 
   var initDir = this.calculateVector(this.firstCam.position, this.firstCam.target);
   var finalDir = this.calculateVector(this.finalCam.position, this.finalCam.target);
 
   var angle = 0;
   if (vec3.length(initDir) > 0 && vec3.length(finalDir) > 0){
         var dot = vec3.dot(initDir, finalDir);
         angle = Math.acos(dot / (vec3.length(initDir) * vec3.length(finalDir)));
 
        var cross = vec3.create();
        vec3.cross(cross, initDir, finalDir);
        if (vec3.dot([0,1,0], cross) > 0) 
            angle = -angle;
   }
 
   var finalY = this.linearInterpolation(this.firstCam.position[1],this.finalCam.position[1],r);
   var camPos = [
     this.firstCam.position[0] * Math.cos(angle*r) - this.firstCam.position[2] * Math.sin(angle*r),
     finalY,
     this.firstCam.position[0] * Math.sin(angle*r) + this.firstCam.position[2] * Math.cos(angle*r)
   ]
 
   var fov = this.linearInterpolation(this.firstCam.fov, this.finalCam.fov, r);
   var target = this.vectorLinearInterpolation(this.firstCam.target, this.finalCam.target, r);
 
    this.scene.camera = new CGFcamera(fov, this.finalCam.near, this.finalCam.far, camPos, target);

};
