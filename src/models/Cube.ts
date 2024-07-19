import { BoxGeometry, DoubleSide, Mesh, MeshPhysicalMaterial } from "three";

const geometry = new BoxGeometry(.3, .3, .3)
const material = new MeshPhysicalMaterial({
  roughness: 0.5,
  metalness: 0.9,
  clearcoat: 1,
  clearcoatRoughness: 0.5,
  side: DoubleSide
})

const Cube = new Mesh(geometry, material)
Cube.position.y = 1

export { Cube }
