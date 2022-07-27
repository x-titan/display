import { Vector, vec } from "https://x-titan.github.io/vector/vector.js"
import { is, each } from "https://x-titan.github.io/utils/index.js"
import { search, styler } from "https://x-titan.github.io/web-utils/index.js"
import SheetManager from "../sheetManager.js"
import Chunk from "../chunk.js"
import Camera from "../camera.js"
import Display from "../display.js"

const game = new Display("#gameDisplay1")
const keyStates = { KeyA: false, KeyD: false }
const movingKeys = new Set(["KeyA", "KeyD"])
globalThis.addEventListener("keydown", (ev) => {
  if (movingKeys.has(ev.code)) {
    keyStates[ev.code] = true
  }
})
globalThis.addEventListener("keyup", (ev) => {
  if (movingKeys.has(ev.code)) {
    keyStates[ev.code] = false
  }
})

SheetManager
  .load("/gameEx1/White Sprite sheet.png", vec(16, 16))
  .then((SM) => {
    game.resize(innerWidth, innerHeight)
    // const chunk = SM.getChunk(vec(0, 0), vec(6, 2), vec(0, 0))
    // game.append(chunk)
    game.startLoop()


    const player = new Sprite(vec(0, 0), vec(1, 1), vec(16, 16))
    player.state.animate = true

    const stayChunks = player.state.stayChunks = []
    const movingChunks = player.state.movingChunks = []
    stayChunks.push(SM.getChunk(vec(0, 0), vec(1, 1), vec(0, 0)))
    stayChunks.push(SM.getChunk(vec(1, 0), vec(1, 1), vec(0, 0)))
    stayChunks.push(SM.getChunk(vec(2, 0), vec(1, 1), vec(0, 0)))
    stayChunks.push(SM.getChunk(vec(3, 0), vec(1, 1), vec(0, 0)))

    movingChunks.push(SM.getChunk(vec(0, 1), vec(1, 1), vec(0, 0)))
    movingChunks.push(SM.getChunk(vec(1, 1), vec(1, 1), vec(0, 0)))
    movingChunks.push(SM.getChunk(vec(2, 1), vec(1, 1), vec(0, 0)))
    movingChunks.push(SM.getChunk(vec(3, 1), vec(1, 1), vec(0, 0)))
    movingChunks.push(SM.getChunk(vec(4, 1), vec(1, 1), vec(0, 0)))
    movingChunks.push(SM.getChunk(vec(5, 1), vec(1, 1), vec(0, 0)))

    let lastAnimatedTime = 0
    game.beforeDraw = () => {
      game.clear()
    }
    game.afterDraw = (deltaT) => {
      lastAnimatedTime += deltaT
      if (lastAnimatedTime >= player.animationTime) {
        lastAnimatedTime = 0
        player.nextChunk()
      }
      if (keyStates.KeyA || keyStates.KeyD) {
        player.changeStateChunks("movingChunks")
        if (keyStates.KeyA) {
          player.state.reverseX = true
          player.vel.x--
        }
        if (keyStates.KeyD) {
          player.state.reverseX = false
          player.vel.x++
        }
      } else {
        player.changeStateChunks("stayChunks")
      }
      player.update()
      player.draw(game)
    }
  })

class Sprite {
  constructor(pos, size, chunkSize) {
    this.pos = pos || vec(0, 0)
    this.size = size || vec(0, 0)
    this.chunkSize = chunkSize || vec(0, 0)
    this.animationTime = 0.2
    this.vel = vec(0, 0)
    this.state = {
      animate: false,
      stayChunks: [new Chunk(Vector.zero(), this.chunkSize.clone())],
      movingChunks: [new Chunk(Vector.zero(), this.chunkSize.clone())],
      reverseX: false,
      reverseY: false,
      reversedY: false,
      animationChunks: "stayChunks",
    }
    this.chunk = new Chunk(Vector.zero(), this.chunkSize.clone())
    this.chunkIndex = 0
  }
  update() {
    this.pos.addVec(this.vel)
    this.vel.clear()
  }
  changeStateChunks(name) {
    if (this.state.animationChunks === name) return
    this.state.animationChunks = name
    this.chunkIndex = 0
  }
  reverseY(bool) {
    if (this.state.reversedY === bool) {
      return
    }
    this.chunk.clear()
    this.scale(1, -1)
    this.chunk.context.drawImage(this.state[this.state.animationChunks][this.chunkIndex])
    this.state.reversedY = bool
  }
  draw(display) {
    const chunk = this.chunk
    const revX = this.state.reverseX ? -1 : 1
    const revY = this.state.reverseY ? -1 : 1
    chunk.pos.setVec(this.pos)
    display.append(chunk)
  }
  setVelocity(vel) {
    this.vel.setVec(vel)
  }
  updateChunk() {
    this.chunk.context.resetTransform()
    this.chunk.clear()
    const w = this.chunk.size.x
    const h = this.chunk.size.y
    const newChunk = this.state[this.state.animationChunks][this.chunkIndex]
    const scaleX = this.state.reverseX ? -1 : 1 // Set horizontal scale to -1 if flip horizontal
    const scaleY = this.state.reverseY ? -1 : 1 // Set verical scale to -1 if flip vertical
    const posX = this.state.reverseX ? w * -1 : 0 // Set x position to -100% if flip horizontal 
    const posY = this.state.reverseY ? h * -1 : 0;
    this.chunk.context.scale(scaleX, scaleY)
    this.chunk.drawImage(
      newChunk.canvas,
      0,
      0,
      newChunk.size.x,
      newChunk.size.y,
      posX,
      posY,
      w,
      h
    )
  }
  nextChunk() {
    if (!this.state.animate) {
      return
    }
    if (++this.chunkIndex >= this.state[this.state.animationChunks].length) {
      this.chunkIndex = 0
    }
    this.updateChunk()
  }
}