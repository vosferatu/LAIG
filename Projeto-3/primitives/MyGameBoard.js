

/**
 * MyGameBoard
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

var WHITE_TILE_TX = "whitetile.jpg"
var BLACK_TILE_TX = "blacktile.jpg"
// var SELECTED_TILE_TX = "selectedtile.jpg"
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

    this.selectedTile = -1;

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
            this.tiles[i][j] = new MyRectangle(this.scene, i, j, i + 1, j + 1);
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
        this.scene.scale(10,0.3,8);
        this.scene.translate(0, 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        //SIDES
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 3.75);
        this.scene.scale(10, 0.5, 0.5);
        this.scene.translate(0, 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -3.75);
        this.scene.scale(10, 0.5, 0.5);
        this.scene.translate(0, 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(4.75, 0, 0);
        this.scene.scale(0.5, 0.5, 7);
        this.scene.translate(0, 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-4.75, 0, 0);
        this.scene.scale(0.5, 0.5, 7);
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
}

MyGameBoard.prototype.setInitialBoard = function (){
    this.board = [
        [EE, B4, B3, EE, B3, B4, EE],
        [EE, EE, B2, B3, B2, EE, EE],
        [EE, EE, EE, EE, EE, EE, EE],
        [EE, BG, EE, EE, EE, BG, EE],
        [BG, EE, BG, EE, BG, EE, BG],
        [EE, BG, EE, EE, EE, BG, EE],
        [EE, EE, EE, EE, EE, EE, EE],
        [EE, EE, W2, W3, W2, EE, EE],
        [EE, W4, W3, EE, W3, W4, EE]
    ];

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

            this.scene.translate(row-4, 0, column-3);
            this.pieces[piece].display();
            this.scene.popMatrix();

        }
    }
}

MyGameBoard.prototype.isEmpty = function(id){
    let index = Math.idToIndex(id);

    let row = index[0];
    let column = index[1];

    return this.board[row][column] == EE;
}

MyGameBoard.prototype.move = function(src, dest){

    if(this.isEmpty(src) || !this.isEmpty(dest))
        return;

    let srcIndex = Math.idToIndex(src);
    let destIndex = Math.idToIndex(dest);

    let piece = this.board[srcIndex[0]][srcIndex[1]];

    this.board[srcIndex[0]][srcIndex[1]] = EE;
    this.board[destIndex[0]][destIndex[1]] = piece;

}
