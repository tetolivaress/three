import GUI from "lil-gui";
import { PlaneGeometry, Mesh, MeshPhysicalMaterial, DoubleSide } from "three";

const material = new MeshPhysicalMaterial({
    roughness: 0.5,
    metalness: 0.9,
    clearcoat: 1,
    clearcoatRoughness: 0.5,
    side: DoubleSide
});

const Box = new Mesh(new PlaneGeometry(1, 1, 1), material)
Box.rotateX(-Math.PI / 2)
Box.position.z = 0
Box.position.y = 1

const left = new Mesh(new PlaneGeometry(), material)
left.rotateY(-Math.PI / 2)
left.position.x = -0.5
left.position.z = 0.5

const right = new Mesh(new PlaneGeometry(), material)
right.rotateY(Math.PI / 2)
right.position.x = 0.5
right.position.z = 0.5

const front = new Mesh(new PlaneGeometry(), material)
front.rotateX(Math.PI / 2)
front.position.z = 0.5
front.position.y = 0.5

const back = new Mesh(new PlaneGeometry(), material)
back.rotateX(-Math.PI / 2)
back.position.z = 0.5
back.position.y = -0.5

const sides = [left, right, front, back]

sides.forEach((side: Mesh) => {
  Box.add(side)
})

const gui = new GUI();
const BoxFolder = gui.addFolder('Box');
BoxFolder.add(Box.scale, 'z', .01, 16).name('Height');
BoxFolder.add(Box.scale, 'y', .01, 32).name('Depth');
BoxFolder.add(Box.scale, 'x', .01, 32).name('Width');
BoxFolder.add(Box.position, 'x', -16, 16).name('Position X');
BoxFolder.add(Box.position, 'y', -16, 16).name('Position Y');
BoxFolder.add(Box.position, 'z', -16, 16).name('Position Z');

export { Box }

