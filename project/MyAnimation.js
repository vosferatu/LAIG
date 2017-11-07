/**
 * MyAnimation
 * @constructor
 */

function MyAnimation(graph, xmlelem) {
  this.graph = graph;
  this.type; //identify type of Animation; later on with lsx update
  this.arguments = graph.reader.getString(xmlelem, 'args').split(' ');

  this.animation = null;//stores linear or circular or bezier or combo animations

  switch(this.type){
    case "linear":
    break;

    case "circular":
    break;

    case "bezier":
    break;

    case "combo":
    break;

    default:
      console.log("MyAnimationConstructor I shouldn't get here");
    break;
  }

	this.initBuffers();
};

MyAnimation.prototype.update = function(currTime) {
  this.animation.update(currTime);
}
