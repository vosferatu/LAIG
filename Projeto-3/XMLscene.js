var DEGREE_TO_RAD = Math.PI / 180;
var BOARD_WIDTH = 7;
var BOARD_HEIGHT = 9;

var BLACK_PLAYER_PIECE_TX = "darkWood.jpg";
var WHITE_PLAYER_PIECE_TX = "lightWood.jpg";
var BLACK_2_DOTS_TX = "black2Dots.jpg";
var WHITE_2_DOTS_TX = "white2Dots.jpg";
var BLACK_3_DOTS_TX = "black3Dots.jpg";
var WHITE_3_DOTS_TX = "white3Dots.jpg";
var BLACK_4_DOTS_TX = "black4Dots.jpg";
var WHITE_4_DOTS_TX = "white4Dots.jpg";
var BG_ALL_DIRECTIONS_TX = "allDirectionsBG.jpg";
var BG_ONE_DIRECTION_TX = "oneDirectionBG.jpg";
var BG_TWO_DIRECTIONS_TX = "twoDirectionsBG.jpg";
var BG_TURN_RIGHT_TX = "turnRightBG.jpg";
var BG_TURN_LEFT_TX = "turnLeftBG.jpg";
var BG_CROSS_TX = "crossBG.jpg";

/**
 * XMLscene class, representing the scene that is to be rendered.
 * @constructor
 */
function XMLscene(interface) {
    CGFscene.call(this);

    this.interface = interface;

    this.lightValues = {};

    var d = new Date();
    this.startTime = d.getTime();

    this.selectableNodes = new Array();
    // this.selectedHighlightIndex = 0;
    // this.selectedHighlightNode = null;

    this.selectedColor = [1, 0, 0, 1];

    // MyInterface.js:71
    // this.selectedColorInterface = new Array(255,0,0,1);

    this.selectedColorIndex = 0;
    this.selectableColors = [
        [1, 0, 0, 1],
        [0, 1, 0, 1],
        [0, 0, 1, 1],
        [1, 0.5, 0, 1],
        [0.75, 0, 0.75, 1],
    ];

    this.setPickEnabled(true);
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
 * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
 */
XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.enableTextures(true);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis = new CGFaxis(this);

    this.setUpdatePeriod(20); //sets ms update time

    this.shader = new CGFshader(this.gl, "shaders/myShader.vert", "shaders/myShader.frag");

    this.initBoardComponents();
}

/**
 * Initializes the scene lights with the values read from the LSX file.
 */
XMLscene.prototype.initLights = function () {
    var i = 0;
    // Lights index.

    // Reads the lights from the scene graph.
    for (var key in this.graph.lights) {
        if (i >= 8)
            break; // Only eight lights allowed by WebGL.

        if (this.graph.lights.hasOwnProperty(key)) {
            var light = this.graph.lights[key];

            this.lights[i].setPosition(light[1][0], light[1][1], light[1][2], light[1][3]);
            this.lights[i].setAmbient(light[2][0], light[2][1], light[2][2], light[2][3]);
            this.lights[i].setDiffuse(light[3][0], light[3][1], light[3][2], light[3][3]);
            this.lights[i].setSpecular(light[4][0], light[4][1], light[4][2], light[4][3]);

            this.lights[i].setVisible(true);
            if (light[0])
                this.lights[i].enable();
            else
                this.lights[i].disable();

            this.lights[i].update();

            i++;
        }
    }

}

/**
 * Initializes the scene cameras.
 */
XMLscene.prototype.initCameras = function () {

    // direction: 0, -0.7193394899368286, -0.6946586966514587, 0
    // far: 500
    // fov: 0.7
    // near: 0.1
    // position: -0.6684833765029907, 4.384912967681885, 2.4064443111419678, 0
    // target: -0.6684833765029907, 1.8929692506790161, 0, 0

    this.camera = new CGFcamera(0.5, 0.1, 500, vec3.fromValues(-0.2, 10, 5.5), vec3.fromValues(-0.2, 0, -2.5));
}

/**
 * Initializes the board components.
 */
XMLscene.prototype.initBoardComponents = function () {

    this.blackPlayerPieceTx = new CGFtexture(this, "./scenes/images/" + BLACK_PLAYER_PIECE_TX);
    this.whitePlayerPieceTx = new CGFtexture(this, "./scenes/images/" + WHITE_PLAYER_PIECE_TX);

    this.black2DotsTx = new CGFtexture(this, "./scenes/images/" + BLACK_2_DOTS_TX);
    this.white2DotsTx = new CGFtexture(this, "./scenes/images/" + WHITE_2_DOTS_TX);

    this.black3DotsTx = new CGFtexture(this, "./scenes/images/" + BLACK_3_DOTS_TX);
    this.white3DotsTx = new CGFtexture(this, "./scenes/images/" + WHITE_3_DOTS_TX);

    this.black4DotsTx = new CGFtexture(this, "./scenes/images/" + BLACK_4_DOTS_TX);
    this.white4DotsTx = new CGFtexture(this, "./scenes/images/" + WHITE_4_DOTS_TX);

    this.bgAllDirectionsTx = new CGFtexture(this, "./scenes/images/" + BG_ALL_DIRECTIONS_TX);
    this.bgOneDirectionTx = new CGFtexture(this, "./scenes/images/" + BG_ONE_DIRECTION_TX);
    this.bgTwoDirectionsTx = new CGFtexture(this, "./scenes/images/" + BG_TWO_DIRECTIONS_TX);
    this.bgTurnRightTx = new CGFtexture(this, "./scenes/images/" + BG_TURN_RIGHT_TX);
    this.bgTurnLeftTx = new CGFtexture(this, "./scenes/images/" + BG_TURN_LEFT_TX);
    this.bgCrossTx = new CGFtexture(this, "./scenes/images/" + BG_CROSS_TX);

    this.table = new MyTable(this, 13, 12, 0.7, 5);
    this.board = new MyGameBoard(this);

    //TESTING
    this.bg = new MyBarragoonPiece(this);

}

