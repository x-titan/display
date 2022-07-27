export default class Render {
  constructor(){
    this.meshes = []
  }
  push(chunk){
    this.meshes.push(chunk.mesh)
  }
  render(camera){
    for (const mesh of this.meshes) {
      const cameraX = camera.pos.x
    }
  }
 }