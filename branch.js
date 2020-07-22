
// Leaf class
// Each branch is defined by the formulas: x =  begin.x + branchLength * cos(angle), y = begin.y + branchLength * sin(angle)
class Branch{

    constructor(begin, branchLength, angle, color, branchWidth, parent, fractalLevel) {
        // Starting point of the branch
        this.begin = begin;
        // Lenght of the branch
        this.branchLength = branchLength;
        // Angle of the branch
        this.angle = angle;
        this.color = color;
        this.branchWidth = branchWidth;
        this.parent = parent;
        this.fractalLevel = fractalLevel;
        // End point (calculated with the begin point, the branchLength and the angle)
        this.end = createVector(this.begin.x + this.branchLength * cos(this.angle), this.begin.y - this.branchLength * sin(this.angle));
        
   
    }
    
    show() {
        stroke(this.color);
        strokeWeight(this.branchWidth);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    // Grow branch objects
    grow(direction, angleVar) {
        
        this.direction = direction;
        var angleVarL = randomAngleDeg2Rad(-20,20);
        var angleVarR = randomAngleDeg2Rad(-20,20);

        // Rotate
        if (this.direction === "left"){
            var newAngle = this.angle + angleVar + angleVarL 
            // var newIdentifier =   this.identifier + 1;
        } else if (this.direction === "right") {
            var newAngle = this.angle - angleVar + angleVarR 
            // var newIdentifier =   this.identifier + 2;
        }
        // Shorthen branch length
        var newLength = this.branchLength * 0.8;

        // Decrease width in every branch
        var newWidth = this.branchWidth * 0.65;
        
        // Nest parent is the actual branch
        // newParent = this.identifier; 

        // New branch will start at the beginning of the old branch
        var newBranch = new Branch(this.end, newLength, newAngle, this.color, newWidth, this);
        return newBranch;

    };

    branch(limit, level = 0) {
        let branches = [];
        this.level = level;
        
        if (limit <= level) {
            return branches;
        }
        var angleVar= randomAngleDeg2Rad(10, 50);
        let left  = this.grow("left", angleVar);
        let right = this.grow("right", angleVar);
        
        left.direction = "left";
        right.direction = "right";

        branches.push(left, right);
        left.branch(limit, level + 1)
        right.branch(limit, level + 1)

        this.branches = branches;

    }

    // Run funcitons for each element in the array
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
        this.updateStartPoints();
        this.branchLength = lengthSlider.value();
        this.end = createVector(this.begin.x + this.branchLength * cos(this.angle), this.begin.y - this.branchLength * sin(this.angle));
        
    }


    updateBranchAngle() {
        this.updateStartPoints();
        if (this.direction === "left") {
            this.angle = this.parent.angle + angleSlider.value();
        }
        if (this.direction === "right") {
            this.angle = this.parent.angle - angleSlider.value();
        }
        this.end = createVector(this.begin.x + this.branchLength * cos(this.angle), this.begin.y - this.branchLength * sin(this.angle));
    }

}

