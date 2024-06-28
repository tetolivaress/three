import { DirectionalLight, SpotLight } from 'three'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'


const spotLight = new SpotLight(0xffffff, 500)
spotLight.position.set(10, 20, 20)
spotLight.angle = 0.5
spotLight.penumbra = 0.5
spotLight.castShadow = true
spotLight.shadow.radius = 20
spotLight.shadow.blurSamples = 20
spotLight.shadow.camera.far = 20


const secondLight = spotLight.clone()
secondLight.position.set(-10, -10, 20)

const directionalLight = new DirectionalLight(0xffffff, 1)
directionalLight.position.set(0, 5, 0)
directionalLight.castShadow = true
directionalLight.shadow.radius = 20
directionalLight.shadow.blurSamples = 20
directionalLight.shadow.camera.far = 20

const gui = new GUI()

const spotLightFolder = gui.addFolder('Spot Light')
spotLightFolder.add(spotLight.position, 'x', -50, 50).name('X')
spotLightFolder.add(spotLight.position, 'y', -50, 50).name('Y')
spotLightFolder.add(spotLight.position, 'z', -50, 50).name('Z')
spotLightFolder.add(spotLight, 'angle', 0, Math.PI / 3).name('Angle')
spotLightFolder.add(spotLight, 'penumbra', 0, 1).name('Penumbra')

export { spotLight, directionalLight, secondLight }