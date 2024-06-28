import { Scene, WebGLRenderer, Raycaster, Matrix4, Vector3 } from 'three';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';

// #region Raycaster
const raycaster = new Raycaster();
const tempMatrix = new Matrix4();
let selectedObject: any = null;
let initialControllerPosition = new Vector3();
let initialObjectPosition = new Vector3();

export function setupXRControllers(scene: Scene, renderer: WebGLRenderer) {
  const controller1 = renderer.xr.getController(0);
  const controller2 = renderer.xr.getController(1);

  const controllerModelFactory = new XRControllerModelFactory();
  const controllerGrip1 = renderer.xr.getControllerGrip(0);
  controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));

  const controllerGrip2 = renderer.xr.getControllerGrip(1);
  controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));

  scene.add(controller1);
  scene.add(controller2);
  scene.add(controllerGrip1);
  scene.add(controllerGrip2);

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
          const deltaPosition = new Vector3().subVectors(controller.position, initialControllerPosition);
          selectedObject.position.addVectors(initialObjectPosition, deltaPosition);
      }
  };

  const handleFirstController = () => handleController(controller1);
  const handleSecondController = () => handleController(controller2);

  controller1.addEventListener('selectstart', onSelectStart);
  controller1.addEventListener('selectend', onSelectEnd);
  controller2.addEventListener('selectstart', onSelectStart);
  controller2.addEventListener('selectend', onSelectEnd);

  controller1.addEventListener('select', (event: any) => onSelectMove(event.target));
  controller2.addEventListener('select', (event: any) => onSelectMove(event.target));

  return { handleFirstController, handleSecondController };
}
