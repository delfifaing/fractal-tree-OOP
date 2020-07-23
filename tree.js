class Tree {
    
    constructor(begin, rootLength, color, rootWidth, maxFractalLevel) {
        this.begin = begin;
        this.rootLength = rootLength;
        this.color = color;
        this.rootWidth = rootWidth;
        this.maxFractalLevel = maxFractalLevel;
        this.end = createVector(this.begin.x, this.begin.y - this.rootLength);
        this.rootAngle = Math.PI/2;
    

        this.generateTree();
    }

    initRoot() {
        this.root = new Branch(this.begin, this.rootLength, this.rootAngle, angleVariation, this.color, this.rootWidth, null, this.maxFractalLevel, leafLevel);
    }
    
    createBranches() {
        this.root.branch(0);
    }

    show() {
        this.root.run(branch => branch.show());
    }

    generateTree() {
        this.initRoot();
        this.createBranches();
      }

}