/**
 * MyBarragoonPiece
 * @param gl {WebGLRenderingContext}
 * @constructor
 */



function MyBarragoonPiece(scene) {
    CGFobject.call(this, scene);

    this.possibleOrientations = [
        "no",
        "or", "ol", "ot", "ob", 
        "th", "tv", 
        "rr", "rl", "rt", "rb", 
        "lr", "ll", "lt", "lb", 
        "at"
    ];

    this.side = new MyQuad(this.scene);
    

};

MyBarragoonPiece.prototype = Object.create(CGFobject.prototype);
MyBarragoonPiece.prototype.constructor = MyBarragoonPiece;


MyBarragoonPiece.prototype.display = function (orientation = "no") {

    this.scene.scale(0.5, 0.5, 0.5);
    this.scene.translate(0,0.5,0);
    this.rotateOrientation(orientation);

    this.scene.pushMatrix();
    this.scene.translate(0, -0.5, 0);
    this.scene.rotate(Math.degToRad(90), 1, 0, 0);
    this.scene.bgAllDirectionsTx.bind();
    this.side.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0.5, 0);
    this.scene.rotate(Math.degToRad(-90), 1, 0, 0);
    this.scene.bgCrossTx.bind();
    this.side.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.5);
    this.scene.bgOneDirectionTx.bind();
    this.side.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.5);
    this.scene.rotate(Math.degToRad(180), 1, 0, 0);
    this.scene.bgTwoDirectionsTx.bind();
    this.side.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.5, 0, 0);
    this.scene.rotate(Math.degToRad(-90), 0, 1, 0);
    this.scene.rotate(Math.degToRad(90), 0, 0, 1);
    this.scene.bgTurnLeftTx.bind();
    this.side.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.5, 0, 0);
    this.scene.rotate(Math.degToRad(90), 0, 1, 0);
    this.scene.rotate(Math.degToRad(-90), 0, 0, 1);
    this.scene.bgTurnRightTx.bind();
    this.side.display();
    this.scene.popMatrix();

}
MyBarragoonPiece.prototype.rotateOrientation = function (orientation) {

    switch(orientation){
        case "at": this.scene.rotate(Math.degToRad(180), 1, 0, 0); break;

        case "ol": this.scene.rotate(Math.degToRad(-90), 0, 1, 0);
        case "ob": this.scene.rotate(Math.degToRad(-90), 0, 1, 0);
        case "or": this.scene.rotate(Math.degToRad(-90), 0, 1, 0);
        case "ot": this.scene.rotate(Math.degToRad(-90), 1, 0, 0); break;

        case "th": this.scene.rotate(Math.degToRad(90), 0, 1, 0);
        case "tv": this.scene.rotate(Math.degToRad(90), 1, 0, 0); break;

        case "rl": this.scene.rotate(Math.degToRad(-90), 0, 1, 0);
        case "rb": this.scene.rotate(Math.degToRad(-90), 0, 1, 0);
        case "rr": this.scene.rotate(Math.degToRad(-90), 0, 1, 0);
        case "rt": this.scene.rotate(Math.degToRad(90), 0, 0, 1); break;

        case "ll": this.scene.rotate(Math.degToRad(-90), 0, 1, 0);
        case "lb": this.scene.rotate(Math.degToRad(-90), 0, 1, 0);
        case "lr": this.scene.rotate(Math.degToRad(-90), 0, 1, 0);
        case "lt": this.scene.rotate(Math.degToRad(-90), 0, 0, 1); break;

        case "no": default: break;
    }
}
MyBarragoonPiece.prototype.getTopTexture = function () {
    switch (this.numDots) {
        case 2:
            return this.white ? this.scene.white2DotsTx : this.scene.black2DotsTx;
        case 3:
            return this.white ? this.scene.white3DotsTx : this.scene.black3DotsTx;
        case 4:
            return this.white ? this.scene.white4DotsTx : this.scene.black4DotsTx;
    }
}

MyBarragoonPiece.prototype.getTexture = function () {
    return this.white ? this.scene.whitePlayerPieceTx : this.scene.blackPlayerPieceTx;
}
