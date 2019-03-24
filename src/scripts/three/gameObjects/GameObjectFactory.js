import * as THREE from 'three';

import { gameObjectType } from './gameObjectTypes.enum';

import GameFloor from './classes/GameFloor';
import Meteor from './classes/Meteor';
import Ship from './classes/Ship';
import TowerAlpha from './classes/TowerAlpha';

const GameObjectFactory = (gameObjType, config = null, amount = 1, offsetX = 0) => {

    const isConfig = config ? config : "";

    const createGroup = (GameObj, amount, offsetX) => {
      let group = new THREE.Group();
    
      for( let i = 0; i < amount; i++ ){
          let groupObj = new GameObj();
          groupObj.position.x = i * offsetX;
          group.add( groupObj );
    
      }

      return group;
    
    }

    switch(gameObjType) {
      // case gameObjectType.GAME_FLOOR:
      //   return new GameFloor(config);
      //   break;

      case gameObjectType.METEOR:
        if (amount == 1){
          return new Meteor(isConfig);
        } else {
          return createGroup(Meteor, amount, offsetX);
        };
        break;   

        break;  
        
      case gameObjectType.SHIP:
        return new Ship(isConfig);
        break;    
        
      case gameObjectType.TOWER_ALPHA:
        if (amount == 1){
          return new TowerAlpha(isConfig);
        } else {
          return createGroup(TowerAlpha, amount, offsetX);
        };
        break;            

      default:
        new Error('Invalid gameObjectType');
        break;
    }

}

export default GameObjectFactory;