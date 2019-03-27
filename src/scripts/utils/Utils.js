// http://jsfiddle.net/brunovieira/mb26C/
export const getNonZeroRandomNumber = (max = 1, min = 2) => {
    var random = (Math.random()*min) - max;
    if(random==0) return getNonZeroRandomNumber();
    return random;
};


//https://blackthread.io/blog/promisifying-threejs-loaders/#promises-promises
export const promisifyLoader =  ( loader, onProgress ) => {
  const promiseLoader = ( url ) => {
    return new Promise( ( resolve, reject ) => {
      loader.load( url, resolve, onProgress, reject );
    } );
  };

  return {
    originalLoader: loader,
    load: promiseLoader,
  };

};

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
export const getRandomValInString = (string) => {
  return (
      string.charAt(Math.floor(Math.random() * string.length))
  );
};

// https://www.w3schools.com/howto/howto_js_fullscreen.asp
export const openFullscreen = (elem) => {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
};


//https://stackoverflow.com/questions/3745666/how-to-convert-from-hex-to-ascii-in-javascript
export const stringToHex = (hexString) => {
  var arr = [];
  for (var i = 0, l = hexString.length; i < l; i ++) {
    var hex = Number(hexString.charCodeAt(i)).toString(16);
    arr.push(hex);
  }
  return arr.join('');
};

export const hexToString = (hexCode) => {
  var hex = hexCode.toString();//force conversion
  var str = '';
  for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
};