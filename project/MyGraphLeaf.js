/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlelem) {

    this.graph = graph;
    this.type = graph.reader.getItem(xmlelem,"type", ["rectangle", "sphere", "cylinder", "triangle", "patch"]);
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
            break;
        case "patch":

            var u = this.arguments[0];
            var v = this.arguments[1];

            var cplines = xmlelem.children;

            var x,y,z, w;
			var tmp = new Array();
			var controlPoints = new Array();

            var j = 0;
            var i = 0;

            for (; i < cplines.length; i++){
                var cpoints = cplines[i].children;
                tmp = new Array();

                if(cplines[i].nodeName == "CPLINE"){
                    
                    for(;j < cpoints.length; j++){
                        if(cpoints[j].nodeName == "CPOINT"){
                            x = graph.reader.getFloat(cpoints[j], 'xx');
                            y = graph.reader.getFloat(cpoints[j], 'yy');
                            z = graph.reader.getFloat(cpoints[j], 'zz');
                            w = graph.reader.getFloat(cpoints[j], 'ww');
                            
                            var point = new Array();
                            point.push(x,y,z,w);

                            tmp.push(point);
                        }
                    }

                    if(i < cplines.length-1)
                        j = 0;
                    if(tmp != null)
                        controlPoints.push(tmp);
                }
            }

            this.shape = new MyPatch(graph.scene,
                u,
                v, i-1, j-1, controlPoints
            );
    }
}

MyGraphLeaf.prototype.display = function(){

    if(this.shape != null){
        this.shape.display();
    }

}

MyGraphLeaf.prototype.amplify = function(ampS, ampT){
    if(this.shape != null){
        this.shape.amplify(ampS, ampT);
    }
}