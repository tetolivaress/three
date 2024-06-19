import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { VRButton } from 'three/addons/webxr/VRButton.js';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { RoundedBoxGeometry, XRControllerModelFactory } from 'three/examples/jsm/Addons.js';
import { DragControls } from 'three/examples/jsm/Addons.js';


// #region Scene setup
const scene = new Three.Scene();
const renderer = new Three.WebGLRenderer({ antialias: true });
renderer.xr.enabled = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = Three.PCFShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// document.body.appendChild(VRButton.createButton(renderer));
document.body.appendChild(ARButton.createButton(renderer));

// #region Bottom plane
const bottom = new Three.Mesh(
  new Three.PlaneGeometry(20, 20),
  new Three.MeshToonMaterial({ color: 0xaaaaff, side: Three.DoubleSide })
);
bottom.castShadow = true;
bottom.receiveShadow = true;
bottom.rotation.x = Math.PI / 2;
bottom.position.y = -1.5;
// scene.add(bottom);

// #region Materials and table base
// const tableBaseMaterial = new Three.MeshToonMaterial({ color: 0xaaaaaa });
const tableBaseMaterial = new Three.MeshPhysicalMaterial();
tableBaseMaterial.map = new Three.TextureLoader().load('photo.jpeg');
tableBaseMaterial.roughness = 0.17
tableBaseMaterial.metalness = 0.01
tableBaseMaterial.clearcoat = 0.43
tableBaseMaterial.iridescence = 0.01
tableBaseMaterial.transmission = 1
tableBaseMaterial.thickness = 5.12
tableBaseMaterial.ior = 1.78



const tableBaseGeometry = new RoundedBoxGeometry(10, 0.5, 3, 1, .2);
const tableBase = new Three.Mesh(tableBaseGeometry, tableBaseMaterial);
tableBase.castShadow = true;
tableBase.position.y = 1.5;
scene.add(tableBase);

// #region Table legs
const legGeometry = new RoundedBoxGeometry(0.5, 1.2, 0.5, 1, .13);
const legPositions: [number, number, number][] = [
  [-3.75, 0, 1.15],
  [3.75, 0, 1.15],
  [-3.75, 0, -1.15],
  [3.75, 0, -1.15]
];
legPositions.forEach(pos => {
  const leg = new Three.Mesh(legGeometry, tableBaseMaterial);
  leg.castShadow = true;
  leg.position.set(pos[0], -1.5, pos[2]);
  tableBase.add(leg);
  // scene.add(leg);
});

// #region Lighting
const pointLight = new Three.PointLight(0xffffff, 9, 100);
pointLight.position.set(0, 5, 2);
pointLight.castShadow = true;
scene.add(pointLight);

const secondaryLight = new Three.PointLight(0xffffff, 9, 100);
secondaryLight.position.set(7, 1, 2);
secondaryLight.castShadow = true;
scene.add(secondaryLight);

// #region Camera
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;
camera.position.y = 5;

const gui = new GUI();
// #region add controls for table base material
const tableBaseFolder = gui.addFolder('Table Base Material');
tableBaseFolder.add(tableBaseMaterial, 'roughness', 0, 1);
tableBaseFolder.add(tableBaseMaterial, 'metalness', 0, 1).onChange((value) => {
  console.log(value);
});
tableBaseFolder.add(tableBaseMaterial, 'clearcoat', 0, 1);
tableBaseFolder.add(tableBaseMaterial, 'iridescence', 0, 1);
tableBaseFolder.add(tableBaseMaterial, 'transmission', 0, 1);
tableBaseFolder.add(tableBaseMaterial, 'thickness', 0, 10);
tableBaseFolder.add(tableBaseMaterial, 'ior', 1, 2);
tableBaseFolder.open();

let increasing = true;

// #region Drag controls and orbit controls
new OrbitControls(camera, renderer.domElement);
new DragControls([tableBase], camera, renderer.domElement);

// VR Controllers
const controller1 = renderer.xr.getController(0);
const controller2 = renderer.xr.getController(1);
scene.add(controller1);
scene.add(controller2);

const controllerModelFactory = new XRControllerModelFactory();
const controllerGrip1 = renderer.xr.getControllerGrip(0);
controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
scene.add(controllerGrip1);

const controllerGrip2 = renderer.xr.getControllerGrip(1);
controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
scene.add(controllerGrip2);

// Raycaster
const raycaster = new Three.Raycaster();
const tempMatrix = new Three.Matrix4();
let selectedObject: any = null;
let initialControllerPosition = new Three.Vector3();
let initialObjectPosition = new Three.Vector3();

// #region Event handling for controllers
const handleController = (controller: any) => {
    tempMatrix.identity().extractRotation(controller.matrixWorld);
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
};


const onSelectStart = (event: any) => {
    const controller = event.target;

    tempMatrix.identity().extractRotation(controller.matrixWorld);
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        selectedObject = intersects[0].object;
        selectedObject.material.color.set(0x0000ff); // Change color on selection
        initialControllerPosition.copy(controller.position);
        initialObjectPosition.copy(selectedObject.position);
    }
};

const onSelectEnd = () => {
    if (selectedObject) {
        selectedObject.material.color.set(0x00ff00); // Reset color
        selectedObject = null;
    }
};

const onSelectMove = (controller: any) => {
    if (selectedObject) {
        const deltaPosition = new Three.Vector3().subVectors(controller.position, initialControllerPosition);
        selectedObject.position.addVectors(initialObjectPosition, deltaPosition);
    }
};

controller1.addEventListener('selectstart', onSelectStart);
controller1.addEventListener('selectend', onSelectEnd);
controller2.addEventListener('selectstart', onSelectStart);
controller2.addEventListener('selectend', onSelectEnd);

controller1.addEventListener('select', (event) => onSelectMove(event.target));
controller2.addEventListener('select', (event) => onSelectMove(event.target));

const animate = () => {
  renderer.setAnimationLoop(() => {

    tableBase.rotation.y += 0.005;
    
    // #region animate the table base material metalness, ior and roughness increasing and decreasing smoothly between 0 and 1
    if (increasing) {
      tableBaseMaterial.metalness += 0.01;
      tableBaseMaterial.roughness += 0.005;
      tableBaseMaterial.ior += 0.03;

      if (tableBaseMaterial.metalness >= 1) {
        increasing = false;
      }
    } else {
      tableBaseMaterial.metalness -= 0.01;
      tableBaseMaterial.roughness -= 0.005;
      tableBaseMaterial.ior -= 0.03;
      if (tableBaseMaterial.metalness <= 0) {
        increasing = true;
      }
    }

    handleController(controller1);
    handleController(controller2);

    renderer.render(scene, camera);
  });
};

animate();

// #region Handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
