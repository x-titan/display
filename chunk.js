import { is, each } from "https://x-titan.github.io/utils/index.js"
import { search } from "https://x-titan.github.io/web-utils/index.js"
import { List } from "https://x-titan.github.io/list/index.js"
import { Vector } from "https://x-titan.github.io/vector/vector.js"

export default class Chunk {
  constructor(pos, size) {
    this.pos = pos || Vector.zero()
    this.setCanvas(search.new("canvas"))
    this.childrens = new List()
    this.name = "unnamed"
    if (!size) size = Vector.zero()
    this.resize(size.x, size.y)
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
  mirror(x, y) {
    const newCanvas = document.createElement("canvas")
    const newContext = newCanvas.getContext("2d")
    const w = newCanvas.width = this.size.x
    const h = newCanvas.height = this.size.y
    const scaleH = x ? -1 : 1
    const scaleV = y ? -1 : 1
    const posX = x ? w * -1 : 0 // Set x position to -100% if flip horizontal 
    const posY = y ? h * -1 : 0;
    ctx.scale(scaleH, scaleV);
    newContext.drawImage(this.canvas, posX, posY, w, h)
    ctx.restore()
  }
  drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) {
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
    this.childrens.clear()
    return this
  }
  clear() {
    this.context.clearRect(0, 0, this.size.x, this.size.y)
    return this
  }
  scale(number) {
    this.resize(this.size.x * 5, this.size.y * 5)
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