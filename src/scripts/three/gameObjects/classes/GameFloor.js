import * as THREE from 'three';

import { gameObjectType } from '../gameObjectTypes.enum';
import { DEFAULT_GAME_FLOOR_CONFIG as defaultConfig } from '../configs';

export default class GameFloor extends THREE.Mesh {
  constructor(config = defaultConfig) {
    super();
      this.config = config;

      this.gameObjectType = gameObjectType.GAME_FLOOR;
      this.geometry = 
        new THREE.PlaneBufferGeometry(
          config.WIDTH, 
          config.HEIGHT, 
          config.WIDTH_SEGMENTS
        );
      this.material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide,
        wireframe: true
      });

      this.mesh = 
        new THREE.Mesh(this.geometry, this.material);

  }


}