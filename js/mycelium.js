let theta;
let c;
let a, b;
// let branches = [];
var trees = [];
let treeA, treeB;
let topframe;

function setup(){
    c = createCanvas(windowWidth, windowHeight);
    c.parent(document.getElementById("myceliumCanvas"));
    theta = radians(20);

    a = createVector(width/2, 0);
    b = createVector(width/2, 100);
    // branches[0] = new Branch(a, b);
    // treeA = new Tree(createVector(width/2, 0));
    // trees.push(treeA);
    topframe = window.parent.frames[0];

}

function draw(){
    clear();
    // stroke(255);
    // strokeWeight(3);

    for (i=0;i<trees.length;i++){
        trees[i].grow();
    }

    
}

function mousePressed(){
    trees.push(new Tree(createVector(mouseX, mouseY), createVector(random(-100, 100), random(-150, 50)), color(random(20, 150), random(0, 150), random(150, 255))));
    trees[trees.length-1].germinate();
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function receiveSpore(pos, col){

    // console.log("spore recieved! at: " + pos);
    // var newTree = new Tree(createVector(pos.x, 0));
    // newTree.germinate();
    // trees.push(newTree);
    trees.push(new Tree(createVector(pos.x, 0), createVector(random(-100, 100), random(20, 200)), color(col.levels[0], col.levels[1], col.levels[2])));
    trees[trees.length-1].germinate();

    // trees.push(new Tree(createVector(pos.x, 0)));
}



function Branch(begin, end, tree){
    this.begin = begin;
    this.end = end;
    this.progress = p5.Vector.lerp(this.begin, this.end, 0);
    this.grown = false;
    this.lerp = 0;
    this.newCap = false;
    this.parentTree = tree;

    this.spawnA = function(){
        var dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(radians(random(0, 90)));
        dir.mult(random(0.5, 0.9));
        var newEnd = p5.Vector.add(this.end, dir);
        var a = new Branch(this.end, newEnd, this.parentTree);
        return a;
    };

    this.spawnB = function(){
        var dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(radians(random(0, -90)));
        dir.mult(random(0.5, 0.9));
        var newEnd = p5.Vector.add(this.end, dir);
        var b = new Branch(this.end, newEnd, this.parentTree);
        return b;
    };

    this.show = function(){
        this.progress = p5.Vector.lerp(this.begin, this.end, this.lerp);
        
        line(this.begin.x, this.begin.y, this.progress.x, this.progress.y);
        
        if (this.lerp < 1){
            this.lerp += 0.01;
        } else {
            this.lerp = 1;
        }

        if (this.begin.y > 0 && this.progress.y <= 0 && !this.newCap){
            if (topframe != null){
                topframe.makeCapFromBelow(createVector(this.progress.x, 0), this.parentTree.c);
                this.newCap = true;
            }
            
        }
    };

    this.jitter = function(){
        this.end.x += random(-0.2, 0.2);
        this.end.y += random(-0.2, 0.2);
    };

    this.mouseMagnet = function(){
        let mouseVec = createVector(mouseX, mouseY);
        if (p5.Vector.dist(mouseVec, this.begin) < 50){
            var dir = p5.Vector.sub(mouseVec, this.end);
            dir.mult(0.005);
            this.end.add(dir);
        }
    };

}

function Tree(seedPos, dir, col){
    this.branches = [];
    this.a = seedPos.copy();
    this.dir = dir.copy();
    this.b = p5.Vector.add(this.a, createVector(this.dir.x, this.dir.y));
    this.germinated = false;
    this.c = col
    this.alpha = 255;
    this.decayLerp = 0;
    this.allGrown = false;

    this.germinate = function(){
        this.branches[0] = new Branch(this.a, this.b, this);
        this.germinated = true;
    };

    this.grow = function(){
        push();
            strokeWeight(3);
            stroke(color(red(this.c), green(this.c), blue(this.c), this.alpha));
            for (var i=0;i<this.branches.length;i++){
                this.branches[i].show();
                this.branches[i].jitter();
                if (i%2 == 1){
                    this.branches[i].mouseMagnet();
                }

               
                    if (this.branches[i].lerp >= 1 && !this.branches[i].grown){
                        if (this.branches.length < 50){
                            this.branches.push(this.branches[i].spawnA());
                            this.branches.push(this.branches[i].spawnB());
                        }
                        this.branches[i].grown = true;
                    }
                
            }

            if (!this.allGrown){ // if it's not yet fully grown
                let notYet = false;
                for (var j=0;j<this.branches.length;j++){ // loop through branches to check if they're grown
                    if (!this.branches[j].grown){ // if any branch isn't grown yet
                       notYet = true;
                    }
                }
                if (!notYet){
                    this.allGrown = true; // otherwise, everything is grown, so this tree is grown
                }
                
                
                
            } else { // if the tree has grown
                // this.color = 255;
                this.alpha = 255 - lerp(0, 205, this.decayLerp); // start fading out
                if (this.decayLerp < 1){
                    this.decayLerp += 0.0005;
                }
            }
        pop();
        
    };

}