import { is } from "https://x-titan.github.io/utils/index.js"
import { search } from "https://x-titan.github.io/web-utils/index.js"
import { Vector } from "https://x-titan.github.io/vector/vector.js"
import { Loop } from "https://x-titan.github.io/loop/index.js"

export default class Display {
  canvas
  context
  size
  looper
  constructor(source) {
    if (source instanceof HTMLCanvasElement) {
      this.canvas = source
      this.context = source.getContext("2d")
    } else if (source instanceof CanvasRenderingContext2D) {
      this.canvas = source.canvas
      this.context = source
    } else if (
      is.str(source)
      && (source = search(source)) instanceof HTMLCanvasElement
    ) {
      this.canvas = source
      this.context = source.getContext("2d")
    }

    size = new Vector(this.canvas.width, this.canvas.height)
    looper = Loop((deltaT) => (this.draw(deltaT)))
  }
  resize(width, height) {

  }
  draw() {

  }
  startLoop() {
    this.looper.play()
  }
  stopLoop() {
    this.looper.pause()
  }
  isRunning() {
    return this.looper.isRunning()
  }
}