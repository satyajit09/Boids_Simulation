class food{
    constructor(){
        this.position = createVector(mouseX,mouseY)
        this.lifetime = 300
        this.consumer = false
        this.exists = true;
    }

    finish(boids){
        if(this.consumer == true)this.lifetime--
        else{
            for(let b of boids){
                let d = dist(this.position.x, this.position.y, b.position.x, b.position.y)
                if(d<=10){
                    this.consumer = true
                    break
                }
            }
        }
        if(this.lifetime == 0)this.exists = false
    }

    display(boids){
        if(this.exists == true)this.finish(boids)
        fill("green")
        circle(this.position.x,this.position.y,10)
    }
}

function mousePressed() {
    foods.push(new food())
}