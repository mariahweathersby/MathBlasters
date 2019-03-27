import '../styles/index.scss';
import * as THREE from 'three';

import SceneManager from './three/SceneManager';
import { DEFAULT_SCENE_CONFIG } from './three/gameObjects/configs'
import ClientManager from './client/ClientManager';

import {openFullscreen} from '../scripts/utils/Utils'

export default class AppManager {
    constructor() {
        this.isMobile = this.isMobileDevice();

        let sceneconfig = JSON.parse(JSON.stringify(DEFAULT_SCENE_CONFIG));
        sceneconfig.userData.isMobile = this.isMobile;

        this.sceneManager = new SceneManager(sceneconfig);
        this.sceneManager.init();

        this.clientManager = new ClientManager(this.isMobile);

    }

    assignEvenListeners = ({el, assignments}) => {
        let elementAssignee = el;

        for (let key in assignments) {
            let currentAssignment = assignments[key];
            el.addEventListener(key, currentAssignment, false)
        }

    }

    bindEventListeners = () => {
        let onPressHoldInterval = null;

        let gameStage = document.getElementById("game-stage-wrapper");
        let startButton = document.getElementById("start");
        let controls = document.getElementsByClassName("control-button");

        let gameStageListeners = {
            el: gameStage,
            assignments: {
                'click': this.updateMath,
                'touchstart': this.updateMath,
                'keydown': this.updateMath
            }
        };

        let startButtonListeners = {
            el: startButton,
            assignments: {
                'click': this.onStart
            }
        }

        let controlListeners = {
            el: controls,
            assignments: {
                'click': this.onKeyDown,
                'touchstart': () => {
                    onPressHoldInterval = setInterval(
                        () => this.onKeyDown(event), 
                        300)
                    ;
                },
                'mouseup': clearTimeout(onPressHoldInterval),
                'touchcancel': clearTimeout(onPressHoldInterval),
                'touchend': clearTimeout(onPressHoldInterval)
            }
        }

        let documentListeners = {
            el: document,
            assignments: {
                'mousemove': this.onMouseMove,
                'keydown': this.onKeyDown
            }
        }

        this.assignEvenListeners(gameStageListeners);
        this.assignEvenListeners(startButtonListeners);
        this.assignEvenListeners(documentListeners);
        window.addEventListener( 'resize', this.onResize, false );

        //REFACTOR - MULTIPLE ELEMENTS
        Array.from(controls).forEach(function(element) {
        
            element.addEventListener('click', this.onKeyDown, false);

            element.addEventListener('touchstart', function(event) {
                onPressHoldInterval = setInterval(() => this.onKeyDown(event), 300);
            });
        
            element.addEventListener('mouseup', function(e) {
                clearTimeout(onPressHoldInterval);
            });
            
            element.addEventListener('touchcancel', function(event) {
                clearTimeout(onPressHoldInterval);
            });
        
            element.addEventListener('touchend', function(event) {
                clearTimeout(onPressHoldInterval);
            });
                  
        }, this);


    }

    isMobileDevice = () => {
        return (
            /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        );
    };

    init = () => {
        let root = document.documentElement;

        if (this.isMobile) { 
            root.classList.add('isMobile');
            this.requestFullScreen(document.documentElement); 
        }

        this.bindEventListeners();
        this.sceneManager.preload();
        this.renderScene();        

    }

    updateMath = () => {
        let sceneObjectHit = this.sceneManager.updateRaycaster();
        if (sceneObjectHit){
            this.clientManager.validateAnswer(sceneObjectHit.destroyVal);
        }

    }

    onKeyDown = (e) => {
        e.preventDefault();
        this.sceneManager.onKeyDown(e);
    }
    
    onMouseMove = (e) => {
        e.preventDefault();
        this.sceneManager.onMouseMove(e);
    }

    onResize = (e) => {
        e.preventDefault();
        this.sceneManager.onResize(e);
    }

    onStart = () => {
        this.clientManager.onStart(3);
        this.sceneManager.sceneStart();

    }

    renderScene = () => {
        requestAnimationFrame(this.renderScene);
        this.sceneManager.update();
    }

    requestFullScreen = (el) => {
        openFullscreen(el)
    }


}