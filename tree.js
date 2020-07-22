class Tree {
    
    constructor(begin, rootLength, color, rootWidth, fractalLevel) {
        
    this.begin = begin;
    this.rootLength = rootLength;
    this.color = color;
    this.rootWidth = rootWidth;
    this.fractalLevel = fractalLevel;
    

    this.generateTree();
    }

    initRoot() {
        this.root = new Branch(this.begin, this.rootLength, Math.PI/2, this.color, this.rootWidth, null, this.fractalLevel)
    }
    
    createBranches() {
        this.root.branch(this.fractalLevel);
    }

    show() {
        this.root.run(branch => branch.show());
    }
    map(callback) {
        this.root.run(branch => callback(branch));
      }

    generateTree() {
        this.initRoot();
        this.createBranches();
      }
}