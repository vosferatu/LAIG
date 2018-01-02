/**
 * MyInterface class, creating a GUI interface.
 * @constructor
 */
function MyInterface() {
    //call CGFinterface constructor
    CGFinterface.call(this);
}
;

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui

    this.gui = new dat.GUI();
    this.gui.add(this.scene, "newGame").name("New Game");


    // add a group of controls (and open/expand by defult)

    return true;
};

/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 */
MyInterface.prototype.addLightsGroup = function (lights, src = this.gui) {

    var groupLights = src.addFolder("Lights");
    groupLights.close();

    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            this.scene.lightValues[key] = lights[key][0];
            groupLights.add(this.scene.lightValues, key);
        }
    }
}

MyInterface.prototype.addHighlightSelection = function (/* selectableNodes, */src = this.gui){

    var groupHighlight = src.addFolder("Selecting tiles");
    groupHighlight.close();

    // var dictSelectableNodes = {"Select a node" : 0};

    // for (let i = 0; i < this.scene.selectableNodes.length; i++) {
    //     let selectableNodeID = this.scene.selectableNodes[i];

    //     dictSelectableNodes[selectableNodeID] = i+1;
    // }

    // groupHighlight.add(this.scene, 'selectedHighlightIndex', dictSelectableNodes).name('Object');

    groupHighlight.add(this.scene, 'selectedColorIndex', {
        "Red" : 0,
        "Green" : 1,
        "Blue" : 2,
        "Orange" : 3,
        "Purple" : 4
    }).name('Selected Color');

    // Due to a bug in the color interface of dat.GUI, it was not possible to use
    // it for highlight color selection:

    // groupHighlight.addColor(this.scene, 'selectedColorInterface').name("Color");

}

MyInterface.prototype.addGameOptions = function (src = this.gui) {
    var groupGameOptions = src.addFolder("Game Options");
    groupGameOptions.close();

    groupGameOptions.add(this.scene.board, "player1", { Human: true, Computer: false }).name("Player 1");
    groupGameOptions.add(this.scene.board, "player2", { Human: true, Computer: false }).name("Player 2");
    groupGameOptions.add(this.scene.board, "difficulty", { Random: false, Smart: true }).name("Difficulty");

    this.addLightsGroup(this.scene.graph.lights, groupGameOptions);
    this.addHighlightSelection(groupGameOptions);
    groupGameOptions.add(this.scene.graph, "idRoot", { FEUP: "root", Stadium: "root2" }).name("Scene");
}

MyInterface.prototype.processKeyDown = function(event) {

    CGFinterface.prototype.processKeyDown.call(this,event);
    console.log(event.keyCode);
	switch (event.keyCode){
		case(67):
		    var firstCam = this.scene.perspectives[this.scene.cameraIndex];
		    this.scene.cameraIndex = (this.scene.cameraIndex + 1) % this.scene.perspectives.length;
	    	this.scene.camera = this.scene.perspectives[this.scene.cameraIndex];
			this.scene.cameraMoving = true;
			this.scene.cameraAnimation = new MyCameraAnimation(this.scene, 2, firstCam, this.scene.camera);
			this.setActiveCamera(this.scene.camera);
			break;
	}
};