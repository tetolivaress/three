import { PerspectiveCamera } from 'three';

const Camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
Camera.position.z = 10;
Camera.position.y = 8;
Camera.position.x = 2;

export { Camera };
