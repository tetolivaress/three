import { sceneRenderer, spotLight, secondLight, Camera, pointLight, spotLightHelper } from './utils'
import { Floor, Box, Room, Table } from './models'
import { setupXRControllers } from './controllers'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

const init = async () => {
  const { scene, renderer } = sceneRenderer(Camera)
  Table().then((table) => scene.add(table))
  const { handleFirstController, handleSecondController } = setupXRControllers(scene, renderer)

  Box.scale.set(.3, .3, .3)

  const objects = [Floor, Box, spotLight, secondLight, pointLight, spotLightHelper, Room]
  scene.add(...objects)

  const orbitControls = new OrbitControls(Camera, renderer.domElement)

  renderer.xr.addEventListener('sessionstart', () => {
    if (renderer.xr.isPresenting) {
      Floor.visible = false
      // Room.visible = false
    }
  })

  renderer.xr.addEventListener('sessionend', () => {
    Floor.visible = true
    Room.visible = true
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
