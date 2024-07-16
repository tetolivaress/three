import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; // Corrected import path
import { Object3D } from 'three';
import TableGLB from './table.glb'

export const Table = async (): Promise<Object3D> => {
  const loader = new GLTFLoader();
  const table = await loader.loadAsync(TableGLB);
  table.scene.position.set(0, 0, 0);
  table.scene.scale.set(1, 1, 1);
  return table.scene;
};