import { PerspectiveCamera } from 'three';

const Camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
Camera.position.z = 5;
Camera.position.y = 2;
Camera.position.x = 1;

export { Camera };
