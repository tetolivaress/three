import { Object3DEventMap, Group } from 'three'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'

let Table: Group<Object3DEventMap>
new GLTFLoader().load('gltf/table.glb', (gltf) => {
  console.log(gltf);
  gltf.scene.traverse((child) => {
    console.log(child);
    //Table = child.children[0]
  })
    
  // Table.scale.set(.5, .5, .5)
  Table.position.set(0, 0, 0)
  Table.rotation.set(0, 0, 0)
  Table.castShadow = true
  Table.receiveShadow = true
})

export { Table }
