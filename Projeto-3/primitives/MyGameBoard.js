

/**
 * MyGameBoard
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

var WHITE_TILE_TX = "whitetile.jpg"
var BLACK_TILE_TX = "blacktile.jpg"
var STRUCTURE_TX = "wood.jpg";

var EE = -1;
var W2 = 0;
var W3 = 1;
var W4 = 2;
var B2 = 3;
var B3 = 4;
var B4 = 5;
var BG = 6;


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

    this.selectedTile = -1;
    this.animations = [];
    
};

MyGameBoard.prototype = Object.create(CGFobject.prototype);
MyGameBoard.prototype.constructor = MyGameBoard;

MyGameBoard.prototype.initTextures = function(){

    this.whiteTileTx = new CGFtexture(this.scene, "./scenes/images/" + WHITE_TILE_TX);
    this.blackTileTx = new CGFtexture(this.scene, "./scenes/images/" + BLACK_TILE_TX);
    // this.selectedTileTx = new CGFtexture(this.scene, "./scenes/images/" + SELECTED_TILE_TX);
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
        this.cube = new MyCube(this.scene);
    };
    MyBoardStructure.prototype = Object.create(CGFobject.prototype);
    MyBoardStructure.prototype.constructor = MyBoardStructure;

    MyBoardStructure.prototype.display = function(){
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
}

MyGameBoard.prototype.setInitialBoard = function (){
    this.board = [
        [EE, W4, W3, EE, W3, W4, EE],
        [EE, EE, W2, W3, W2, EE, EE],
        [EE, EE, EE, EE, EE, EE, EE],
        [EE, BG, EE, EE, EE, BG, EE],
        [BG, EE, BG, EE, BG, EE, BG],
        [EE, BG, EE, EE, EE, BG, EE],
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

                this.scene.multMatrix(this.animations[pickingId][1]);

            }

            this.pieces[piece].display();
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

    let piece = this.board[srcIndex[0]][srcIndex[1]];

    this.board[srcIndex[0]][srcIndex[1]] = EE;
    this.board[destIndex[0]][destIndex[1]] = piece;


    let controlPoints = [];
    controlPoints.push([srcIndex[1] - destIndex[1], 0, srcIndex[0] - destIndex[0]]);
    controlPoints.push([srcIndex[1] - destIndex[1], 2, srcIndex[0] - destIndex[0]]);
    controlPoints.push([0, 2, 0]);
    controlPoints.push([0, 0, 0]);
    let movingAnimation = new MyBezierAnimation(this.scene, 3, controlPoints);

    this.animations[this.dest] = [movingAnimation, null, null];
    

    this.dest = -1;
    this.src = -1;
    if(this.currentPlayer == 1){
        this.currentPlayer = 2;
    } else {
        this.currentPlayer = 1;
    }

    if(!this.isEmpty(this.dest)){
        //comeu. animar peça comida
    }
}
