
// Each branch is defined by the formulas: x =  begin.x + branchLength * cos(angle), y = begin.y + branchLength * sin(angle)
class Branch{

    constructor(begin, branchLength, lengthRatio, angle, angleVar, color, branchWidth, branchWidthRatio, parent, maxFractalLevel, leafLevel, leafSeason, leafDensity, leafSize, removed) {
        // Starting point of the branch
        this.begin = begin;
        // Lenght of the branch
        this.branchLength = branchLength;
        // Ratio between branches' lengths
        this.lengthRatio = lengthRatio;
        // Angle of the branch
        this.angle = angle;
        // Angle variation added in each level
        this.angleVar = angleVar;
        this.color = color;
        this.branchWidth = branchWidth;
        this.branchWidthRatio = branchWidthRatio;
        this.parent = parent;
        this.maxFractalLevel = maxFractalLevel;

        this.leafLevel = leafLevel;
        this.leafSeason = leafSeason;
        this.leafDensity = leafDensity;
        this.leafSize = leafSize;
        this.removed = removed;

        // End point (calculated with the begin point, the branchLength and the angle)
        this.end = createVector(this.begin.x + this.branchLength * cos(this.angle), this.begin.y - this.branchLength * sin(this.angle));
    }
    
    show() {
        // Display branches

        stroke(this.color);
        strokeWeight(this.branchWidth);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);

        // Display leaves for every object in the this.leaf array
        if (this.leaves && this.leaves.length != 0) {
            this.leaves.forEach(leaf => leaf.show());
        }
        if (this.flowers) {
            this.flowers.forEach(flower => flower.show());
        }
    }

    // Grow branch objects
    grow(direction) {
        
        this.direction = direction;
        
        // Add some more random angle variations
        var angleVarL = randomAngleDeg2Rad(-15,20);
        var angleVarR = randomAngleDeg2Rad(-15,20);

        // Rotate
        if (this.direction === "left"){
            var newAngle = this.angle + this.angleVar + angleVarL 
            // var newIdentifier =   this.identifier + 1;
        } else if (this.direction === "right") {
            var newAngle = this.angle - this.angleVar + angleVarR 
            // var newIdentifier =   this.identifier + 2;
        }
        // Shorthen branch length
        var newLength = this.branchLength * this.lengthRatio;

        // Decrease width in every branch
        var newWidth = this.branchWidth * branchWidthRatio;
        

        // New branch will start at the beginning of the old branch
        var newBranch = new Branch(this.end, newLength, this.lengthRatio, newAngle, this.angleVar, this.color, newWidth, this.branchWidthRatio, this, this.maxFractalLevel, this.leafLevel, this.leafSeason, this.leafDensity, this.leafSize, this.removed);
        return newBranch;

    }

    branch(level) {

        var branches = []; 
        this.level = level;
        
        if (this.parent && this.parent.removed == false){
            this.removed = false;
            this.addFlowers();
            this.addLeaves(this.maxFractalLevel) 
        }
            
        if (this.maxFractalLevel < level) {
            return branches;
        }

        let left  = this.grow("left");
        let right = this.grow("right");
        
        left.direction = "left";
        right.direction = "right";

        branches.push(left, right);
        left.branch(this.level + 1)
        right.branch(this.level + 1)

        this.branches = branches;
        
    }

    addLeaves() {
        if (this.level >= this.leafLevel) {
            var leaves = []
            for (var i = 0; i < this.leafDensity; i++) {
                var variation = 2*this.leafDensity;
                var varx = randomRange(-variation,variation);
                var vary = randomRange(-variation,variation);
                if (this.leafSeason == arraySeasons[0]) {
                    leaves.push(new Leaf(this.end.x + varx, this.end.y + vary, greenColorPalette(),this.leafSize, false));
                } else if (this.leafSeason == arraySeasons[1]) {
                    leaves.push(new Leaf(this.end.x + varx, this.end.y + vary, orangeColorPalette(), this.leafSize, false));
                } else if (this.leafSeason == arraySeasons[3]) {
                    leaves.push(new Leaf(this.end.x + varx, this.end.y + vary, greenColorPalette(), this.leafSize, false));
                } else if  (this.leafSeason == arraySeasons[2]) {
                    leaves.push(new Leaf(this.end.x + varx, this.end.y + vary, orangeColorPalette(), this.leafSize, true));
                }
            this.leaves = leaves;
            }
        }
    }

    addFlowers() {
        var flowers = [];
        if (this.leafSeason == arraySeasons[3]) {
            this.leafDensity = 2;
        
            let width = randomRange(0,30);
            let height = randomRange(0,10);
            let color = flowerColorPalette();
    
            if(this.level == this.maxFractalLevel + 1 || this.level == this.maxFractalLevel) {
                let petals = randomRange(2,6);
            flowers.push(new Flower(this.end.x,this.end.y, width, height, color, petals));
            } 
        }
            this.flowers = flowers;
      }

    // Run functions for each element in the this.branches array
    run(callback) {
        callback(this);
        if(this.branches && this.branches.length) {
          this.branches.forEach(branch => branch.run(callback));
        }
    }

    computeEnd() {
        if(this.begin) {
            this.end = createVector(this.begin.x + this.branchLength * cos(this.angle), this.begin.y - this.branchLength * sin(this.angle));
        }
    }

    updateStartPoints() {
        if(this.parent) {
            this.begin.x = this.parent.end.x;
            this.begin.y = this.parent.end.y;
        }
    
    };

    updateLeavesPositions() {
        let endx = this.end.x;
        let endy = this.end.y;
        let density = this.leafDensity;
        if (this.leaves) {
            this.leaves.forEach(function(leaf) {
                var variation = density*2;
                var varx = randomRange(-variation,variation);
                var vary = randomRange(-variation,variation);
                leaf.x = endx + varx;
                leaf.y = endy + vary;
            })  
        } 
    }

    updateBranchLength() {
        this.updateStartPoints()
        this.branchLength = lengthSlider.value() * pow(this.lengthRatio, this.level);
        this.computeEnd();
        this.updateLeavesPositions();
        this.updateFlowers();
    }
    updateBranchWidth() {
        this.branchWidth = widthSlider.value() * pow(this.branchWidthRatio, this.level);

    }
    updateFractalLevel(newLimit){
        
        // If the newLimit is lower, trim the branches
        this.maxFractalLevel = newLimit;
        if (this.level >= this.maxFractalLevel) {
            this.branches = [];
        // If the newLimit is higher grow more branches
        } else if(this.level < this.maxFractalLevel) {
            // Do it only, when there are no more branches
            if(!this.branches || this.branches && !this.branches.length) {
              this.branch(this.level);
            }
        }
    }

    updateFlowers() {
        let x = this.end.x;
        let y = this.end.y;
        if (this.flowers){
            this.flowers.forEach(function(flower) {
                flower.x = x;
                flower.y = y;   
            });
        }
    }

    remove(){
        if (this.removed == false){
            if (this.leaves){
                this.leaves = [];
            }
            if (this.flowers){
                this.flowers = [];
            }
            this.removed = true;
            removeButton.html("Add leaves/flowers")
            document.getElementById("leaf-size-option").style.display = "none";
        }else{
            this.addLeaves();
            this.addFlowers();
            this.removed = false;
            removeButton.html("Remove leaves/flowers")
            document.getElementById("leaf-size-option").style.display = "block";
        }
    }
}