import { sceneRenderer, spotLight, secondLight, Camera, pointLight, spotLightHelper } from './utils'
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

  const objects = [Floor, Box, spotLight, secondLight, pointLight, spotLightHelper, Room, axesHelper]
  scene.add(...objects)

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
      orbitControls.update()
      handleFirstController()
      handleSecondController()
      renderer.render(scene, Camera)
    })
  }

  animate()
}

init()
