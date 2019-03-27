import * as THREE from 'three';

import { gameObjectType } from '../gameObjectTypes.enum';
import { DEFAULT_METEOR_CONFIG as defaultConfig } from '../configs';
import { getNonZeroRandomNumber, getRandomValInString } from '../../../utils/Utils';

export default class Meteor extends THREE.Mesh {
  constructor(config = defaultConfig) {
    super();
      this.config = config;
      
      this.gameObjectType = gameObjectType.SHIP;
      this.geometry = 
        new THREE.SphereGeometry(
          this.config.RADIUS, 
          this.config.WIDTH_SEGMENTS,
          this.config.HEIGHT_SEGMENTS 
        );
      
      // if(this.config.materials.parent){
      //   console.log("skip material")
      //   this.material = this.config.material;
      // } else {
      //   this.material = new THREE.MeshBasicMaterial({
      //     color: 0x00ffff,
      //     wireframe: true
      //   });
      // }

      this.material = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true
      });

      this.position.set( ...this.config.COORDINATES);
      this.userData.rotationAxis = getRandomValInString("xyz");
      this.userData.rotationVelocity = (getNonZeroRandomNumber() / 10);

      this.destroyVal = this.config.VALUE;

      this.mesh = 
        new THREE.Mesh(this.geometry, this.material);
        
      this.createChildMesh(this.destroyVal)
  }

  createChildMesh = (meteorDestroyVal) => {
    let _this = this;
    let loader = new THREE.FontLoader();

    loader.load( '../../src/assets/fonts/helvetiker_regular.typeface.json', 
      ( font ) => { 
        let material = null;
        let geometry = new THREE.TextGeometry( String(meteorDestroyVal), {
          font: font,
          size: .75,
          height: .25,
          curveSegments: 1,
        });

        // if(_this.config.materials.destroyVal){
        //   material = _this.config.materials.destroyVal;
        // } else {
        //   material = new THREE.MeshBasicMaterial({
        //     color: 0xffffff,
        //     wireframe: true
        //   });
        // }

        material = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true
        })

        var Newmesh = 
          new THREE.Mesh(geometry, material);
          Newmesh.position.x = -0.25
          Newmesh.position.y = -0.3
        _this.add(Newmesh);

      }
    );
  }

  animate = () => {
    this.rotation[this.userData.rotationAxis] += this.userData.rotationVelocity;
  }


}