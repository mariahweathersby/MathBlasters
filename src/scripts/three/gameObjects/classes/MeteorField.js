import * as THREE from 'three';

import { gameObjectType } from '../gameObjectTypes.enum';
import { DEFAULT_GAME_FLOOR_CONFIG as defaultConfig } from '../configs';
import { getNonZeroRandomNumber } from '../../../utils/Utils';

export default class MeteorField extends THREE.Group {
    constructor(meteorsInGroup, config = defaultConfig) {
        super();

        this.config = config;
        this.gameObjectType = gameObjectType.METEOR_FIELD;

        this.children = meteorsInGroup;

    }

    animate = () => {
        for (let meteor of this.children){
            meteor.animate()
        }
    }


}