import { sceneRenderer, spotLight, secondLight, Camera, pointLight } from './utils'
import { Floor, Room, Table, Cube, Box } from './models'
import { setupXRControllers } from './controllers'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { AxesHelper, Clock } from 'three';
import { Physics } from './utils/physics';
import { XRPlanes } from 'three/examples/jsm/Addons.js';

const init = async () => {
  const { scene, renderer } = sceneRenderer(Camera)
  Table().then((table) => scene.add(table))
  // const table = await Table()
  // scene.add(table)
  const { handleFirstController, handleSecondController } = setupXRControllers(scene, renderer)
  const { dynamicBodies, world } = await Physics(Cube)

  // Box.scale.set(.3, .3, .3)

  // add axes helper
  const axesHelper = new AxesHelper(5)
  
  const planes = new XRPlanes(renderer)
  scene.add(planes)




  const objects = [Floor, Cube, Room]
  objects.forEach((object) => {
    object.castShadow = true
    object.receiveShadow = true
  })
  const lights = [spotLight, secondLight, pointLight]
  const sceneObjects = [...objects, ...lights, axesHelper]
  scene.add(...sceneObjects)

  const orbitControls = new OrbitControls(Camera, renderer.domElement)

  renderer.xr.addEventListener('sessionstart', () => {
    if (renderer.xr.isPresenting) {
      Floor.visible = false
      // Room.visible = false
      axesHelper.visible = false
    }
  })

  renderer.xr.addEventListener('sessionend', () => {
    Floor.visible = true
    Room.visible = true
    axesHelper.visible = false
  })

  const clock = new Clock()
  let delta

  const animate = () => {
    renderer.setAnimationLoop(() => {
      delta = clock.getDelta()
      world.timestep = Math.min(delta, 0.1)
      world.step()
      for (let i = 0, n = dynamicBodies.length; i < n; i++) {
        dynamicBodies[i][0].position.copy(dynamicBodies[i][1].translation())
        dynamicBodies[i][0].quaternion.copy(dynamicBodies[i][1].rotation())
      }

      orbitControls.update()
      handleFirstController(dynamicBodies)
      handleSecondController(dynamicBodies)
      renderer.render(scene, Camera)
    })
  }

  animate()
}

init()
