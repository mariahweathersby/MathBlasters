import * as THREE from 'three';

export const DEFAULT_SCENE_CONFIG = {
    materials: {
        colors: {
            'green': {
                hex: 0x00ffff,
            },
            'white': {
                hex: 0xffffff,
            },
            'blue': { 
                hex: 0x00ffff,
            }
        },
    },
    sceneUtils: {
        canCollide: [],
        materials: {}
    },
    state: "",
    stageObjects: [],
    sceneObjects: [],
    userData: {
        mouse: null,
        isMobile: false,
    } 
}

export const DEFAULT_GAME_FLOOR_CONFIG = {
    WIDTH: 20,
    HEIGHT: 50,
    WIDTH_SEGMENTS: 50  
}

export const DEFAULT_TOWER_ALPHA_CONFIG = {
    WIDTH: 1,
    HEIGHT: 10,
    DEPTH: 1  
}

export const DEFAULT_SHIP_CONFIG = {
    WIDTH: 1,
    HEIGHT: 1,
    SPEED: 0.0002,
    materials: {
        parent: null,
    }
}

export const DEFAULT_METEOR_CONFIG = {
    RADIUS: .75,
    WIDTH_SEGMENTS: 5,
    HEIGHT_SEGMENTS: 5,
    VALUE: 0,
    COORDINATES: [0, 0, 0],
    materials: {
        parent: null,
        destroyVal: null
    }
}

export const DEFAULT_METEOR_COORDINATES = {
    1: [0,0,-10],
    2: [-2.65, -4.75, -15],
    3: [10,2.75,12],
    4: [15,-3.75,18],
    5: [13,5.75,6],
    6: [8.5,2.30,-10],
    7: [2,-4,13],
    8: [-2,9,15],
    9: [5, -1.0, 0],
}
