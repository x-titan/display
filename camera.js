import { Vector } from "https://x-titan.github.io/vector/vector.js"
export default class Camera {
  constructor(pos) {
    this.pos = pos || Vector.zero()
    this.vel = Vector.zero()
    this.speed = 5
    this.align = Vector.one().div(2)
    // this.align = Vector.zero()
  }
  move(vel) {
    this.pos.add(
      vel.x * this.speed,
      vel.y * this.speed
    )
    return this
  }
  update() {
    this.move(this.vel)
    this.vel.clear()
    return this
  }
  updateVelocity(vel) {
    this.vel.setVec(vel).norm()
    return this
  }
} 