
// Leaf class
// A beginning and an end point, displayed as a line joinning them
function Branch(begin, end, color, branchWidth, angle) {
    this.begin = begin;
    this.end = end;
    this.finished = false;
    this.length = end - begin;
    this.angle = angle;
    this.direction;

    this.show = function() {
        stroke(color);
        strokeWeight(branchWidth);
        // strokeCap(ROUND);
        noFill();
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
        
    };

    // Create two additional branch objects
    this.branch = function(direction) {
        this.direction  = direction;
        var dir = p5.Vector.sub(this.end, this.begin);
        angleVarL = randomRange(-0.1,0.9);
        angleVarR = randomRange(-0.1,0.9);
        // Rotate
        if (this.direction === "left"){
            dir.rotate(this.angle );
        } else if (this.direction === "right") {
            dir.rotate( - this.angle );
        }
        // Shorthen branch length
        dir.mult(0.8);
        // Change angle randomly

        // Decrease width in every branch
        var newWidth = branchWidth * 0.65;
        // var newWidth = branchWidth;
        var newEnd = p5.Vector.add(this.end, dir);
        
        // New branch will start at the beginning of the old branch
        var newBranch = new Branch(this.end, newEnd, color, newWidth, angle);
        return newBranch;

    };

    // this.update = function() {
        // 
    // }

}



// Leaf class
function Leaf(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;

    this.show = function() {
        noStroke();
        fill(color);
        arc(this.x, this.y, 5, 10, 0 + 5, PI +5 );

        // strokeCap(ROUND);
        curveTightness(-0.2);
        // strokeWeight(2);
        // noStroke();
        // fill(0);
    }
}
