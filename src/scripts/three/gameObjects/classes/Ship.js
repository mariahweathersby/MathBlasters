
import * as THREE from 'three';

import { gameObjectType } from '../gameObjectTypes.enum';
import { DEFAULT_SHIP_CONFIG as defaultConfig } from '../configs';

export default class Ship extends THREE.Mesh {
  constructor(config = defaultConfig) {
    super();
      this.config = config;

      this.gameObjectType = gameObjectType.SHIP;
      this.geometry = 
        new THREE.BoxGeometry(
          config.WIDTH, 
          config.HEIGHT, 
        );
      this.material = new THREE.MeshBasicMaterial({
        color: 0xee0000,
        wireframe: true
      });

      this.mesh = 
        new THREE.Mesh(this.geometry, this.material);

  }

  move = (keyCode = null) => {
    // REFACTOR = dictinary of methods??
    // REFACTOR = config val not here???
    let thrustSpeed = 0.05;
    let bankSpeed = 0.25;

    let verticalBoundary = 2;
    let horizontalBoundary = 3.5;

    this.position.z -= thrustSpeed;

    switch(keyCode){
      case 'ArrowUp':
        if ( this.position.y <= verticalBoundary )
          // this.position.y += bankSpeed;
          this.rotation.x -= Math.PI / 2
        break;

      case 'ArrowDown':
        if ( this.position.y >= -Math.abs(verticalBoundary) )
          // this.position.y -= bankSpeed;
          this.rotation.x += Math.PI / 2
        break;

      case 'ArrowRight':
      if ( this.position.x <= horizontalBoundary )
        // this.position.x += bankSpeed;
        this.rotation.y -= Math.PI / 2
        break;

      case 'ArrowLeft':
        if ( this.position.x >= -Math.abs(horizontalBoundary) )
          // this.position.x -= bankSpeed;
          this.rotation.y += Math.PI / 2
        break;

    }
    
  }

  shoot = (camera, raycaster) => {
    /*
    let rotationCoord = {
      x: camera.rotation.x,
      y: camera.rotation.y,
      z: camera.rotation.z
    }
    let originCoord = this.position;

    raycaster.ray.direction.copy( direction ).applyEuler(rotationCoord);
    raycaster.ray.origin.copy( this.position );

    let intersections = raycaster.intersectObjects( cubes.children );
    console.log(intersections)
    */
  }




}