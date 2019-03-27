import * as THREE from 'three';

import { gameObjectType } from '../gameObjectTypes.enum';
import { DEFAULT_GAME_FLOOR_CONFIG as defaultConfig } from '../configs';

export default class Cannon extends THREE.Mesh {
  constructor(coordinates = {x: 0, y: 0, z: 0}) {
    super();

    this.geometry = new THREE.BoxBufferGeometry(.25, .25, .75);
    this.material = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true} );
    this.mesh = new THREE.Mesh({
        color: 0x00ff00,
        wireframe: true,
      });

    this.position.x = coordinates.x;
    this.position.y = coordinates.y;
    this.position.z = coordinates.z;


    var shaftInt = new THREE.CylinderBufferGeometry( .045, .05, .5, 10 );
    var cylinder = new THREE.Mesh( shaftInt, this.material );
    cylinder.rotation.x = -1.5;
    cylinder.position.z = -.65;


    var geometryB = new THREE.CylinderBufferGeometry( .1, .1, .75, 6 );
    var cylinderB = new THREE.Mesh( geometryB, this.material );
    cylinder.add(cylinderB);
    cylinderB.position.y = -.425;

    this.add(cylinder);

  }



}

