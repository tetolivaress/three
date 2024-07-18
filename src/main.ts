import { sceneRenderer, spotLight, secondLight, Camera, pointLight } from './utils'
import { Floor, Box, Room, Table } from './models'
import { setupXRControllers } from './controllers'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { AxesHelper } from 'three';

const init = async () => {
  const { scene, renderer } = sceneRenderer(Camera)
  Table().then((table) => scene.add(table))
  const { handleFirstController, handleSecondController } = setupXRControllers(scene, renderer)

  Box.scale.set(.3, .3, .3)

  // add axes helper
  const axesHelper = new AxesHelper(5)

  const objects = [Floor, Box, Room]
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

  const animate = () => {
    renderer.setAnimationLoop(() => {
      // rotate the box
      Box.rotation.x += 0.01
      Box.rotation.y += 0.01
      orbitControls.update()
      handleFirstController()
      handleSecondController()
      renderer.render(scene, Camera)
    })
  }

  animate()
}

init()
