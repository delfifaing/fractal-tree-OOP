class Tree {
    
    constructor(begin, rootLength, rootAngle, angleVar, color, rootWidth, maxFractalLevel, leafLevel, leafColor, leafDensity, leafSize) {
                 
        this.begin = begin;
        this.rootLength = rootLength;
        this.rootAngle = rootAngle;
        this.angleVar  = angleVar
        this.color = color;
        this.rootWidth = rootWidth;
        this.maxFractalLevel = maxFractalLevel;
        this.leafLevel = leafLevel;
        this.leafColor = leafColor;
        this.leafDensity = leafDensity;
        this.leafSize = leafSize;
        this.end = createVector(this.begin.x, this.begin.y - this.rootLength);
        

        this.generateTree();
    }

    initRoot() {
        this.root = new Branch(this.begin, this.rootLength, this.rootAngle, this.angleVar, this.color, this.rootWidth, null, this.maxFractalLevel, this.leafLevel, this.leafColor, this.leafDensity, this.leafSize);
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