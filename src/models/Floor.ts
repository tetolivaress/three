import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

import { Mesh, PlaneGeometry, MeshStandardMaterial, TextureLoader, MeshPhongMaterial } from 'three'

const textureLoader = new TextureLoader();
const colorMap = textureLoader.load('texture/roughness.jpg');
// const normalMap = textureLoader.load('texture/normalMap.jpg');
// const roughnessMap = textureLoader.load('texture/roughnessMap.jpg');
// const displacementMap = textureLoader.load('texture/displacementMap.jpg');
// const aoMap = textureLoader.load('texture/aoMap.jpg');

const material = new MeshPhongMaterial()
material.shininess = 30; // For MeshPhongMaterial

const Floor = new Mesh(new PlaneGeometry(15, 15), material)
Floor.rotateX(-Math.PI / 2)
Floor.receiveShadow = true
Floor.castShadow = true

// Floor.material.envMapIntensity = 0
const data = { environment: true, background: true, mapEnabled: false, Floor: true }
const gui = new GUI()

const BoxFolder = gui.addFolder('Floor');
BoxFolder.add(data, 'Floor').onChange((v) => {
  Floor.visible = v
})

export { Floor }
