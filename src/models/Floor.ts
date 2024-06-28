import { Mesh, PlaneGeometry, MeshStandardMaterial } from 'three'

const Floor = new Mesh(new PlaneGeometry(300, 300), new MeshStandardMaterial())
Floor.rotateX(-Math.PI / 2)
Floor.receiveShadow = true
Floor.castShadow = true
// Floor.material.envMapIntensity = 0

export { Floor }
