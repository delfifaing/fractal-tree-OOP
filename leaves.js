// Leaf class
class Leaf{;
    constructor(x, y, color, leafSize) {
        this.x = x;
        this.y = y;
        this.leafDensity = leafDensity
        this.color = color;
        this.leafSize = leafSize;

    }

    show() {
        noStroke();
        fill(this.color);
        if (this.leafSize == arrayLeaf[0]) {
            arc(this.x, this.y, 5, 5, 0 + 5, PI + 5);
        } else if (this.leafSize == arrayLeaf[1]) {
            arc(this.x, this.y, 5, 10, 0 + 5, PI + 5);
        } else if(this.leafSize == arrayLeaf[2]) {
            arc(this.x, this.y, 10, 10, 0+22 , PI + 21);
        }
        
        // strokeCap(ROUND);
        curveTightness(-0.2);
        // strokeWeight(2);
        // noStroke();
        // fill(0);
    }

}
