/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlelem) {

    this.graph = graph;
    this.type = graph.reader.getItem(xmlelem,"type", ["rectangle", "sphere", "cylinder", "triangle"]);
    this.arguments = graph.reader.getString(xmlelem, 'args').split(' ');

    this.shape = null;
    switch(this.type){
        case "cylinder":
            this.shape = new MyCylinder(graph.scene,
                parseInt(this.arguments[0]),
                parseInt(this.arguments[1]),
                parseInt(this.arguments[2]),
                parseInt(this.arguments[3]),
                parseInt(this.arguments[4]),
                parseInt(this.arguments[5]),
                parseInt(this.arguments[6])
            );
            break;

        case "triangle":
            this.shape = new MyTriangle(graph.scene,
                parseInt(this.arguments[0]),
                parseInt(this.arguments[1]),
                parseInt(this.arguments[2]),
                parseInt(this.arguments[3]),
                parseInt(this.arguments[4]),
                parseInt(this.arguments[5]),
                parseInt(this.arguments[6]),
                parseInt(this.arguments[7]),
                parseInt(this.arguments[8]),
                parseInt(this.arguments[9])
            );
            break;

        case "rectangle":
            this.shape = new MyRectangle(graph.scene, 

                parseInt(this.arguments[0]),
                parseInt(this.arguments[1]),
                parseInt(this.arguments[2]),
                parseInt(this.arguments[3])
            );
            break;
        case "sphere":
            this.shape = new MySphere(graph.scene,
                parseInt(this.arguments[0]),
                parseInt(this.arguments[1]),
                parseInt(this.arguments[2])
            );

    }
}

MyGraphLeaf.prototype.display = function(){

    if(this.shape != null){
        this.shape.display();
    }

}
