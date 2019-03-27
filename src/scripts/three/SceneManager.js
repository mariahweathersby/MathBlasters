import * as THREE from 'three';
import '../../lib/DeviceOrientationControls';
import '../../lib/OBJLoader';

import Camera from './configObjects/classes/Camera'
import Cannon from './gameObjects/classes/Cannon';

import { gameObjectType } from './gameObjects/gameObjectTypes.enum'
import GameObjectFactory from './gameObjects/GameObjectFactory'

import { configObjectTypes } from './configObjects/configObjectTypes.enum';
import { DEFAULT_METEOR_CONFIG, DEFAULT_METEOR_COORDINATES } from './gameObjects/configs';
import {DEFAULT_SCENE_CONFIG as defaultConfig} from './gameObjects/configs';
import {hexToString, stringToHex} from '../utils/Utils';


export default class SceneManager {
  constructor(config = defaultConfig) {
      this.camera = new Camera();
      this.raycaster = new THREE.Raycaster();
      this.scene = new THREE.Scene();

      this.configObjectType = configObjectTypes.SCENE_MANAGER;
      this.isMobile = config.userData.isMobile;

      this.materials = config.materials;
      let rendererConfig = {
        alpha: true,
        canvas: document.getElementById('game-stage'),
        antialias: true, 
      }
      this.renderer = new THREE.WebGLRenderer(rendererConfig);
      this.sceneData = config.sceneData;
      this.sceneObjects = config.sceneObjects;
      this.stageObjects = config.stageObjects;
      
      this.state = config.state;

      this.utils = config.sceneUtils;
      this.userData = config.userData;
      this.userData.mouse = new THREE.Vector2();

      this.intersects = [];


  }

  get mouseCoords (){
    return this.userData.mouse;
  }
  set mouseCoords(newCoords){
    this.userData.mouse = newCoords;
  }

  init = () => {
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    const ASPECT_RATIO = WIDTH / HEIGHT;

    this.camera.position.set(0, 0, -0.5);
    this.camera.updateProjectionMatrix();
    this.camera.aspect = ASPECT_RATIO;

    this.renderer.setSize( WIDTH, HEIGHT );

    if(this.isMobile){
      this.controls = 
        new THREE.DeviceOrientationControls(this.camera, true);
      this.controls.connect();
    }

  }

  isCollider = (gameObj) => {
    let objChildren = gameObj.children;

    if(objChildren.length > 1){
      objChildren.forEach(function(childObj) {
        this.utils.canCollide.push(childObj)
      }, this);
    } else {
      this.utils.canCollide.push(gameObj)
    }

  }

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

  onMouseMove = (e) => {

    let windowHalf = new THREE.Vector2( 
      window.innerWidth / 2, 
      window.innerHeight / 2 
    );

	  this.mouseCoords.x = ( e.clientX - windowHalf.x );
    this.mouseCoords.y = ( e.clientY - windowHalf.x );
    this.camera.onMouseMove(e, this.mouseCoords)

  };

  loadMaterials = () => {
    let materialColors = this.materials.colors;
    for (let color in materialColors){
      let currHex = materialColors[color].hex;
      let newShader = new THREE.MeshBasicMaterial({
          color: currHex, wireframe: true
      })
      
      materialColors[color].material = newShader;
    }
  }

  onResize = () => {
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    const ASPECT_RATIO = WIDTH / HEIGHT;    

    this.renderer.setSize(WIDTH, HEIGHT);
    this.camera.aspect = ASPECT_RATIO;
    this.camera.updateProjectionMatrix();
  };

  loadStageObjects = () => {
    // ==== PLAYER SHIP ==== //
    this.playerShip = new GameObjectFactory(gameObjectType.SHIP);
    this.playerShip.position.z = 0;
    this.stageObjects.push(this.playerShip)
    // ==== PLAYER SHIP ==== //

    // ==== CANNONS ==== //    
    let rightShooter = new Cannon({x: -1, y: -0.62, z: -1.5});
    rightShooter.rotation.y = -.35;
    rightShooter.rotation.x = .15;    
    this.camera.add(rightShooter);

    let leftShooter = new Cannon({x: 1, y: -0.62, z: -1.5});
    leftShooter.rotation.y = .35;
    leftShooter.rotation.x = .15;
    this.camera.add(leftShooter);
    // ==== CANNONS ==== //    

    // ==== STARFIELD ==== //
    let starField = new GameObjectFactory(gameObjectType.GAME_FLOOR);
    starField.position.y = -5;
    starField.position.z = 0;

    starField.rotateX(1.6)
    this.stageObjects.push(starField)
    // ==== STARFIELD ==== //
  

  }

  preload = () => {
    this.loadMaterials();
    this.loadStageObjects();
    this.state = 'PRELOAD';

    for (let i = 1; i <= 9; i++) {
      let newConfig = JSON.parse(JSON.stringify(DEFAULT_METEOR_CONFIG));
      
      newConfig.VALUE = i;
      newConfig.materials.parent = 
        this.materials.colors['blue'].material;
      newConfig.materials.destroyVal = 
        this.materials.colors['white'].material;
      newConfig.COORDINATES = DEFAULT_METEOR_COORDINATES[i.toString()];

      let newMeteor = 
        new GameObjectFactory(gameObjectType.METEOR, newConfig, 1, null, i);
      this.isCollider(newMeteor);
      this.sceneObjects.push(newMeteor);
    }

    this.stageScene()

  }

  stageScene = () => {
    this.playerShip.add(this.camera)
    for (let stageObj of this.stageObjects){
      this.scene.add(stageObj)
    };
    this.state = 'STAGED';

  }

  sceneStart = () => {
    this.playerShip.add(this.camera)
    for (let gameObj of this.sceneObjects){
      this.scene.add(gameObj)
    };
    this.state = 'ACTIVE';
  }

  sceneEnd = () => {
    
  }

  updateRaycaster = () => {

    this.camera.getWorldPosition(),
    this.camera.getWorldDirection() 
  
    this.raycaster.set( 
      this.camera.getWorldPosition(), 
      this.camera.getWorldDirection() 
    );

    this.intersects = this.raycaster.intersectObjects( 
      this.utils.canCollide
    );

    for ( var i = 0; i < this.intersects.length; i++ ) {
      // this.intersects[ i ].object.material.color.set( 0x00ff00 );
      return this.intersects[ i ].object;
    }

    return null
    
  }

  update = () => {

    if(
      this.state == 'ACTIVE' || this.state == 'STAGED' 
    ){

      for (let child of this.sceneObjects){
        if (child.hasOwnProperty('animate')){
          child.animate();
        }
      }

      this.renderer.render(this.scene, this.camera);

      if(this.userData.isMobile){
        this.controls.update();
      }
    }

    if (this.playerShip.position.z <= -120 ){
      this.state = 'END';
    }

  }


}
