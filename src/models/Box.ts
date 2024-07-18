import GUI from "lil-gui";
import { PlaneGeometry, Mesh, MeshPhysicalMaterial, DoubleSide, TextureLoader } from "three";

const material = new MeshPhysicalMaterial({
    roughness: 0.5,
    metalness: 0.9,
    clearcoat: 1,
    clearcoatRoughness: 0.5,
    side: DoubleSide,
    map: new TextureLoader().load('texture/colorMap.jpg')
});

const Box = new Mesh(new PlaneGeometry(1, 1, 1), material)
Box.rotateX(-Math.PI / 2)
Box.receiveShadow = true
Box.castShadow = true
Box.position.z = 0
Box.position.y = 1

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

const gui = new GUI();
const BoxFolder = gui.addFolder('Box');
BoxFolder.add(Box.scale, 'z', .01, 16).name('Height');
BoxFolder.add(Box.scale, 'y', .01, 32).name('Depth');
BoxFolder.add(Box.scale, 'x', .01, 32).name('Width');
BoxFolder.add(Box.position, 'x', -16, 16).name('Position X');
BoxFolder.add(Box.position, 'y', -16, 16).name('Position Y');
BoxFolder.add(Box.position, 'z', -16, 16).name('Position Z');

export { Box }

