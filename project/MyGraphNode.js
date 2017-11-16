/**
 * MyGraphNode class, representing an intermediate node in the scene graph.
 * @constructor
**/

function MyGraphNode(graph, nodeID) {
    this.graph = graph;

    this.nodeID = nodeID;

    // IDs of child nodes.
    this.children = [];

    // IDs of animations.
    this.animations = [];

    // IDs of child leaves.
    this.leaves = [];

    // The material ID.
    this.materialID = null ;

    // The texture ID.
    this.textureID = null ;

    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);

    this.animationsMatrix = mat4.create();
    mat4.identity(this.animationsMatrix);
}

/**
 * Adds the reference (ID) of another node to this node's children array.
 */
MyGraphNode.prototype.addChild = function(nodeID) {
    this.children.push(nodeID);
}

/**
 * Adds the reference (ID) of another node to this node's children array.
 */
MyGraphNode.prototype.addAnimation = function(animID) {
    this.animations.push(animID);
}

/**
 * Adds a leaf to this node's leaves array.
 */
MyGraphNode.prototype.addLeaf = function(leaf) {
    this.leaves.push(leaf);
}

/*MyGraphNode.prototype.display = function () {

  console.log("display do node");

  for (var i = 0; i < this.children.length; i++){
      this.children[i].display();
  }

  for (var i = 0; i < this.leaves.length; i++) {
    this.leaves[i].display();
  }
}*/
