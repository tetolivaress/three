import { BoxGeometry, MeshStandardMaterial, DoubleSide, Mesh, TextureLoader } from 'three'

const loader = new TextureLoader()
const pictureTexture = new MeshStandardMaterial({ map: loader.load('texture/avila.jpg') })



const geometry = new BoxGeometry(3.1, .1, 5.2)
const material = new MeshStandardMaterial({ color: 0xffffff, side: DoubleSide })

const Room = new Mesh(geometry, material)
Room.castShadow = true
Room.receiveShadow = true

const left = new Mesh(new BoxGeometry(.1, 2.1, 5.2), material)
Room.add(left)
left.position.x = -1.5
left.position.y = 1

const right = new Mesh(new BoxGeometry(.1, 2.1, 5.2), material)
Room.add(right)
right.position.x = 1.5
right.position.y = 1

const back = new Mesh(new BoxGeometry(3.1, 2.1, .1), [
  material,
  material,
  material,
  material,
  pictureTexture,
  material
])
Room.add(back)
back.position.z = -2.5
back.position.y = 1



const ceiling = new Mesh(new BoxGeometry(3.1, .1, 5.2), material)
Room.add(ceiling)
ceiling.position.y = 2


export { Room }
