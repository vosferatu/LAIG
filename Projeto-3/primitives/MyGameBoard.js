

/**
 * MyGameBoard
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

var WHITE_TILE_TX = "whitetile.jpg"
var BLACK_TILE_TX = "blacktile.jpg"
var STRUCTURE_TX = "wood.jpg";
var WHITE_TURN_TX = "whitePlayerTurn.jpg"
var BLACK_TURN_TX = "blackPlayerTurn.jpg"

var EE = -1;
var W2 = 0, W3 = 1, W4 = 2;
var B2 = 3, B3 = 4, B4 = 5;
var NO = 6;
var OR = 7, OL = 8, OT = 9, OB = 10;
var TH = 11, TV = 12;
var RR = 13, RL = 14, RT = 15, RB = 16;
var LR = 17, LL = 18, LT = 19, LB = 20;
var AT = 21;


function MyGameBoard(scene) {
    CGFobject.call(this, scene);

    this.initTextures();
    this.initBoardStructure();
    this.initTiles();
    this.initPieces();

    this.setInitialBoard();
    this.requestInitialBoard();

    this.currentPlayer = 1;
    this.dest = -1;
    this.src = -1;

    this.bg;
    this.bgIndex = null;

    this.selectedTile = -1;
    this.animations = [];

    this.choosingBarragoon = null;
    this.animationsCount=0;


};

MyGameBoard.prototype = Object.create(CGFobject.prototype);
MyGameBoard.prototype.constructor = MyGameBoard;

MyGameBoard.prototype.initTextures = function(){

    this.whiteTileTx = new CGFtexture(this.scene, "./scenes/images/" + WHITE_TILE_TX);
    this.blackTileTx = new CGFtexture(this.scene, "./scenes/images/" + BLACK_TILE_TX);
}

MyGameBoard.prototype.initTiles = function(){

    this.tiles = [];

    for (let i = 0; i < BOARD_HEIGHT; i++) {

        this.tiles[i] = [];

        for (let j = 0; j < BOARD_WIDTH; j++) {
            this.tiles[i][j] = new MyRectangle(this.scene, j, i, j + 1, i + 1);
        }
    }
}

MyGameBoard.prototype.initBoardStructure = function(){

    function MyBoardStructure(scene) {
        CGFobject.call(this, scene);

        this.structureTx = new CGFtexture(this.scene, "./scenes/images/" + STRUCTURE_TX);
        this.whiteTurnTx = new CGFtexture(this.scene, "./scenes/images/" + WHITE_TURN_TX);
        this.blackTurnTx = new CGFtexture(this.scene, "./scenes/images/" + BLACK_TURN_TX);

        this.cube = new MyCube(this.scene);
        this.turn = new MyQuad(this.scene);
    };
    MyBoardStructure.prototype = Object.create(CGFobject.prototype);
    MyBoardStructure.prototype.constructor = MyBoardStructure;

    MyBoardStructure.prototype.display = function(){
        let turnTx = this.scene.board.currentPlayer == 1 ? this.whiteTurnTx : this.blackTurnTx;
        turnTx.bind();
        this.scene.pushMatrix();
        this.scene.translate(-7, 0.05, -3.5);
        this.scene.rotate(Math.degToRad(-90), 1,0,0);
        this.scene.scale(2.5, 2.5, 2.5);
        this.turn.display();
        this.scene.popMatrix();

        this.structureTx.bind();

        // BASE
        this.scene.pushMatrix();
        this.scene.translate(-1, 0, 1);
        this.scene.scale(8,0.3,10);
        this.scene.translate(0, 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        //SIDES
        this.scene.pushMatrix();
        this.scene.translate(-1, 0, 5.75);
        this.scene.scale(8, 0.5, 0.5);
        this.scene.translate(0, 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1, 0, -3.75);
        this.scene.scale(8, 0.5, 0.5);
        this.scene.translate(0, 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.75, 0, 1);
        this.scene.scale(0.5, 0.5, 9);
        this.scene.translate(0, 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-4.75, 0, 1);
        this.scene.scale(0.5, 0.5, 9);
        this.scene.translate(0, 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();
    }


    this.structure = new MyBoardStructure(this.scene);


}

MyGameBoard.prototype.initPieces = function () {
    this.pieces = [];

    this.white2DotsPlayerPiece = new MyPlayerPiece(this.scene, true, 2);
    this.white3DotsPlayerPiece = new MyPlayerPiece(this.scene, true, 3);
    this.white4DotsPlayerPiece = new MyPlayerPiece(this.scene, true, 4);
    this.black2DotsPlayerPiece = new MyPlayerPiece(this.scene, false, 2);
    this.black3DotsPlayerPiece = new MyPlayerPiece(this.scene, false, 3);
    this.black4DotsPlayerPiece = new MyPlayerPiece(this.scene, false, 4);

    this.barragoonPiece = new MyBarragoonPiece(this.scene);

    this.pieces.push(
        this.white2DotsPlayerPiece,
        this.white3DotsPlayerPiece,
        this.white4DotsPlayerPiece,
        this.black2DotsPlayerPiece,
        this.black3DotsPlayerPiece,
        this.black4DotsPlayerPiece,
        this.barragoonPiece
    );

    this.outsideBGnumber = 24;
    this.outsideBGOrientations = [];

    for (let i = 0; i < this.outsideBGnumber; i++) {
        this.outsideBGOrientations.push(Math.randomInt(0, this.barragoonPiece.possibleOrientations.length));
    }

    this.outsidePieces = [];
}

MyGameBoard.prototype.setInitialBoard = function (){
    this.board = [
        [EE, W4, W3, EE, W3, W4, EE],
        [EE, EE, W2, W3, W2, EE, EE],
        [EE, EE, EE, EE, EE, EE, EE],
        [EE, NO, EE, EE, EE, NO, EE],
        [NO, EE, NO, EE, NO, EE, NO],
        [EE, NO, EE, EE, EE, NO, EE],
        [EE, EE, EE, EE, EE, EE, EE],
        [EE, EE, B2, B3, B2, EE, EE],
        [EE, B4, B3, EE, B3, B4, EE]
    ];

}

MyGameBoard.prototype.update = function (currTime){
    var elapsedTime = currTime;

    for (let i = 0; i < this.animations.length; i++) {

        if (this.animations[i] == null) continue;

        if(this.animations[i][2] == null){
            this.animations[i][2] = elapsedTime;
        }

        if (elapsedTime - this.animations[i][2] >= this.animations[i][0].time){
            this.animations[i] = null;
            this.animationsCount--;

            continue;
        }
        let newMatrix = this.animations[i][0].getMatrix(elapsedTime - this.animations[i][2]);
        this.animations[i][1] = newMatrix;

    }
}

MyGameBoard.prototype.display = function () {

    this.scene.pushMatrix();
    this.structure.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0.31, 0);
    this.displayPieces();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-4.5,0.31,-3.5);
    this.displayTiles();
    this.scene.popMatrix();

    this.scene.clearPickRegistration();

    this.scene.pushMatrix();
    this.scene.translate(-7, 0, -0.75);
    this.displayOutsideBarragoons();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(4, 0, -2);
    this.displayOutsidePieces();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.displayBarragoonChoosingPiece();
    this.scene.popMatrix();



}

MyGameBoard.prototype.displayBarragoonChoosingPiece = function(){
    if (this.choosingBarragoon != null) {

        this.scene.translate(0, 10.5, 10);
        if (this.animations[5] != null) {

            let matrix = this.animations[5][1];

            this.scene.multMatrix(matrix != null ? matrix : this.animations[5][0].getMatrix(0));

        }
        this.barragoonPiece.display(this.barragoonPiece.possibleOrientations[this.choosingBarragoon - 6]);

    }
}

MyGameBoard.prototype.displayTiles = function(){
    for (let row = 0; row < this.tiles.length; row++) {
        const rowTiles = this.tiles[row];
        for (let column = 0; column < rowTiles.length; column++) {
            this.scene.pushMatrix();

            const tile = rowTiles[column];

            // Texture
            let whitetileFlag = (7 * row + column) % 2;
            if (whitetileFlag)
                this.whiteTileTx.bind();
            else
                this.blackTileTx.bind();

            // Picking
            let pickingId = Math.indexToId(row, column);

            if (this.selectedTile == pickingId)
                this.scene.setActiveShader(this.scene.shader);

            this.scene.registerForPick(pickingId, tile);

            tile.display();

            if (this.selectedTile == pickingId)
                this.scene.setActiveShader(this.scene.defaultShader);

            this.scene.popMatrix();

        }
    }
}

MyGameBoard.prototype.displayPieces = function () {

    for (let row = 0; row < this.board.length; row++) {
        const rowBoard = this.board[row];
        for (let column = 0; column < rowBoard.length; column++) {

            const piece = rowBoard[column];
            if(piece == -1) continue;

            this.scene.pushMatrix();

            let pickingId = Math.indexToId(row, column);
            this.scene.registerForPick(pickingId, piece);

            this.scene.translate(column - 4, 0, row - 3);

            if (this.animations[pickingId] != null){

                let matrix = this.animations[pickingId][1];
                
                this.scene.multMatrix(matrix != null ? matrix : this.animations[pickingId][0].getMatrix(0));

            }

            if(piece < 6)
                this.pieces[piece].display();
            else{
                this.pieces[6].display(this.barragoonPiece.possibleOrientations[piece - 6]);
            }
            this.scene.popMatrix();

        }
    }
}

MyGameBoard.prototype.displayOutsideBarragoons = function () {

    for (let i = 0; i < this.outsideBGnumber; i++) {
        this.scene.pushMatrix();
        this.scene.translate((i % 3) / 2, 0, Math.floor(i / 3) / 2);

        let index = this.outsideBGOrientations[i];
        this.barragoonPiece.display(this.barragoonPiece.possibleOrientations[index]);
        this.scene.popMatrix();
    }
}

MyGameBoard.prototype.displayOutsidePieces = function () {

    for (let i = 0; i < this.outsidePieces.length; i++) {
        this.scene.pushMatrix();
        this.scene.translate((i % 2), 0, Math.floor(i / 2));

        let piece = this.pieces[this.outsidePieces[i]];

        if (this.animations[101 + i] != null) {

            this.scene.multMatrix(this.animations[101 + i][1]);
        }

        piece.display();
        this.scene.popMatrix();
    }
}


MyGameBoard.prototype.isEmpty = function(id){
    if(id < 0 || id === undefined) return true;
    let index = Math.idToIndex(id);

    let row = index[0];
    let column = index[1];

    return this.board[row][column] == EE;
}

MyGameBoard.prototype.move = function(){
    if(this.isEmpty(this.src))
        return;

    

    let srcIndex = Math.idToIndex(this.src);
    let destIndex = Math.idToIndex(this.dest);

    let srcPiece = this.board[srcIndex[0]][srcIndex[1]];
    let destPiece = this.board[destIndex[0]][destIndex[1]];

    if (!this.isEmpty(this.dest)) {
        if (destPiece < 6){
            this.playerPieceOutAnimation(destIndex, destPiece);

            if(this.isPlayerHuman()){

                let newBgIndex = [2.5 + Math.floor((this.outsideBGnumber - 1) / 3) / 2, -2.75 + ((this.outsideBGnumber - 1) % 3) / 2];
                this.barragoonPieceOutAnimation(newBgIndex, this.outsideBGOrientations[this.outsideBGnumber - 1] + 6);
                this.handleKeyboardChoosingBarragoon();
                this.outsideBGnumber--;

                this.secondPlayerToChoose = true;
            }
            else{
                this.requestPCBarragoon();
                this.placeBarragoon();

                this.requestPCBarragoon();
                this.placeBarragoon();

            }
        }
        else{
            if(this.isPlayerHuman()){
                this.barragoonPieceOutAnimation(destIndex, destPiece);
                this.handleKeyboardChoosingBarragoon();
            }
            else{
                this.requestPCBarragoon();
                this.placeBarragoon();

            }
        }
    }

    this.board[srcIndex[0]][srcIndex[1]] = EE;
    this.board[destIndex[0]][destIndex[1]] = srcPiece;

    this.pieceCapturedAnimation(srcIndex, destIndex);

    this.dest = -1;
    this.src = -1;
    
    this.changePlayer();
    
}

MyGameBoard.prototype.chooseBarragoonPiece2Player = function(){

    let newBgIndex = [2.5 + Math.floor((this.outsideBGnumber-1) / 3) / 2, -2.75 + ((this.outsideBGnumber-1) % 3) / 2]; 
    this.barragoonPieceOutAnimation(newBgIndex, this.outsideBGOrientations[this.outsideBGnumber - 1] +6);
    this.handleKeyboardChoosingBarragoon();
    // alert("PLAYER " + (this.currentPlayer == 1 ? "BLACK" : "WHITE") + "!\nChoose an orientation (A/D) and a tile (clicking on it) for place the Barragoon Piece. ");
    this.outsideBGnumber--;
    this.changePlayer();


}


MyGameBoard.prototype.placeBarragoon = function () {
    
    let destIndex = Math.idToIndex(this.bgIndex);
    this.board[destIndex[0]][destIndex[1]] = this.choosingBarragoon;
    this.choosingBarragoon = null;

    if(this.isPlayerHuman()){
        let x = 4;
        let y = 10.5;
        let z = 13;

        let controlPointsOut = [];
        controlPointsOut.push([x - destIndex[1], y - 0.31, z - destIndex[0]]);
        controlPointsOut.push([0, 0, 0]);
        let movingAnimationOut = new MyLinearAnimation(this.scene, 8, controlPointsOut);

        this.animations[this.bgIndex] = [movingAnimationOut, null, null];
        this.animationsCount++;
    }

}

MyGameBoard.prototype.handleKeyboardChoosingBarragoon = function () {

    let handlerKeyPressed = function (a) {

        console.log(a);

        let RIGHT = 100;
        let LEFT = 97;

        switch (a.keyCode) {
            case RIGHT:
                if (this.choosingBarragoon == 21)
                    this.choosingBarragoon = 6;
                else
                    this.choosingBarragoon++;
                break;

            case LEFT:
                if (this.choosingBarragoon == 6)
                    this.choosingBarragoon = 21;
                else
                    this.choosingBarragoon--;
                break;
        }
    }
    window.onkeypress = handlerKeyPressed.bind(this);
}

MyGameBoard.prototype.barragoonPieceOutAnimation = function (srcIndex, srcPiece) {

    this.choosingBarragoon = srcPiece;

    let x = 4;
    let y = 10.5;
    let z = 13;
    let controlPointsOut = [];
    controlPointsOut.push([srcIndex[1]-x, 0.31-y, srcIndex[0]-z]);
    controlPointsOut.push([0, 0, 0]);
    let movingAnimationOut = new MyLinearAnimation(this.scene, 8, controlPointsOut);

    this.animations[5] = [movingAnimationOut, null, null];
    this.animationsCount++;
}

MyGameBoard.prototype.playerPieceOutAnimation = function (srcIndex, srcPiece) {
    this.outsidePieces.push(srcPiece);

    let x = 8 + (this.outsidePieces.length - 1) % 2;
    let z = 1 + Math.floor((this.outsidePieces.length - 1) / 2);
    let controlPointsOut = [];
    controlPointsOut.push([srcIndex[1] - x, 0.31, srcIndex[0] - z]);
    controlPointsOut.push([srcIndex[1] - x, 2, srcIndex[0] - z]);
    controlPointsOut.push([0, 2, 0]);
    controlPointsOut.push([0, 0, 0]);
    let movingAnimationOut = new MyBezierAnimation(this.scene, 3, controlPointsOut);

    this.animations[100 + this.outsidePieces.length] = [movingAnimationOut, null, null];
    this.animationsCount++;

}

MyGameBoard.prototype.pieceCapturedAnimation = function(srcIndex, destIndex){
    let controlPoints = [];
    controlPoints.push([srcIndex[1] - destIndex[1], 0, srcIndex[0] - destIndex[0]]);
    controlPoints.push([srcIndex[1] - destIndex[1], 2, srcIndex[0] - destIndex[0]]);
    controlPoints.push([0, 2, 0]);
    controlPoints.push([0, 0, 0]);
    let movingAnimation = new MyBezierAnimation(this.scene, 3, controlPoints);

    this.animations[this.dest] = [movingAnimation, null, null];
    this.animationsCount++;

}

MyGameBoard.prototype.noAnimations=function () {
    return this.animationsCount == 0;
}

MyGameBoard.prototype.newGame = function () {
  this.setInitialBoard();
  this.requestInitialBoard();
  this.currentPlayer = 1;
  this.outsideBGnumber = 24;
  this.outsidePieces = [];
};

MyGameBoard.prototype.changePlayer = function(){
    if (this.currentPlayer == 1) {
        this.currentPlayer = 2;
    } else {
        this.currentPlayer = 1;
    }
}
