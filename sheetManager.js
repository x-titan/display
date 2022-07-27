import { is, mixin } from "https://x-titan.github.io/utils/index.js"
import { Vector } from "https://x-titan.github.io/vector/vector.js"
import { search } from "https://x-titan.github.io/web-utils/index.js"
import Chunk from "./chunk.js"

const one = Vector.one()
const zero = Vector.zero()

export default class SheetManager {
  sheet
  sheetsize
  tileSize
  buffer = {}
  constructor(sheet, tileSize) {
    if (sheet instanceof Image) {
      this.sheet = sheet
    } else if (is.str(sheet)) {
      this.sheet = search(sheet)
    }
    if (Vector.isVector(tileSize)) {
      this.tileSize = tileSize
    } else {
      this.tileSize = new Vector(8, 8)
    }
    this.sheetsize = new Vector(this.sheet.width, this.sheet.height)
  }
  getTile(pos, size) {
    if (!Vector.isVector(size)) {
      size = one
    }

    const tile = search.new("canvas")
    const ctx = tile.getContext("2d")
    tile.width = this.tileSize.x * size.x
    tile.height = this.tileSize.y * size.y
    ctx.drawImage(
      this.sheet,               // image
      pos.x * this.tileSize.x,  // sx
      pos.y * this.tileSize.y,  // sy
      tile.width,               // sw
      tile.height,              // sh
      0,                        // dx
      0,                        // dy
      tile.width,               // dw
      tile.height               // dh
    )
  }
  getChunk(spos, ssize, pos) {
    spos =spos.clone().calc("mul", this.tileSize)
    ssize = ssize.clone().calc("mul", this.tileSize)
    const chunk = new Chunk(pos, ssize)
    chunk.drawImage(
      this.sheet,
      spos,
      ssize,
      pos,
      ssize
    )
    return chunk
  }
}