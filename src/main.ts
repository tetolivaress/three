import { sceneRenderer, spotLight, secondLight, Camera } from './utils';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { Floor, Box } from './models';
import { setupXRControllers } from './controllers';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Box3, Clock, Vector3 } from 'three';
import GrabVR from 'grabvr'

const { scene, renderer } = sceneRenderer(Camera);

const size = new Box3().setFromObject(Box).getSize(new Vector3());
console.log(size);

// Camera.lookAt(Box.position)

// const { handleFirstController, handleSecondController } = setupXRControllers(scene, renderer);

const gui = new GUI();
const BoxFolder = gui.addFolder('Box');
BoxFolder.add(Box.scale, 'x', .01, 32).name('Width').onChange(() => {
  console.log(size)
})

BoxFolder.add(Box.scale, 'z', .01, 16).name('Height');
BoxFolder.add(Box.scale, 'y', .01, 32).name('Depth');

const objects = [Floor, Box, spotLight, secondLight];
scene.add(...objects);

const grabVR = new GrabVR()
grabVR.grabableObjects().push(Box);
const controllerGrip0 = renderer.xr.getControllerGrip(0)
const controllerGrip1 = renderer.xr.getControllerGrip(1)
controllerGrip0.addEventListener("connected", (e: any) => {
    controllerGrip0.add(controllerGrip0)
    controllerGrip0.add(controllerGrip1)
    grabVR.add(0, controllerGrip0, e.data.gamepad)
    scene.add(controllerGrip0)
})

const orbitControls = new OrbitControls(Camera, renderer.domElement);

renderer.xr.addEventListener('sessionstart', () => {
  if (renderer.xr.isPresenting) {
    Floor.visible = false;
  }
});

renderer.xr.addEventListener('sessionend', () => {
  Floor.visible = true;
});

const clock = new Clock();

const animate = () => {
  renderer.setAnimationLoop(() => {
    orbitControls.update();
    // handleFirstController();
    // handleSecondController();
    grabVR.update(clock.getDelta());
    renderer.render(scene, Camera);
  });
};

animate();
