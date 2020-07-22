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
