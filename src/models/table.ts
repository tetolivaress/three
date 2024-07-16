// import { Scene } from 'three'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'

const getTable = async () => {
  return await new GLTFLoader().loadAsync('gltf/table.glb').then((table) => {
    table.scene.position.set(0, 0, 0)
    table.scene.scale.set(1, 1, 1)
    return table.scene
  })
}

export { getTable }
