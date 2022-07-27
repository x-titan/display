import { is, each } from "https://x-titan.github.io/utils/index.js"
import { search } from "https://x-titan.github.io/web-utils/index.js"
import { Vector } from "https://x-titan.github.io/vector/vector.js"

export default class Chunk {
  constructor(pos, size) {
    this.pos = pos || Vector.zero()
    this.setCanvas(search.new("canvas"))
    this.childrens = []
    this.name = "unnamed"
    this.resize(this.size.x, this.size.y)
  }
  append(chunk) {
    if (chunk instanceof Chunk) {
      this.childrens.push(chunk)
    }
    return this
  }
  onupdate() { }
  render() {
    each(this.childrens, (chunk, index) => {
      this.drawChunk(chunk.render())
    })
    return this
  }
  drawChunk(chunk) {
    this.drawImage(
      chunk.canvas,
      0,
      0,
      chunk.size.x,
      chunk.size.y,
      chunk.pos.x,
      chunk.pos.y,
      chunk.size.x,
      chunk.size.y
    )
    return this
  }
  drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) {
    console.log(sx,sy)
    this.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    return this
  }
  resize(width, height) {
    if (!this.size) { this.size = Vector.zero() }
    this.size.x = this.canvas.width = width
    this.size.y = this.canvas.height = height
    return this
  }
  clearChildrens() {
    this.childrens = []
  }
  clear() {
    this.context.clearRect(0, 0, this.size.x, this.size.y)
    return this
  }
  scale(number) {
    this.context.scale(number, number)
    return this
  }
  setCanvas(source) {
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
    } else {
      throw new TypeError("First argument not be supported type")
    }
    this.resize(this.canvas.width, this.canvas.height)
    this.canvas.style.imageRendering = "pixelated"
    this.context.imageSmoothingEnabled = false
    return this
  }
}