
// Each branch is defined by the formulas: x =  begin.x + branchLength * cos(angle), y = begin.y + branchLength * sin(angle)
class Branch{

    constructor(begin, branchLength, angle, angleVar, color, branchWidth, parent, maxFractalLevel, leafLevel, leafSeason, leafDensity, leafSize) {
        // Starting point of the branch
        this.begin = begin;
        // Lenght of the branch
        this.branchLength = branchLength;
        // Angle of the branch
        this.angle = angle;
        // Angle variation added in each level
        this.angleVar = angleVar;
        this.color = color;
        this.branchWidth = branchWidth;
        this.parent = parent;
        this.maxFractalLevel = maxFractalLevel;

        this.leafLevel = leafLevel;
        this.leafSeason = leafSeason;
        this.leafDensity = leafDensity;
        this.leafSize = leafSize;

        // End point (calculated with the begin point, the branchLength and the angle)
        this.end = createVector(this.begin.x + this.branchLength * cos(this.angle), this.begin.y - this.branchLength * sin(this.angle));
    }
    
    show() {
        // Display branches

        stroke(this.color);
        strokeWeight(this.branchWidth);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);

        // Display leaves for every object in the this.leaf array
        if (this.leaves) {
            this.leaves.forEach(leaf => leaf.show());
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
        var newLength = this.branchLength * 0.8;

        // Decrease width in every branch
        var newWidth = this.branchWidth * 0.65;
        

        // New branch will start at the beginning of the old branch
        var newBranch = new Branch(this.end, newLength, newAngle, this.angleVar, this.color, newWidth, this, this.maxFractalLevel, this.leafLevel, this.leafSeason, this.leafDensity, this.leafSize);
        return newBranch;

    }

    branch(level) {

        var branches = []; 
        this.level = level;
        
        // Add leaves
        this.addLeaves(this.maxFractalLevel) 
        
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
                    leaves.push(new Leaf(this.end.x + varx, this.end.y + vary, greenColorPalette(),this.leafSize));
                } else if (this.leafSeason == arraySeasons[1]) {
                    leaves.push(new Leaf(this.end.x + varx, this.end.y + vary, orangeColorPalette(), this.leafSize));
                } else if (this.leafSeason == arraySeasons[3]) {
                    leaves.push(new Leaf(this.end.x + varx, this.end.y + vary, greenColorPalette(), this.leafSize));
                } else if  (this.leafSeason == arraySeasons[2]) {
                    leaves = [];
                }
            this.leaves = leaves;
            }
        }
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
        var endx = this.end.x;
        var endy = this.end.y;
        var density = this.leafDensity;
        
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
        this.branchLength = lengthSlider.value() * pow(0.8, this.level);
        this.computeEnd();
        this.updateLeavesPositions();

    }


    updateBranchAngle() {
        // Modify angle of all branches, but not the root
        if(this.parent) {
        // if(this.parent && !this.branches || this.branches && this.branches.length != 1) {
            if (this.direction == "left") {
                this.angle = this.parent.angle + angleSlider.value();                
            }
            
            if (this.direction == "right" && this.parent.direction != "left") {
                this.angle = this.parent.angle - angleSlider.value();
            }
            // this.angle = angleSlider.value();
            this.updateStartPoints();
            this.computeEnd();
            
        }                      
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


}

