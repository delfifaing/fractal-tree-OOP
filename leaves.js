// Leaf class
class Leaf{
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    show() {
        noStroke();
        fill(this.color);
        arc(this.x, this.y, 5, 10, 0 + 5, PI +5 );

        // strokeCap(ROUND);
        curveTightness(-0.2);
        // strokeWeight(2);
        // noStroke();
        // fill(0);
    }
}
