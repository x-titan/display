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
    this.looper = new Loop((deltaT) => {
      this.beforeDraw(deltaT)
      this.draw(deltaT)
      this.afterDraw(deltaT)
    })
    this.camera = new Camera
  }
  beforeDraw(deltaT) { }
  afterDraw(deltaT) { }
  draw(deltaT) {
    const cameraX = this.camera.pos.x - (this.size.x * this.camera.align.x)
    const cameraY = this.camera.pos.y - (this.size.y * this.camera.align.y)
    const context = this.context

    while (!this.childrens.isEmpty()) {
      const chunk = this.childrens.shift().value
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
    return this
  }
  stopLoop() {
    this.looper.pause()
    return this
  }
}