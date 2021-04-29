import * as THREE from 'three';
import {THREEx, WebAR } from '../vendor/ar.js';
const initARJS = (scene, camera, onRenderFcts, renderer) => {

  var arToolkitSource = new THREEx.ArToolkitSource({
    sourceType : 'webcam'
  });

  arToolkitSource.init(function onReady(){
    onResize();
  });

  window.addEventListener('resize', function(){
    onResize();
  });
  function onResize(){
    arToolkitSource.onResizeElement()
    arToolkitSource.copyElementSizeTo(renderer.domElement)
    if( arToolkitContext.arController !== null ){
      arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
    }
  };

  var arToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: THREEx.ArToolkitContext.baseURL + '../data/data/camera_para.dat',
    detectionMode: 'mono',
    maxDetectionRate: 30,
    canvasWidth: 80*3,
    canvasHeight: 60*3,
  });
  arToolkitContext.init(function onCompleted(){
    camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
  });

  onRenderFcts.push(function(){
    if( arToolkitSource.ready === false ) return
    arToolkitContext.update( arToolkitSource.domElement )
  });

  var markerRoot = new THREE.Group;
  scene.add(markerRoot);
  var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
    type : 'pattern',
    patternUrl : 'images/marker.patt'
  });

  var smoothedRoot = new THREE.Group();
  scene.add(smoothedRoot);
  var smoothedControls = new THREEx.ArSmoothedControls(smoothedRoot, {
    lerpPosition: 0.4,
    lerpQuaternion: 0.3,
    lerpScale: 1,
  });
  onRenderFcts.push(function(delta){
    smoothedControls.update(markerRoot);
    let elements = document.querySelectorAll(".manual-display");
    elements.forEach( (element) => {
      if (element){
        if (artoolkitMarker.object3d.visible) {
          element.style.display = "";
        } else {
          element.style.display = "none";
        }
      }
    });
  });

  return smoothedRoot;
}

export { initARJS };
