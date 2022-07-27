import { Vector } from "https://x-titan.github.io/vector/vector.js"

export default class Camera {
  constructor(pos) {
    if (Vector.isVector(Vector)) {
      this.pos = pos.clone()
    } else {
      this.pos = Vector.zero()
    }
    this.speed = 5
  }
  move(vel) {
    this.pos.add(
      vel.x * this.speed,
      vel.y * this.speed
    )
  }
}