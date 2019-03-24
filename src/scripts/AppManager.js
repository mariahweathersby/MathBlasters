import '../styles/index.scss';

import * as THREE from 'three';

import SceneManager from './three/SceneManager';
import ClientManager from './client/ClientManager';

export default class AppManager {
    constructor() {
        this.isMobile = this.isMobileDevice();
        this.sceneManager = new SceneManager(this.isMobile)
        this.clientManager = new ClientManager(this.isMobile);

    }

    //REFACTOR - too lengthy
    bindEventListeners = () => {
        let onPressHoldInterval = null;
        let gameStage = document.getElementById("game-stage-wrapper");
        let controls = document.getElementsByClassName("control-button");

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

        if (this.isMobile) {
        } else {
            document.addEventListener( 'mousemove', this.onMouseMove, false );
            document.addEventListener( 'keydown', this.onKeyDown, false );
        }

        document.addEventListener( 'resize', this.onResize, false );
        gameStage.addEventListener('click', this.sceneManager.updateRaycaster, false)
    
    }

    isMobileDevice = () => {
        return (
            (typeof window.orientation !== "undefined") || 
            (navigator.userAgent.indexOf('IEMobile') !== -1)
        );
    };

    init = () => {
        let root = document.documentElement;
        if (this.isMobile) { root.classList.add('isMobile') }
        
        this.bindEventListeners();

        this.sceneManager.preload();
        this.sceneManager.sceneStart();

        this.renderScene();

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

    renderScene = () => {
        requestAnimationFrame(this.renderScene);
        this.sceneManager.update();
    }
    

}