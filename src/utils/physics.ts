import RAPIER from '@dimforge/rapier3d-compat'
import { Mesh, Object3D } from 'three'

export const Physics = async (object: Mesh | Object3D) => {
  await RAPIER.init()
  const gravity = new RAPIER.Vector3(0.0, -9.81, 0.0)
  const world = new RAPIER.World(gravity)
  const dynamicBodies: [Object3D, RAPIER.RigidBody][] = []

  const boxShape = RAPIER.ColliderDesc.cuboid(.3, .3, .3).setMass(1).setRestitution(1)
  const boxBody = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(0, 1, 0).setCanSleep(false))

  world.createCollider(boxShape, boxBody)
  dynamicBodies.push([object, boxBody])

  const floorBody = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(0, -0.1, 0))
  const floorShape = RAPIER.ColliderDesc.cuboid(50, 0.5, 50)
  world.createCollider(floorShape, floorBody)

  return { world, dynamicBodies }
}