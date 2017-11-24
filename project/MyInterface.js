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

    // add a group of controls (and open/expand by defult)
    
    return true;
};

/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 */
MyInterface.prototype.addLightsGroup = function(lights) {

    var groupLights = this.gui.addFolder("Lights");
    groupLights.open();

    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            this.scene.lightValues[key] = lights[key][0];
            groupLights.add(this.scene.lightValues, key);
        }
    }
}

MyInterface.prototype.addHighlightSelection = function(selectableNodes){

    var groupHighlight = this.gui.addFolder("Selecting Objects");
    groupHighlight.open();

    var dictSelectableNodes = {};

    for (let i = 0; i < this.scene.selectableNodes.length; i++) {
        let selectableNodeID = this.scene.selectableNodes[i];

        dictSelectableNodes[selectableNodeID] = i;
    }

    console.log("DICT SELECTABEL: ");
    console.log(dictSelectableNodes);
    this.gui.add(this.scene, 'selectedHighlightIndex', dictSelectableNodes).name('Highlighting Object');
}

