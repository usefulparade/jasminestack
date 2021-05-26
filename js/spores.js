
let spores;
let caps;
let c;
let counter;
let middleframe, bottomframe;

function setup(){
    c = createCanvas(windowWidth, windowHeight);
    c.parent(document.getElementById('sporeCanvas'))
    
    spores = [];
    caps = [];
    counter = 0;
    middleframe = window.parent.frames[1];
    bottomframe = window.parent.frames[2];
    // frameRate(24);
    
}

function draw(){
    clear();
    counter = (counter + 1) % 1000;
    if (counter == 0){
        if (mouseX <= 10 || mouseX >= width-10 || mouseY <= 10 || mouseY >= height-10){
            // makeSpore(createVector(random(0, windowWidth), random(0, windowHeight*0.5)));
        } else {
            // makeSpore(createVector(mouseX, mouseY));
        }
    }

    for (var i=0;i<spores.length;i++){
        spores[i].run();
        if (spores[i].landed()){
            if (bottomframe != null){
                bottomframe.receiveSpore(spores[i].position);
            }
            makeCap(spores[i].position)
            spores.splice(i, 1);
        }
    }

    for (var j=0;j<caps.length;j++){
        caps[j].grow();
        caps[j].show();

        if (caps[j].dead){
            caps.splice(j, 1);
        }
    }

}

function mouseClicked(){
    makeSpore(createVector(mouseX, mouseY), createVector(random(-1, 1), random(-1, -1)));
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    for (var i=0;i<caps.length;i++){
        caps[i].position = createVector(caps[i].position.x, height);
    }
}

let Spore = function(position, velocity){
    this.acceleration = createVector(0, 0.05);
    this.velocity = velocity.copy();
    this.position = position.copy();
    this.radius = random(3, 10);
    

};

Spore.prototype.run = function(){
    this.update();
    this.display();
};

Spore.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
};

Spore.prototype.display = function(){
    stroke(255);
    fill(255);
    ellipse(this.position.x, this.position.y, this.radius);
};

Spore.prototype.landed = function(){
    return this.position.y > windowHeight;
};

function makeSpore(position, velocity){
    spores.push(new Spore(position, velocity));
};

function makeCap(position){
    if (position.x > 0 && position.x < width){
        var cappy = new Cap(createVector(position.x, height));
        caps.push(cappy);
        // console.log(caps);

        if (caps.length > 15){
            for (var i=0;i<caps.length;i++){
                if (!caps[i].killed){
                    caps[i].kill();
                    break;
                }
               
            }
        }
    }
}

let Cap = function(position){
    this.position = position.copy();
    if (random(0, 1) > 0.95){
        this.size = random(200, 300);
    } else {
        this.size = random(50, 100);
    }
    this.sizeProgress = 0;
    this.sizeMod = createVector(random(0.1, 1), random(0.1, 1));
    this.n = random(3, 10);
    this.angle = TWO_PI/this.n;
    this.bloom = 3;
    this.verts = [];

    this.lerp = 0;
    this.lerpGrowInc = 0.002;
    this.lerpDieInc = 0.0002;
    this.lerpKillInc = 0.002;
    this.lerpIncrement = this.lerpGrowInc;
    this.grown = false;
    this.killed = false;
    this.dead = false;
};

Cap.prototype.grow = function(){
    if (this.grown || this.killed){

        this.lerp -= this.lerpIncrement;

        if (this.lerp <= 0){
            this.dead = true;
        }

    } else {
        if (this.lerp < 1){
            this.lerp += this.lerpIncrement;
        } else {
            this.lerp = 1;
            if (!this.grown){
                
                    if (random(0, caps.length) < constrain(caps.length*0.5, 0, 5)){ // new spores from grown caps get less likely the more caps there are
                        makeSpore(p5.Vector.sub(this.position, createVector(0, this.size*0.5)), createVector(random(-2, 2), random(-5, 0)));
                    }
                
                this.grown = true;
                this.lerpIncrement = this.lerpDieInc;
            }

        }
    }
};

Cap.prototype.kill = function(){
    this.lerp = this.lerp;
    this.killed = true;
    this.lerpIncrement = this.lerpKillInc;
};

Cap.prototype.show = function(){
    
    this.sizeProgress = lerp(0, this.size, this.lerp);
    this.bloom = lerp(this.n-2, this.n, this.lerp);
    this.angle = TWO_PI/this.bloom;
    this.verts = [];

    for (var i=0;i<TWO_PI;i+=this.angle){
        var sx = this.position.x + cos(i) * (this.sizeProgress * this.sizeMod.x);
        var sy = this.position.y + sin(i) * (this.sizeProgress * this.sizeMod.y);
        var vert = new p5.Vector(sx, sy);
        append(this.verts, vert);
    }

    fill(255);
    stroke(255);
    beginShape();
        for (var j=0;j<this.verts.length;j++){
            vertex(this.verts[j].x, this.verts[j].y);
        }
    endShape(CLOSE);


    // ellipse(this.position.x, height, this.sizeProgress);
};
