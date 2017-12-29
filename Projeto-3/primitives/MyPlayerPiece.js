/**
 * MyPlayerPiece
 * @param gl {WebGLRenderingContext}
 * @constructor
 */



function MyPlayerPiece(scene, white, numDots) {
    CGFobject.call(this, scene);

    this.white = white;
    this.numDots = numDots;
    this.texture = this.getTexture();
    this.topTexture = this.getTopTexture();

    this.cylinder = new MyCylinder(this.scene, 0.8, 0.4, 0.4, 5, 20, false, true);
    this.top = new MyCircle(this.scene, 20, 0.4, 0.8);

    

};

MyPlayerPiece.prototype = Object.create(CGFobject.prototype);
MyPlayerPiece.prototype.constructor = MyPlayerPiece;


MyPlayerPiece.prototype.display = function () {

    this.scene.pushMatrix();
    this.scene.rotate(Math.degToRad(-90), 1,0,0);

    this.texture.bind();
    this.cylinder.display();

    this.topTexture.bind();
    this.top.display();
    this.scene.popMatrix();

}

MyPlayerPiece.prototype.getTopTexture = function () {
    switch (this.numDots) {
        case 2:
            return this.white ? this.scene.white2DotsTx : this.scene.black2DotsTx;
        case 3:
            return this.white ? this.scene.white3DotsTx : this.scene.black3DotsTx;
        case 4:
            return this.white ? this.scene.white4DotsTx : this.scene.black4DotsTx;
    }
}

MyPlayerPiece.prototype.getTexture = function () {
    return this.white ? this.scene.whitePlayerPieceTx : this.scene.blackPlayerPieceTx;
}