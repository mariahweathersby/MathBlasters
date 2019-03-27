import * as THREE from 'three';

import { gameObjectType } from './gameObjectTypes.enum';

import GameFloor from './classes/GameFloor';
import Meteor from './classes/Meteor';
import Ship from './classes/Ship';
import TowerAlpha from './classes/TowerAlpha';
import MeteorField from './classes/MeteorField'

const GameObjectFactory = (gameObjType, config = null, amount = 1, offsetX = 0, value = null) => {

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

    const createMeteorGroup = (amount, offsetX) => {
      let meteors = [];
      for( let i = 0; i < amount; i++ ){
          let meteorMesh = new Meteor();
          meteorMesh.position.x = i * offsetX;
          meteors.push( meteorMesh );
      }

      return meteors;
    
    }

    switch(gameObjType) {
      case gameObjectType.GAME_FLOOR:
        return new GameFloor(isConfig);
        break;

      case gameObjectType.METEOR:
        if (amount == 1){
          return new Meteor(isConfig);
          console.log("newmeteor: ")
        } else {
          return createGroup(Meteor, amount, offsetX);
        };
        break;   

      case gameObjectType.METEOR_FIELD:
        return new MeteorField(
          createMeteorGroup(amount, offsetX),
          isConfig
        );
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