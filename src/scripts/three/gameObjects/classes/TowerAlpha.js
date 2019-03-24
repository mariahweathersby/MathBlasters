import * as THREE from 'three';

import { gameObjectType } from '../gameObjectTypes.enum';
import { DEFAULT_TOWER_ALPHA_CONFIG as defaultConfig } from '../configs';

export default class TowerAlpha extends THREE.Mesh {
  constructor(config = defaultConfig) {
    super();
      this.config = config;

      this.gameObjectType = gameObjectType.TOWER_ALPHA;
      this.geometry = 
        new THREE.BoxGeometry(
          config.WIDTH, 
          config.HEIGHT, 
          config.DEPTH
        );
      this.material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
      });

      this.mesh = 
        new THREE.Mesh(this.geometry, this.material);

  }


}