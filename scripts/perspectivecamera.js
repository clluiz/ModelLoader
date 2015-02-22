'use strict';
var App = App || {};
App.PerspectiveCamera = function( fov, aspectRatio, near, far ) {
    
    this.aspectRatio = aspectRatio; 
    this.fieldOfView = fov !== undefined ? fox : 90;
    this.near = near;
    this.far = far;
    
    this.position = vec3.create();
    this.target = vec3.create();
    this.up = vec3.create();
    
    /**
     * matrix que leva as coordenadas do mundo para as coordenadas
     * da camera
     */
    this.cameraMatrix = mat4.create();
    
    /**
     *
     */
    this.projectionMatrix = mat4.create();
    
    this.updateProjectionMatrix();
};

App.PerspectiveCamera.prototype.lookAt = function( position, target, up ) {

    this.position = position;
    this.target = target;
    this.up = up;
    
    var zaxis = vec3.create();
    var xaxis = vec3.create();
    var yaxis = vec3.create();
    
    vec3.normalize( zaxis, vec3.subtract( zaxis, this.target, this.position ) );
    vec3.normalize( xaxis, vec3.cross( xaxis, this.up, zaxis  ) );
    vec3.cross( yaxis, zaxis, xaxis );    
        
    var orientation = (typeof Float32Array !== 'undefined') ? new Float32Array(16) : new Array(16);
    orientation[0] = xaxis[0];
    orientation[1] = yaxis[0];
    orientation[2] = zaxis[0];
    orientation[3] = 0;
    
    orientation[4] = xaxis[1];
    orientation[5] = yaxis[1];
    orientation[6] = zaxis[1];
    orientation[7] = 0;
        
    orientation[8] = xaxis[2];
    orientation[9] = yaxis[2];
    orientation[10] = zaxis[2];
    orientation[11] = 0;
    
    orientation[12] = 0;
    orientation[13] = 0;
    orientation[14] = 0;
    orientation[15] = 1    
    
    var translation = (typeof Float32Array !== 'undefined') ? new Float32Array(16) : new Array(16); 
    translation[0] = 1;
    translation[1] = 0;
    translation[2] = 0;
    translation[3] = 0;
    
    translation[4] = 0;
    translation[5] = 1;
    translation[6] = 0;
    translation[7] = 0;
    
    translation[8] = 0;
    translation[9] = 0;
    translation[10] = 1;
    translation[11] = 0;
    
    translation[12] = -this.position[0];
    translation[13] = -this.position[1];
    translation[14] = -this.position[2];
    translation[15] = 1;
    
    mat4.multiply( this.cameraMatrix, translation, orientation );
    return this.cameraMatrix;
};

App.PerspectiveCamera.prototype.updateProjectionMatrix = function() {

    mat4.perspective( this.projectionMatrix, this.fieldOfView, this.aspectRatio, this.near, this.far );
};


