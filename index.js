import { Vector, vec } from "https://x-titan.github.io/vector/vector.js"
import Chunk from "./chunk.js"
import Display from "./display.js"

const canvas1 = new Display("#canvas1")
const one = Vector.one()
const zero = Vector.zero()

canvas1.resize(innerWidth, innerHeight).startLoop()

const sheetImage = new Image()
sheetImage.onload = () => {
  const sheetChunk = new Chunk(zero.clone(), vec(32, 32))
  sheetChunk.context.fillRect(0,0,16,16)
  sheetChunk.context.fillRect(16,16,16,16)
  sheetChunk.drawImage(sheetImage, 32 * 8, 32 * 1, 32, 32, 0, 0, 32, 32)
  canvas1.append(sheetChunk)
  console.log(sheetChunk.pos)
}
sheetImage.src = "./sheet.png"