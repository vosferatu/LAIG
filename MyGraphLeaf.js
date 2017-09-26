/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlelem) {

    this.shape = null;
    
    if(xmlelem.type == "cylinder"){

        this.shape = new MyCylinder(32, 32);
    }
}

MyGraphLeaf.prototype.display = function(){

    this.shape.display();
}
