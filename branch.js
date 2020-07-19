
// Leaf class
// A beginning and an end point, displayed as a line joinning them
function Branch(begin, end, color, branchWidth, angle) {
    this.begin = begin;
    this.end = end;
    this.finished = false;
    this.length = end-begin;

    this.show = function() {
        stroke(color);
        strokeWeight(branchWidth);
        strokeCap(ROUND);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    };

    // Create two additional branch objects
    this.branch = function(direction) {
        var dir = p5.Vector.sub(this.end, this.begin);
        
        angleVarL = randomRange(-0.1,0.9);
        angleVarR = randomRange(-0.1,0.9);
        // Rotate
        if (direction === "left"){
            dir.rotate(angle - angleVarL);
        } else if (direction === "right") {
            dir.rotate(- angle + angleVarR);
        }

        // Shorthen branch length
        dir.mult(0.8);
        // Change angle randomly
        
        // Decrease width in every branch
        var newWidth = branchWidth * 0.65;
        var newEnd = p5.Vector.add(this.end, dir);
        
        // New branch will start at the beginning of the old branch
        var newBranch = new Branch(this.end, newEnd, color, newWidth, angle);
        return newBranch;

    };

}

// Leaf class
function Leaf(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;

    this.show = function() {
        push();
        noStroke();
        fill(color);
        arc(this.x, this.y, 5, 10, 0 + 5, PI +5 );
    }
}
