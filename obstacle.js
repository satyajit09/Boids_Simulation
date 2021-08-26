class obstacle{
    constructor(){
      this.position =  createVector(random(width),random(height))
    }
  
    display(){
      fill('#59a985')
      strokeWeight(5)
      stroke('#3a7563')
      circle(this.position.x,this.position.y,40)
    }
  }