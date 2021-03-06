/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine: false, SimpleShader: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame(htmlCanvasID) {
    // The shader for drawing
    this.mShader = null;

    // Step A: Initialize the webGL Context and the VertexBuffer
    gEngine.Core.initializeWebGL(htmlCanvasID);

    // Step B: Create, load and compile the shaders
    this.mShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",        // Path to the VertexShader 
        "src/GLSLShaders/SimpleFS.glsl");       // Path to the FragmentShader

    // Step C: Draw!
    // Step C1: Clear the canvas
    gEngine.Core.clearCanvas([4/100, 70/100, 250/100, 0.9]);

    // Step C2: Activate the proper shader
    this.mShader.activateShader([236/100, 250/100, 4/100, 1]);

    // Step C3: Draw with the currently activated geometry and the activated shader
    var gl = gEngine.Core.getGL();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}