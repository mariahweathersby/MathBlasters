import * as THREE from 'three';

import { gameObjectType } from '../gameObjectTypes.enum';
import { DEFAULT_METEOR_CONFIG as defaultConfig } from '../configs';

export default class Meteor extends THREE.Mesh {
  constructor(config = defaultConfig) {
    super();
      this.config = config;
      
      this.gameObjectType = gameObjectType.SHIP;
      this.geometry = 
        new THREE.SphereGeometry(
          config.RADIUS, 
          config.WIDTH_SEGMENTS,
          config.HEIGHT_SEGMENTS 
        );
      this.material = new THREE.MeshBasicMaterial({
        color: 0xee0000,
        wireframe: true
      });

      this.position.y = Math.random() * 7;

      this.mesh = 
        new THREE.Mesh(this.geometry, this.material);

  }


}