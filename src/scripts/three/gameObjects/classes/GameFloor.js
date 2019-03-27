import * as THREE from 'three';

import { gameObjectType } from '../gameObjectTypes.enum';
import { DEFAULT_GAME_FLOOR_CONFIG as defaultConfig } from '../configs';
import { getNonZeroRandomNumber } from '../../../utils/Utils';

export default class GameFloor extends THREE.Points {
  constructor(config = defaultConfig) {
    super();
      this.config = config;
      this.gameObjectType = gameObjectType.GAME_FLOOR;

      this.geometry = new THREE.PlaneGeometry( 100, 100, 70, 70 )
      this.material = new THREE.PointsMaterial( { 
        color: 0xffffff,
        size: .15, 
      } );

      for (let vert of this.geometry.vertices ){
        vert.z = getNonZeroRandomNumber();
        vert.x -= getNonZeroRandomNumber();
    
      }

  }


}