import * as THREE from 'three';
import { DEFAULT_CAMERA_CONFIG as defaultConfig } from '../configs';

export default class Camera extends THREE.PerspectiveCamera {
  constructor(config = defaultConfig) {
    super();

    this.aspect = config.ASPECT_RATIO;
    this.far = config.FAR;
    this.fov = config.FOV;
    this.near = config.NEAR;

    this.userData = [];
    this.userData.target = new THREE.Vector2(); 


  }

  onDeviceOrientationChange = (x, y, mouse) => {
    this.userData.target.x = ( 1 - mouse.x ) * 0.002;
    this.userData.target.y = ( 1 - mouse.y ) * 0.002;
    
    this.rotation.x += 0.05 * ( this.userData.target.y - this.rotation.x );
    this.rotation.y += 0.05 * ( this.userData.target.x - this.rotation.y );

  };

  onMouseMove = (e, mouse) => {
    this.userData.target.x = ( 1 - mouse.x ) * 0.002;
    this.userData.target.y = ( 1 - mouse.y ) * 0.002;
    
    this.rotation.x += 0.05 * ( this.userData.target.y - this.rotation.x );
    this.rotation.y += 0.05 * ( this.userData.target.x - this.rotation.y );

  };


}