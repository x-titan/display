import { Vector } from "https://x-titan.github.io/vector/vector.js"
import { Loop } from "https://x-titan.github.io/loop/index.js"
import Chunk from "./chunk.js"
import Camera from "./camera.js"

export default class Display extends Chunk {
  camera
  looper
  constructor(source) {
    super(Vector.zero(), Vector.zero())
    if (source) super.setCanvas(source)
    this.looper = new Loop((deltaT) => { this.draw(deltaT) })
    this.camera = new Camera
  }
  draw() {
    const halfWidth = this.size.x / 2
    const halfHeight = this.size.y / 2
    const cameraX = this.camera.pos.x - (this.size.x * this.camera.align.x)
    const cameraY = this.camera.pos.y - (this.size.y * this.camera.align.y)
    const context = this.context
    for (const chunk of this.childrens) {
      const chunkX = parseInt(chunk.pos.x) - cameraX
      const chunkY = parseInt(chunk.pos.y) - cameraY
      context.drawImage(
        chunk.canvas,
        0,
        0,
        chunk.size.x,
        chunk.size.y,
        chunkX,
        chunkY,
        chunk.size.x,
        chunk.size.y
      )
    }
  }
  startLoop() {
    this.looper.play()
  }
  stopLoop() {
    this.looper.play()
  }
}