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
    groupLights.close();

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

    var dictSelectableNodes = {"Select a node" : 0};

    for (let i = 0; i < this.scene.selectableNodes.length; i++) {
        let selectableNodeID = this.scene.selectableNodes[i];

        dictSelectableNodes[selectableNodeID] = i+1;
    }

    groupHighlight.add(this.scene, 'selectedHighlightIndex', dictSelectableNodes).name('Object');

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

