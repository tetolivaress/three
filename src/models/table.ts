import { Scene } from 'three'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'

const getTable = (scene: Scene) => {
  new GLTFLoader().load('gltf/table.glb', (gltf) => {
    const table = gltf.scene
    table.position.set(0, 0, 0)
    scene.add(table)
  })
}

export { getTable }
