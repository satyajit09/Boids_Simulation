const colour = ["red","yellow","orange"]
class boid{

  constructor(){
    this.position = createVector(random(width),random(height))
    this.velocity = p5.Vector.random2D()
    this.speedLimit = 4
    this.species = random([0,1,2])
    this.velocity.setMag(this.speedLimit)
    this.eating = false
  }

  wall(){
    if(this.position.x >= width){
      this.velocity.x += -this.speedLimit
    }
    if(this.position.x <= 0){
      this.velocity.x += this.speedLimit
    }
    if(this.position.y >= height){
      this.velocity.y += -this.speedLimit
    }
    if(this.position.y <= 0){
      this.velocity.y += this.speedLimit
    }
  }

  wander(){
    if(second()%3 == 0){
      let v = createVector(this.velocity.y,-this.velocity.x)
      v.setMag(0.1*random([-1,1]))
      return v
    }
  }

  cohesion(boids){
    let count = 0
    let v = createVector(0,0)
    for(let b of boids){
      let d = dist(this.position.x, this.position.y, b.position.x, b.position.y)
      if(b != this && d<50 && this.species == b.species){
        v.add(b.position)
        count++
      }
    }
    if(count > 0){
      v.div(count)
      v.sub(this.position)
      v.div(100)
    }
    return v
  }

  seperate(boids){
    let v = createVector(0,0)
    for(let b of boids){
      let d = dist(this.position.x, this.position.y, b.position.x, b.position.y)
      if(b != this && d<10){
        v.add(this.position)
        v.sub(b.position)
      }
    }
    v.div(8)
    return v
  }

  align(boids){
    let v = createVector(0,0)
    let count = 0
    for(let b of boids){
      let d = dist(this.position.x, this.position.y, b.position.x, b.position.y)
      if(b != this && d<50 && this.species == b.species){
        v.add(b.velocity)
        count++
      }
    }
    if(count >0){
      v.div(count)
      v.sub(this.velocity)
      v.div(8)
    }
    return v
  }

  avoid(boids){
    let v = createVector(0,0)
    for(let b of boids){
      let d = dist(this.position.x, this.position.y, b.position.x, b.position.y)
      if(b != this && d<20 && this.species !== b.species){
        v.add(this.position)
        v.sub(b.position)
      }
    }
    v.setMag(this.speedLimit)
    return v
  }

  avoidObstacles(obstacles){
    let v = createVector(0,0)
    for(let o of obstacles){
      let d = dist(this.position.x, this.position.y, o.position.x, o.position.y)
      if(d<25){
        v.sub(o.position)
        v.add(this.position)
      }  
    }
    v.limit(this.speedLimit)
    return v
  }

  eat(foods){
    let v = createVector(0,0)
    let md = 10000
    for(let f of foods){
      let d = dist(this.position.x, this.position.y, f.position.x, f.position.y)
      if(d<md){
        md = d
        if(d<100){
          v.mult(0)
          v.add(f.position)
        }
      }
    }
    if(md<100){
      v.sub(this.position)
      v.mult(md-10)
      if(md<10)v.mult(0)
      this.eating = true
    } 
    else this.eating = false
    if(foods.length == 0)this.eating = false
    return v
  }

  update(boids,obstacles,foods){
    this.wall()
    this.velocity.add(this.eat(foods))
    this.velocity.add(this.avoidObstacles(obstacles))
    if(this.eating == false){
      this.velocity.add(this.cohesion(boids))
      this.velocity.add(this.align(boids))
    }
    this.velocity.add(this.avoid(boids))
    this.velocity.add(this.seperate(boids))
    this.velocity.limit(this.speedLimit)
    this.position.add(this.velocity)
  }

  display(boids,obstacles,foods){
    this.update(boids,obstacles,foods)
    noStroke()
    fill(colour[this.species])
    let x = createVector(1,0)
    push()
    translate(this.position.x, this.position.y)
    rotate(x.angleBetween(this.velocity))
    beginShape();
    vertex(5,0);
    vertex(-5,3);
    vertex(-5,-3);
    endShape();
    pop()
  }
} 