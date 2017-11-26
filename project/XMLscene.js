var DEGREE_TO_RAD = Math.PI / 180;

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
    this.selectedHighlightIndex = 0;
    this.selectedHighlightNode = null;
    
    this.selectedColorIndex = 0;
    this.selectableColors = [
        [1, 0, 0, 1],
        [0, 1, 0, 1],  
        [0, 0, 1, 1],  
        [1, 0.5, 0, 1],
        [0.75, 0, 0.75, 1],  
    ];
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
 * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
 */
XMLscene.prototype.init = function(application) {
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


}

/**
 * Initializes the scene lights with the values read from the LSX file.
 */
XMLscene.prototype.initLights = function() {
    var i = 0;
    // Lights index.

    // Reads the lights from the scene graph.
    for (var key in this.graph.lights) {
        if (i >= 8)
            break;              // Only eight lights allowed by WebGL.

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
XMLscene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4,0.1,500,vec3.fromValues(15, 15, 15),vec3.fromValues(0, 0, 0));
}

/* Handler called when the graph is finally loaded.
 * As loading is asynchronous, this may be called already after the application has started the run loop
 */
XMLscene.prototype.onGraphLoaded = function()
{
    this.camera.near = this.graph.near;
    this.camera.far = this.graph.far;
    this.axis = new CGFaxis(this,this.graph.referenceLength);

    this.setGlobalAmbientLight(this.graph.ambientIllumination[0], this.graph.ambientIllumination[1],
    this.graph.ambientIllumination[2], this.graph.ambientIllumination[3]);

    this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);

    this.initLights();

    // Adds menu elements.
    this.interface.addLightsGroup(this.graph.lights);
    this.interface.addHighlightSelection(this.graph.selectableNodes);
}

/**
 * Displays the scene.
 */
XMLscene.prototype.display = function() {
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

    if (this.graph.loadedOk)
    {
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
                }
                else {
                    this.lights[i].setVisible(false);
                    this.lights[i].disable();
                }
                this.lights[i].update();
                i++;
            }
        }

        // Displays the scene.
        this.graph.displayScene();

        this.highlightNodeRendered = false;


    }
	else
	{
		// Draw axis
		this.axis.display();
	}


    this.popMatrix();

    // ---- END Background, camera and axis setup

}

XMLscene.prototype.update = function(currTime) {
    var elapsed = (currTime-this.startTime)/1000;

    this.graph.update(elapsed);

    this.selectedHighlightNode = this.selectableNodes[this.selectedHighlightIndex-1];
    this.selectedColor = this.selectableColors[this.selectedColorIndex];

    //Update deltaHighLight
    let newDelta = Math.cos(currTime / 250.0) / 2 + 0.5;


    this.shader.setUniformsValues({
        timeFactor : newDelta,
        selectedColor : this.selectedColor
    });


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