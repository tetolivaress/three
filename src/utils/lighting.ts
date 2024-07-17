import { DirectionalLight, SpotLight, PointLight, SpotLightHelper, PointLightHelper } from 'three'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

const spotLight = new SpotLight(0xffffff, 500)
spotLight.position.set(1.36, 1.62, 5.56)
spotLight.angle = 0.5
spotLight.penumbra = 0.5
spotLight.castShadow = true
spotLight.shadow.radius = 20
spotLight.shadow.blurSamples = 20
spotLight.shadow.camera.far = 20
spotLight.distance = 0
spotLight.decay = 2.93

const spotLightHelper = new SpotLightHelper(spotLight)
spotLightHelper.visible = false

const gui = new GUI()

const data = { color: 0xffffff, lightColor: 0xffffff }

const spotLightFolder = gui.addFolder('Spotlight')
spotLightFolder.add(spotLight, 'visible')
spotLightFolder.addColor(data, 'lightColor').onChange(() => {
  spotLight.color.set(data.lightColor)
})
spotLightFolder.add(spotLight, 'intensity', 0, Math.PI * 10)

const spotLightFolderControls = spotLightFolder.addFolder('SpotLight Controls')
spotLightFolderControls.add(spotLight.position, 'x', -10, 10).onChange(() => {
  spotLightHelper.update()
})
spotLightFolderControls.add(spotLight.position, 'y', -10, 10).onChange(() => {
  spotLightHelper.update()
})
spotLightFolderControls.add(spotLight.position, 'z', -10, 10).onChange(() => {
  spotLightHelper.update()
})
spotLightFolderControls.add(spotLight, 'distance', 0, 20).onChange(() => {
  spotLightHelper.update()
})
spotLightFolderControls.add(spotLight, 'decay', 0, 10).onChange(() => {
  spotLightHelper.update()
})
spotLightFolderControls.add(spotLight, 'angle', 0, 1).onChange(() => {
  spotLightHelper.update()
})
spotLightFolderControls.add(spotLight, 'penumbra', 0, 1, 0.001).onChange(() => {
  spotLightHelper.update()
})
spotLightFolderControls.add(spotLightHelper, 'visible').name('Helper Visible')
spotLightFolderControls.close()

const secondLight = spotLight.clone()
secondLight.position.set(-10, -10, 20)

const directionalLight = new DirectionalLight(0xffffff, 1)
directionalLight.position.set(0, 5, 0)
directionalLight.castShadow = true
directionalLight.shadow.radius = 20
directionalLight.shadow.blurSamples = 20
directionalLight.shadow.camera.far = 20

// const spotLightFolder = gui.addFolder('Spot Light')
// spotLightFolder.add(spotLight.position, 'x', -50, 50).name('X')
// spotLightFolder.add(spotLight.position, 'y', -50, 50).name('Y')
// spotLightFolder.add(spotLight.position, 'z', -50, 50).name('Z')
// spotLightFolder.add(spotLight, 'angle', 0, Math.PI / 3).name('Angle')
// spotLightFolder.add(spotLight, 'penumbra', 0, 1).name('Penumbra')

const pointLight = new PointLight(0xffffff, 1);
pointLight.position.set(-5.96, 1.36, -4.92);
pointLight.distance = 13, 46;
pointLight.decay = 0.05;
pointLight.intensity = 3.72;
pointLight.castShadow = true;
pointLight.shadow.radius = 20;
pointLight.shadow.blurSamples = 20;
pointLight.shadow.camera.far = 20;

const pointLightHelper = new PointLightHelper(pointLight)
pointLightHelper.visible = false

const pointLightFolder = gui.addFolder('Point Light')
const pointLightFolderControls = pointLightFolder.addFolder('Point Light Controls')
pointLightFolderControls.add(pointLight.position, 'x', -10, 10).onChange(() => {
  pointLightHelper.update()
})
pointLightFolderControls.add(pointLight.position, 'y', -10, 10).onChange(() => {
  pointLightHelper.update()
})
pointLightFolderControls.add(pointLight.position, 'z', -10, 10).onChange(() => {
  pointLightHelper.update()
})
pointLightFolderControls.add(pointLight, 'distance', 0, 20).onChange(() => {
  pointLightHelper.update()
})
pointLightFolderControls.add(pointLight, 'decay', 0, 10).onChange(() => {
  pointLightHelper.update()
})
pointLightFolderControls.add(pointLight, 'intensity', 0, 10)
pointLightFolderControls.add(pointLightHelper, 'visible').name('Helper Visible')
pointLightFolderControls.close()



export { spotLight, directionalLight, secondLight, pointLight, spotLightHelper }