import * as THREE from 'three';

import { configObjectTypes } from '../utils/Enums';

import Camera from './classes/Camera';

export default class ConfigObjectFactory {
  constructor(configObjType, config = null) {
    this.configObjType = configObjType;
    this.config = config;
  }
  
  create = () => {
    switch(this.configObjType) {
      case configObjectTypes.CAMERA:
        return new Camera(this.config);
        break;

      default:
        new Error('Invalid configObjectType');
        break;
    }
  };


}