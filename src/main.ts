import { sceneRenderer, spotLight, secondLight, Camera } from './utils';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { Floor, Box } from './models';
import { setupXRControllers } from './controllers';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Box3, Vector3 } from 'three';

const { scene, renderer } = sceneRenderer(Camera);

const size = new Box3().setFromObject(Box).getSize(new Vector3());
console.log(size);

// Camera.lookAt(Box.position)

const { handleFirstController, handleSecondController } = setupXRControllers(scene, renderer);

const gui = new GUI();
const BoxFolder = gui.addFolder('Box');
BoxFolder.add(Box.scale, 'x', .01, 32).name('Width').onChange(() => {
  console.log(size)
})

BoxFolder.add(Box.scale, 'z', .01, 16).name('Height');
BoxFolder.add(Box.scale, 'y', .01, 32).name('Depth');

const objects = [Floor, Box, spotLight, secondLight];
scene.add(...objects);

new OrbitControls(Camera, renderer.domElement);

renderer.xr.addEventListener('sessionstart', () => {
  if (renderer.xr.isPresenting) {
    Floor.visible = false;
  }
});

renderer.xr.addEventListener('sessionend', () => {
  Floor.visible = true;
});

const animate = () => {
  renderer.setAnimationLoop(() => {
    
    handleFirstController();
    handleSecondController();

    renderer.render(scene, Camera);
  });
};

animate();
