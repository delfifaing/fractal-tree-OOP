class Flower{
    constructor(x, y, width, height, color, petals) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.petals = petals;
    
    

    }

    show() {
        strokeWeight(2)
    
        let fillColor = color(this.color);
        let strokeColor = color(this.color);
        fillColor.setAlpha(150);
        strokeColor.setAlpha(100);
    
        fill(fillColor);
        stroke(strokeColor);
        // ellipse(0, 0, this.height, this.width);
        push()
        
        translate(this.x, this.y);
        for (var i = 0; i < this.petals; i++) {
            ellipse(0, 0, this.height, this.width);
            rotate(PI / this.petals);
        }
        // 
        pop()
    }
}