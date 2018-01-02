/**
 * MyBarragoonPiece
 * @param gl {WebGLRenderingContext}
 * @constructor
 */



function MyBarragoonPiece(scene) {
    CGFobject.call(this, scene);

    this.possibleOrientations = [
        "cross",
        "oneRight", "oneLeft", "oneTop", "oneBottom", 
        "twoHorizontal", "twoVertical", 
        "turnRightRight", "turnRightLeft", "turnRightTop", "turnRightBottom", 
        "turnLeftRight", "turnLeftLeft", "turnLeftTop", "turnLeftBottom", 
        "allDirections"
    ];

    this.side = new MyQuad(this.scene);
    

};

MyBarragoonPiece.prototype = Object.create(CGFobject.prototype);
MyBarragoonPiece.prototype.constructor = MyBarragoonPiece;


MyBarragoonPiece.prototype.display = function (orientation = "cross") {

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
        case "allDirections": this.scene.rotate(Math.degToRad(180), 1, 0, 0); break;

        case "oneLeft": this.scene.rotate(Math.degToRad(-90), 0, 1, 0);
        case "oneBottom": this.scene.rotate(Math.degToRad(-90), 0, 1, 0);
        case "oneRight": this.scene.rotate(Math.degToRad(-90), 0, 1, 0);
        case "oneTop": this.scene.rotate(Math.degToRad(-90), 1, 0, 0); break;

        case "twoHorizontal": this.scene.rotate(Math.degToRad(90), 0, 1, 0);
        case "twoVertical": this.scene.rotate(Math.degToRad(90), 1, 0, 0); break;

        case "turnRightLeft": this.scene.rotate(Math.degToRad(-90), 0, 1, 0);
        case "turnRightBottom": this.scene.rotate(Math.degToRad(-90), 0, 1, 0);
        case "turnRightRight": this.scene.rotate(Math.degToRad(-90), 0, 1, 0);
        case "turnRightTop": this.scene.rotate(Math.degToRad(90), 0, 0, 1); break;

        case "turnLeftLeft": this.scene.rotate(Math.degToRad(-90), 0, 1, 0);
        case "turnLeftBottom": this.scene.rotate(Math.degToRad(-90), 0, 1, 0);
        case "turnLeftRight": this.scene.rotate(Math.degToRad(-90), 0, 1, 0);
        case "turnLeftTop": this.scene.rotate(Math.degToRad(-90), 0, 0, 1); break;

        case "cross": default: break;
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