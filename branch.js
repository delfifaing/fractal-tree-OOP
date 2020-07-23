
// Leaf class
// Each branch is defined by the formulas: x =  begin.x + branchLength * cos(angle), y = begin.y + branchLength * sin(angle)
class Branch{

    constructor(begin, branchLength, angle, angleVar, color, branchWidth, parent) {
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
        // End point (calculated with the begin point, the branchLength and the angle)
        this.end = createVector(this.begin.x + this.branchLength * cos(this.angle), this.begin.y - this.branchLength * sin(this.angle));
        
    }

    // FIX! Doesn't work
    computeEnd() {
        if(this.begin && this.branchLength) {
            this.end = createVector(this.begin.x + this.branchLength * cos(this.angle), this.begin.y - this.branchLength * sin(this.angle));
        }
    }
    // 
    show() {
        stroke(this.color);
        strokeWeight(this.branchWidth);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    // Grow branch objects
    grow(direction) {
        
        this.direction = direction;
        
        // Add some more random angle variations
        var angleVarL = randomAngleDeg2Rad(-10,20);
        var angleVarR = randomAngleDeg2Rad(-10,20);

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
        var newBranch = new Branch(this.end, newLength, newAngle, this.angleVar, this.color, newWidth, this);
        return newBranch;

    }

    branch(limit, level) {
        var branches = []; 
        this.level = level;
        
        if (limit <= level) {
            return branches;
        }
        let left  = this.grow("left");
        let right = this.grow("right");
        
        left.direction = "left";
        right.direction = "right";

        branches.push(left, right);
        left.branch(limit, level + 1)
        right.branch(limit, level + 1)
    
        this.branches = branches;

    }

    // Run functions for each element in the array
    run(callback) {
        callback(this);
        if(this.branches && this.branches.length) {
          this.branches.forEach(branch => branch.run(callback));
        }
    }


    updateStartPoints() {
        if(this.parent) {
            this.begin.x = this.parent.end.x;
            this.begin.y = this.parent.end.y;
        }
        
        
    };

    updateBranchLength() {
        this.updateStartPoints()
        this.branchLength = lengthSlider.value();
        this.computeEnd();
        // this.end = createVector(this.begin.x + this.branchLength * cos(this.angle), this.begin.y - this.branchLength * sin(this.angle));
        // 
    }


    updateBranchAngle() {
        // Modify angle of all branches, but not the root
        if(this.parent) {
            
            if (this.direction === "left") {
                this.angle = this.parent.angle + this.angleVar + angleSlider.value();
            }
            if (this.direction === "right") {
                this.angle = this.parent.angle - this.angleVar - angleSlider.value();
            }
            this.computeEnd();
            // this.end = createVector(this.begin.x + this.branchLength * cos(this.angle), this.begin.y - this.branchLength * sin(this.angle));
            this.updateStartPoints();
        }                      
    }
    updateFractalLevel(newLimit){
        if (this.level < newLimit) {
            this.branch(newLimit, this.level);
        }
    }

}

