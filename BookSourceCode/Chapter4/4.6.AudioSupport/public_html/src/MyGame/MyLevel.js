/*
 * File: BlueLevel.js 
 * This is the logic of our game. 
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, MyGame: false, SceneFileParser: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyLevel() {
    // audio clips: supports both mp3 and wav formats
    this.kBgClip = "assets/sounds/BGClip.mp3";
    this.kCue = "assets/sounds/BlueLevel_cue.wav";

    // scene file name
    this.kSceneFile = "assets/MyLevel.xml";
    // all squares
    this.mSqSet = [];        // these are the Renderable objects

    // The camera to view the scene
    this.mCamera = null;
}
gEngine.Core.inheritPrototype(MyLevel, Scene);

MyLevel.prototype.loadScene = function () {
    // load the scene file
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);

    // loads the audios
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCue);
};

MyLevel.prototype.unloadScene = function () {
    // stop the background audio
    gEngine.AudioClips.stopBackgroundAudio();

    // unload the scene flie and loaded resources
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kCue);

    var nextLevel = new MyGame();  // load the next level
    gEngine.Core.startScene(nextLevel);
};

MyLevel.prototype.initialize = function () {
    var sceneParser = new SceneFileParser(this.kSceneFile);

    // Step A: Read in the camera
    this.mCamera = sceneParser.parseCamera();

    // Step B: Read all the squares
    sceneParser.parseSquares(this.mSqSet);

    // now start the bg music ...
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyLevel.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: draw all the squares
    var i;
    for (i = 0; i < this.mSqSet.length; i++) {
        this.mSqSet[i].draw(this.mCamera.getVPMatrix());
    }
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyLevel.prototype.update = function () {
    // For this very simple game, let's move the first square
    var xform = this.mSqSet[2].getXform();
    var deltaX = 0.05;

    var pinkXform = this.mSqSet[0].getXform();
    pinkXform.incRotationByDegree(50);

    /// Move right and swap ovre
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        //gEngine.AudioClips.playACue(this.kCue);
        xform.incXPosBy(deltaX);
        if (xform.getXPos() > 32) { // this is the right-bound of the window
            console.log('Has ganado!!!');
            gEngine.GameLoop.stop();
        }
    }

    // Step A: test for white square movement
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        //gEngine.AudioClips.playACue(this.kCue);
        xform.incXPosBy(-deltaX);
        if (xform.getXPos() < 14.40) { // this is the left-boundary
            console.log('Has perdido!!!');
            gEngine.GameLoop.stop();
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        //gEngine.AudioClips.playACue(this.kCue);
        xform.incYPosBy(deltaX);
        if (xform.getYPos() > 67) { // this is the up-boundary
            xform.setPosition(20, 55);
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        //gEngine.AudioClips.playACue(this.kCue);
        xform.incYPosBy(-deltaX);
        if (xform.getYPos() < 53) { // this is the up-boundary
            xform.setPosition(20, 65);
        }
    }
};