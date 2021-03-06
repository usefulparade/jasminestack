
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

    

    for (var j=0;j<caps.length;j++){
        caps[j].grow();
        caps[j].show();

        if (caps[j].dead){
            caps.splice(j, 1);
        }
    }

    for (var i=0;i<spores.length;i++){
        spores[i].run();
        if (spores[i].landed()){
            if (bottomframe != null){
                bottomframe.receiveSpore(spores[i].position, spores[i].c);
            }
            makeCap(spores[i].position, spores[i].c);
            spores.splice(i, 1);
        }
    }

}

function mouseClicked(){
    makeSpore(createVector(mouseX, mouseY), createVector(random(-1, 1), random(-1, -1)), this.c = color(random(20, 150), random(0, 150), random(150, 255)));
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    for (var i=0;i<caps.length;i++){
        caps[i].position = createVector(caps[i].position.x, height);
    }
}

let Spore = function(position, velocity, col){
    this.acceleration = createVector(0, 0.05);
    this.velocity = velocity.copy();
    this.position = position.copy();
    this.radius = random(3, 10);
    this.c = col;
    

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
    push();
        stroke(this.c);
        fill(this.c);
        ellipse(this.position.x, this.position.y, this.radius);
    pop();
};

Spore.prototype.landed = function(){
    return this.position.y > windowHeight;
};

function makeSpore(position, velocity, col){
    spores.push(new Spore(position, velocity, col));
};

function makeCap(position, col){
    if (position.x > 0 && position.x < width){
        var cappy = new Cap(createVector(position.x, height), col);
        caps.push(cappy);

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

function makeCapFromBelow(position, col){
    let parsedColor = color(col.levels[0], col.levels[1], col.levels[2]);
    makeCap(position, parsedColor);

}

let Cap = function(position, col){
    this.position = position.copy();
    if (random(0, 1) > 0.95){
        this.size = random(300, 600);
    } else {
        this.size = random(200, 300);
    }
    this.c = col;
    this.alpha = 255;
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
                        var newCol = color(red(this.c)+random(-10, 10), green(this.c), blue(this.c)+random(-10, 10)); // child spores should be a slightly different color
                        makeSpore(p5.Vector.sub(this.position, createVector(0, this.size*0.5)), createVector(random(-2, 2), random(-5, 0)), newCol);
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
    if (this.grown || this.killed){
        this.sizeProgress = this.sizeProgress;
        this.bloom = this.bloom;
        this.alpha = 255 - lerp(255, 0, this.lerp);
    } else {
        this.sizeProgress = lerp(0, this.size, this.lerp);
        this.bloom = lerp(constrain(this.n-2, 3, 100), this.n, this.lerp);
        this.alpha = 255;
    }
    
    this.angle = TWO_PI/this.bloom;
    this.verts = [];

    for (var i=0;i<TWO_PI;i+=this.angle){
        var sx = this.position.x + cos(i) * (this.sizeProgress * this.sizeMod.x);
        var sy = this.position.y + sin(i) * (this.sizeProgress * this.sizeMod.y);
        var vert = new p5.Vector(sx, sy);
        append(this.verts, vert);
    }
    push();
        fill(color(red(this.c), green(this.c), blue(this.c), this.alpha));
        noStroke();
        beginShape();
            for (var j=0;j<this.verts.length;j++){
                vertex(this.verts[j].x, this.verts[j].y);
            }
        endShape(CLOSE);
    pop();


    // ellipse(this.position.x, height, this.sizeProgress);
};