/* Handler called when the graph is finally loaded.
 * As loading is asynchronous, this may be called already after the application has started the run loop
 */
XMLscene.prototype.onGraphLoaded = function () {
    this.camera.near = this.graph.near;
    this.camera.far = this.graph.far;
    this.axis = new CGFaxis(this, this.graph.referenceLength);

    this.setGlobalAmbientLight(this.graph.ambientIllumination[0], this.graph.ambientIllumination[1],
        this.graph.ambientIllumination[2], this.graph.ambientIllumination[3]);

    this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);

    this.initLights();

    // Adds menu elements.
    this.interface.addLightsGroup(this.graph.lights);
    this.interface.addHighlightSelection( /* this.graph.selectableNodes */ );
}

/**
 * Displays the scene.
 */
XMLscene.prototype.display = function () {
    // ---- BEGIN Background, camera and axis setup

    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.pushMatrix();

    if (this.graph.loadedOk) {
        // Applies initial transformations.
        this.multMatrix(this.graph.initialTransforms);

        // Draw axis
        this.axis.display();

        var i = 0;
        for (var key in this.lightValues) {
            if (this.lightValues.hasOwnProperty(key)) {
                if (this.lightValues[key]) {
                    this.lights[i].setVisible(true);
                    this.lights[i].enable();
                } else {
                    this.lights[i].setVisible(false);
                    this.lights[i].disable();
                }
                this.lights[i].update();
                i++;
            }
        }


        this.logPicking();
        this.clearPickRegistration();

        // Displays the scene.
        this.graph.displayScene();

        this.displayBoardComponents();
        this.highlightNodeRendered = false;


    } else {
        // Draw axis
        this.axis.display();
    }


    this.popMatrix();

    // ---- END Background, camera and axis setup
}


XMLscene.prototype.displayBoardComponents = function () {


    this.pushMatrix();
    this.scale(2, 2, 2);

    this.pushMatrix();
    this.translate(1.5, 5, 0);
    this.rotate(Math.degToRad(90), 0, 1, 0);
    this.board.display();
    this.popMatrix();

    this.pushMatrix();
    this.clearPickRegistration();
    this.table.display();
    this.popMatrix();

    this.popMatrix();

}

XMLscene.prototype.update = function (currTime) {
    var elapsed = (currTime - this.startTime) / 1000;

    this.graph.update(elapsed);

    // this.selectedHighlightNode = this.selectableNodes[this.selectedHighlightIndex - 1];
    this.selectedColor = this.selectableColors[this.selectedColorIndex];


    //Update deltaHighLight
    let newDelta = Math.cos(currTime / 250.0) / 2 + 0.5;

    this.shader.setUniformsValues({
        timeFactor: newDelta,
        selectedColor: this.selectedColor
    });

    if(this.board.selectedTile == 11){
        this.board.requestMove();
    }
}

XMLscene.prototype.logPicking = function () {
    if (this.pickMode == false) {
        if (this.pickResults != null && this.pickResults.length > 0) {
            for (var i = 0; i < this.pickResults.length; i++) {
                var customId = this.pickResults[i][1];
                if (customId) {
                    if (this.board.selectedTile != -1 && this.board.isEmpty(customId)) {
                        this.board.move(this.board.selectedTile, customId);
                        this.board.selectedTile = -1;
                    } else if (!this.board.isEmpty(customId)) {
                        this.board.selectedTile = customId;
                    }
                    console.log("Picked object: with pick id " + customId);
                }
            }
            this.pickResults.splice(0, this.pickResults.length);
        }
    }
}

// Converts from degrees to radians.
Math.degToRad = function (degrees) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.radToDeg = function (radians) {
    return radians * 180 / Math.PI;
};

Math.getDistanceBetweenTwoPoins = function (point1, point2) {

    let deltaX = point2[0] - point1[0];
    let deltaY = point2[1] - point1[1];
    let deltaZ = point2[2] - point1[2];

    return Math.hypot(deltaX, deltaY, deltaZ);
}

Math.midPoint = function (point1, point2) {

    let sum = point1.map(function (num, i) {
        return num + point2[i];
    });

    let midPoint = sum.map(function (num, i) {
        return num / 2;
    })

    return midPoint;
}

Math.idToIndex = function (id) {

    let result = [];

    result[0] = Math.floor(id / 10) - 1;
    result[1] = id % 10 - 1;

    return result;
}

Math.indexToId = function (row, column) {

    return (row + 1) * 10 + (column + 1);
}
