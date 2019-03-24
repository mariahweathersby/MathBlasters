import * as THREE from 'three';
import '../../lib/DeviceOrientationControls';

import Camera from './configObjects/classes/Camera'


import { gameObjectType } from './gameObjects/gameObjectTypes.enum'
import GameObjectFactory from './gameObjects/GameObjectFactory'

import { configObjectTypes } from './configObjects/configObjectTypes.enum';


export default class SceneManager {
  constructor(isMobile = false) {
      this.configObjectType = configObjectTypes.SCENE_MANAGER;

      this.userData = {};

      // refactor and put in object??
      this.sceneObjects = [];
      this.sceneObjects.canCollide = [];
      
      this.userData.mouse = new THREE.Vector2();
      this.userData.isMobile = isMobile;
      this.userData.currentVal = null;

      // ==== CAMERA ==== //
      this.camera = new Camera();
      this.camera.position.set(0, 0, 10);
      // ==== CAMERA ==== //

      // ==== RENDERER ==== //
      const gameDiv = document.getElementById('game-stage-wrapper');
      let gameDivWidth = 
        document.getElementById('game-stage-wrapper').clientWidth;

        //REFACTOR - COMING BACK 0
      let gameDivHeight = 
        document.getElementById('game-stage-wrapper').clientHeight;        
        
      this.renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true 
      });
      this.renderer.setSize( 
        gameDivWidth, 
        window.innerHeight,
        false
      );

      this.camera.aspect = gameDivWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setClearColor(0x000000, 1);
      gameDiv.appendChild( this.renderer.domElement );

      // ==== RENDERER ==== //

      // ==== SCENE ==== //
      this.scene = new THREE.Scene();
      // ==== SCENE ==== //

      // ==== RAYCASTER ==== //
      this.raycaster = new THREE.Raycaster();
      this.intersects = [];
      // ==== RAYCASTER ==== //

      // ==== DEVICE ORIENTATION CONTROLS ==== //
      if(this.userData.isMobile){
        this.controls = 
          new THREE.DeviceOrientationControls(this.camera, true);
        this.controls.connect();
      }


      // ==== DEVICE ORIENTATION CONTROLS ==== //


  }

  isCollider = (gameObj) => {
    let objChildren = gameObj.children;

    if(objChildren.length > 1){
      objChildren.forEach(function(childObj) {
        this.sceneObjects.canCollide.push(childObj)
      }, this);
    } else {
      this.sceneObjects.canCollide.push(gameObj)
    }

  }

  preload = () => {
    this.scene.userData.state = 'PRELOAD';

    // ==== PLAYER SHIP ==== //
    this.playerShip = new GameObjectFactory(gameObjectType.SHIP);
    this.playerShip.position.z = 10;
    this.sceneObjects.push(this.playerShip)
    // ==== PLAYER SHIP ==== //

    // ==== TOWER GROUP A ==== //
    let towerGroupA = 
      new GameObjectFactory(gameObjectType.TOWER_ALPHA, null, 2, 6);
    towerGroupA.position.x = -3;
    towerGroupA.position.z = -5;
    this.sceneObjects.push(towerGroupA)
    // ==== TOWER GROUP A ==== //

    // ==== TOWER GROUP B ==== //
    let towerGroupB = 
      new GameObjectFactory(gameObjectType.TOWER_ALPHA, null, 3, 10);
    towerGroupB.position.x = -10;
    towerGroupB.position.z = -20;
    this.sceneObjects.push(towerGroupB)
    // ==== TOWER GROUP B ==== //

    // ==== TOWER GROUP C ==== //
    let towerGroupC = 
      new GameObjectFactory(gameObjectType.TOWER_ALPHA, null, 3, 8);
    towerGroupC.position.x = -8;
    towerGroupC.position.z = -35;
    this.sceneObjects.push(towerGroupC)
    // ==== TOWER GROUP C ==== //

    // ==== TOWER GROUP D - METEOR FIELD ==== //
    let towerGroupD = 
      new GameObjectFactory(gameObjectType.TOWER_ALPHA, null, 3, 6);
    towerGroupD.position.x = -6;
    towerGroupD.position.z = -65;
    this.sceneObjects.push(towerGroupD)

    let meteorGroupD = 
      new GameObjectFactory(gameObjectType.METEOR, null, 3, 2);
    //meteorGroupD.position.x = -6;
    meteorGroupD.position.z = -50;
    this.sceneObjects.push(meteorGroupD)
    this.isCollider(meteorGroupD)

    // ==== TOWER GROUP D - METEOR FIELD ==== //

  }

  sceneStart = () => {
    this.playerShip.add(this.camera)
    for (let gameObj of this.sceneObjects){
      this.scene.add(gameObj)
    };
    this.scene.userData.state = 'ACTIVE';

  }

  sceneEnd = () => {
    
  }



  onResize = () => {
        const WINDOW_WIDTH = window.innerWidth,
            WINDOW_HEIGHT = window.innerHeight,
            ASPECT_RATIO =  WINDOW_WIDTH / WINDOW_HEIGHT;

        this.renderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);

        this.camera.updateProjectionMatrix();
  };

  onMouseMove = (e) => {
    let windowHalf = new THREE.Vector2( 
      window.innerWidth / 2, 
      window.innerHeight / 2 
    );


    // ==== VR CAMERA ROTATION ==== //

	  this.userData.mouse.x = ( e.clientX - windowHalf.x );
    this.userData.mouse.y = ( e.clientY - windowHalf.x );
    this.camera.onMouseMove(e, this.userData.mouse)

    // ==== VR CAMERA ROTATION ==== //

    // ==== RAYCAST CAMERA ROTATION ==== //
    // this.userData.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    // this.userData.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // this.updateRaycaster();
    //this.raycaster.setFromCamera( this.userData.mouse, this.camera );




    // ==== RAYCAST CAMERA ROTATION==== //

    // console.log("raycast x: ", ( event.clientX / window.innerWidth ) * 2 - 1 )
    // console.log("vr x: ", e.clientX - windowHalf.x )

    //this.camera.updateMatrixWorld();


  };

  onKeyDown = (e) => {
    if (e.type == 'click' || 
        e.type == 'mousedown' ||
        e.type == 'touchstart'
      ){
      let keyCode = e.target.getAttribute('data-buttoncode');
      this.playerShip.move(keyCode)
    } else {
      this.playerShip.move(e.code)
    }

  }

  updateRaycaster = () => {
    this.raycaster.set( 
      this.camera.getWorldPosition(), 
      this.camera.getWorldDirection() 
    );

    this.intersects = this.raycaster.intersectObjects( 
      this.scene.children
    );

    for ( var i = 0; i < this.intersects.length; i++ ) {
      this.intersects[ i ].object.material.color.set( 0x00ff00 );
  
    }
    
  }

  update = () => {
    this.renderer.render(this.scene, this.camera);

    if(this.scene.userData.state == 'ACTIVE'){
      this.playerShip.move() 
    }

    if(this.userData.isMobile){
      // console.log("controls: ", this.controls)
      this.controls.update();
    }

  }


}