
const flock = []
const obstacles = []
const foods = []

function setup() {
    createCanvas(1000, 600)

    for (let i = 0; i < 10; i++) {
      obstacles.push(new obstacle())
    }

    for (let i = 0; i < 30; i++) {
      flock.push(new boid())
    }
  }


function draw() {
    background('#3e4a61')
    for (let o of obstacles) {
      o.display()
    }
    
    for (let f of foods) {
      f.display(flock)
    }

    for(let i=0;i<foods.length;i++){
      if ( foods[i].exists == false) { 
        foods.splice(i, 1); 
      }
    }

    for (let b of flock) {
      b.display(flock,obstacles,foods)
    } 
    
  }
