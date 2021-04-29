import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

const initCSS3DRenderer = () => {
  return new CSS3DRenderer();
}

const defaultPowerBi = 'https://app.powerbi.com/view?r=eyJrIjoiNjMwYTExZmUtYTcxMi00YWY4LThhYzYtYzcwMGVkOTM5M2FiIiwidCI6Ijg2MjA4NWUxLTA0NWUtNGQ4Yy04MzJmLTk2ODM3YjAwOGQ2NCJ9';

const htmlString = (url) => `<iframe width="560" height="315"
 src="${url ? url : defaultPowerBi}"
 frameborder="0"
 allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
 allowfullscreen></iframe>`;

var iFrameElement = function (url, x, y, z, rx, ry, rz, h, w) {

  var div = document.createElement('div');
  div.classList.add('manual-display');
  div.style.width = `${h}px`;
  div.style.height = `${w}px`;
  div.style.backgroundColor = '#000';

  var subDiv = document.createElement('div');
  subDiv.id = 'youtube-player';
  subDiv.style.width = `${h}px`;
  subDiv.style.height = `${w}px`;
  div.appendChild(subDiv);

  var iframediv = document.createElement('div');
  iframediv.innerHTML = htmlString(url).trim();
  subDiv.appendChild(iframediv);

  var object = new CSS3DObject(div);
  object.scale.multiplyScalar(1);
  object.position.set(x, y, z);
  object.rotation.set(rx, ry, rz);
  object.name = id;

  return object;
};

export { initCSS3DRenderer, iFrameElement }


// <iframe width="560" height="315"
// src="https://www.youtube.com/embed/pm-R3dvrUZg"
// frameborder="0"
// allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
// allowfullscreen></iframe>
