/**
 * MyAnimation
 * @constructor
 */

function MyAnimation(graph, args) {
  this.graph = graph;
  this.type = args[0]; //identify type of Animation; later on with lsx update

  this.animationMatrix = [];

  this.animation = null;//stores linear or circular or bezier or combo animations


  switch(this.type){
    case "circular":
        this.animation = new MyCircularAnimation(graph.scene, args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
      break;

    case "linear":
      this.animation = new MyLinearAnimation(graph.scene, args[1], args[2]);
      break;

    case "bezier":
      this.animation = new MyBezierAnimation(graph.scene, args[1], args[2]);
      break;

    case "combo":
      this.animation = new MyComboAnimation(graph.scene, args[1]);
      break;

    default:
      console.log("MyAnimationConstructor I shouldn't get here - type wrong");
    break;
  }
  
};

MyAnimation.prototype.update = function(currTime) {
  this.animation.update(currTime);
}
