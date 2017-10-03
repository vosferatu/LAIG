/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlelem) {

    this.type = graph.reader.getItem(xmlelem,"type", ["rectangle", "sphere", "cylinder", "triangle"]);
    this.arguments = graph.reader.getString(xmlelem, 'args').split(' ');

    this.shape = null;
    switch(this.type){
        case "cylinder":
            /*this.shape = new MyCylinder(graph.scene,
                parseInt(this.arguments[0]),
                parseInt(this.arguments[1]),
                parseInt(this.arguments[2]),
                parseInt(this.arguments[3]),
                parseInt(this.arguments[4])
            );*/
            this.shape = new MyCylinder(graph.scene,
                parseInt(this.arguments[3]),
                parseInt(this.arguments[4])
            );
            console.log("Pintar cilindro!!!!");

    }
}

MyGraphLeaf.prototype.display = function(){

    this.shape.display();

}
