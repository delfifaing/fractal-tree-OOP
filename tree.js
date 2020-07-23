class Tree {
    
    constructor(begin, rootLength, color, rootWidth, fractalLevel) {
        this.begin = begin;
        this.rootLength = rootLength;
        this.color = color;
        this.rootWidth = rootWidth;
        this.fractalLevel = fractalLevel;
        this.end = createVector(this.begin.x, this.begin.y - this.rootLength);
        this.rootAngle = Math.PI/2;
    

        this.generateTree();
        console.log(this.frantalLevel);
    }

    initRoot() {
        this.root = new Branch(this.begin, this.rootLength, this.rootAngle, angleVariation, this.color, this.rootWidth, null, this.fractalLevel)
    }
    
    createBranches() {
        this.root.branch(this.fractalLevel, 0);
    }

    show() {
        this.root.run(branch => branch.show());
    }

    generateTree() {
        this.initRoot();
        this.createBranches();
      }

}