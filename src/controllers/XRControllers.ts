import RAPIER from '@dimforge/rapier3d-compat'
import { Scene, WebGLRenderer, Raycaster, Matrix4, Vector3, Quaternion, BufferGeometry, LineBasicMaterial, Line, Object3D } from 'three'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js'

// #region Raycaster
const raycaster = new Raycaster()
const tempMatrix = new Matrix4()
let selectedObject: any = null
let initialControllerPosition = new Vector3()
let initialObjectPosition = new Vector3()
let initialControllerQuaternion = new Quaternion()
let initialObjectQuaternion = new Quaternion()
let selectedDynamic: [Object3D, RAPIER.RigidBody][] = []

export function setupXRControllers(scene: Scene, renderer: WebGLRenderer) {
  const controller1 = renderer.xr.getController(0)
  const controller2 = renderer.xr.getController(1)

  const controllerModelFactory = new XRControllerModelFactory()
  const controllerGrip1 = renderer.xr.getControllerGrip(0)
  controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1))

  const controllerGrip2 = renderer.xr.getControllerGrip(1)
  controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2))

  scene.add(controller1)
  scene.add(controller2)
  scene.add(controllerGrip1)
  scene.add(controllerGrip2)

  // #region Ray Visualization
  const createRay = () => {
    const geometry = new BufferGeometry().setFromPoints([new Vector3(0, 0, 0), new Vector3(0, 0, -1)])
    const material = new LineBasicMaterial({ color: 0x808080 }) // Gray color
    return new Line(geometry, material)
  }

  const ray1 = createRay()
  const ray2 = createRay()
  controller1.add(ray1)
  controller2.add(ray2)

  const updateRay = (ray: Line) => {
    ray.scale.z = 10 // Adjust the length of the ray
  }

  // #region Event handling for controllers
  const handleController = (controller: any, dynamicBody: [Object3D, RAPIER.RigidBody][]) => {
    selectedDynamic = dynamicBody
    tempMatrix.identity().extractRotation(controller.matrixWorld)
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld)
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix)

    const ray = controller.children[0]
    updateRay(ray)
  }

  const onSelectStart = (event: any) => {
    const controller = event.target

    tempMatrix.identity().extractRotation(controller.matrixWorld)
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld)
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix)

    const intersects = raycaster.intersectObjects(scene.children)

    if (intersects.length > 0) {
      selectedObject = intersects[0].object
      selectedObject.material.color.set(0x0000ff) // Change color on selection
      initialControllerPosition.copy(controller.position)
      initialObjectPosition.copy(selectedObject.position)
      initialControllerQuaternion.copy(controller.quaternion)
      initialObjectQuaternion.copy(selectedObject.quaternion)
    }

    if (selectedDynamic) {
      selectedDynamic[0][1]
        .setTranslation(new RAPIER.Vector3(selectedObject.position.x, selectedObject.position.y, selectedObject.position.z), true)
    }
  }

  const onSelectEnd = () => {
    if (selectedObject) {
      selectedObject.material.color.set(0x00ff00) // Reset color
      selectedObject = null
    }
  }

  const onSelectMove = (controller: any) => {
    if (selectedObject) {
      const deltaPosition = new Vector3().subVectors(controller.position, initialControllerPosition)
      selectedObject.position.addVectors(initialObjectPosition, deltaPosition)

      const deltaQuaternion = new Quaternion().multiplyQuaternions(controller.quaternion, initialControllerQuaternion.clone().invert())
      selectedObject.quaternion.multiplyQuaternions(deltaQuaternion, initialObjectQuaternion)
    }
  }

  const handleFirstController = (dynamicBodies: [Object3D, RAPIER.RigidBody][]) => handleController(controller1, dynamicBodies)
  const handleSecondController = (dynamicBodies: [Object3D, RAPIER.RigidBody][]) => handleController(controller2, dynamicBodies)

  controller1.addEventListener('selectstart', onSelectStart)
  controller1.addEventListener('selectend', onSelectEnd)
  controller2.addEventListener('selectstart', onSelectStart)
  controller2.addEventListener('selectend', onSelectEnd)

  controller1.addEventListener('select', (event: any) => onSelectMove(event.target))
  controller2.addEventListener('select', (event: any) => onSelectMove(event.target))

  return { handleFirstController, handleSecondController }
}
