import { Scene, WebGLRenderer, VSMShadowMap, PerspectiveCamera } from 'three';
import { XRButton } from 'three/examples/jsm/webxr/XRButton.js'

export const sceneRenderer = (camera: PerspectiveCamera) => {
  const scene = new Scene();
  const renderer = new WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = VSMShadowMap
  document.body.appendChild(renderer.domElement)
  document.body.appendChild(XRButton.createButton(renderer));

  // #region Handle window resizing
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  return { scene, renderer }
}
  