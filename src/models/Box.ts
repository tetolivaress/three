import { PlaneGeometry, Mesh, MeshStandardMaterial, DoubleSide } from "three";

const material = new MeshStandardMaterial({ side: DoubleSide })

const Box = new Mesh(new PlaneGeometry(1, 1, 1), material)
Box.rotateX(-Math.PI / 2)
Box.receiveShadow = true
Box.castShadow = true
Box.position.z = 0

const left = new Mesh(new PlaneGeometry(), material)
left.rotateY(-Math.PI / 2)
left.receiveShadow = true
Box.castShadow = true
left.position.x = -0.5
left.position.z = 0.5
Box.add(left)

const right = new Mesh(new PlaneGeometry(), material)
right.rotateY(Math.PI / 2)
right.receiveShadow = true
Box.castShadow = true
right.position.x = 0.5
right.position.z = 0.5
Box.add(right)

const front = new Mesh(new PlaneGeometry(), material)
front.rotateX(Math.PI / 2)
front.receiveShadow = true
Box.castShadow = true
front.position.z = 0.5
front.position.y = 0.5
Box.add(front)

const back = new Mesh(new PlaneGeometry(), material)
back.rotateX(-Math.PI / 2)
back.receiveShadow = true
Box.castShadow = true
back.position.z = 0.5
back.position.y = -0.5
Box.add(back)

export { Box }

