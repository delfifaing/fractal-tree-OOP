
p5.disableFriendlyErrors = true;
// ----- Tree variablaes ----
// tree: an array of branches
var tree;
function initVars() {
    minLength    = 20;
    maxLength    = 150;
    trunkLength  = randomRange(minLength,maxLength);
    rootAngle    = Math.PI/2;
    minAngle     = 10;
    maxAngle     = 60;
    angleVar     = randomAngleDeg2Rad(minAngle,maxAngle);
    trunkColor   = brownColorPalette();
    minWidth     = 3;
    maxWidth     = 12;
    trunkhWidth  = randomRange(minWidth,maxWidth);
    minLevel     = 1;
    maxLevel     = 7;
    fractalLevel = Math.floor(randomRange(minLevel,maxLevel));
    // var fractalLevel = 4;
    leafLevel    = 2;
    arrayColors  = ["green", "orange"]
    leafColor    = arrayColors[Math.floor(randomRange(0,arrayColors.length))];
    minDensity   = 0;
    maxDensity   = 10;
    leafDensity  = Math.floor(randomRange(minDensity,maxDensity));
    arrayLeaf    = ["small", "medium","large"]
    leafSize     = arrayLeaf[Math.floor(randomRange(0,arrayLeaf.length))];
    
    
    // lengthSlider;
    // angleSlider;
    // randomTreeButton;
}

function setup() {
    
    createCanvas(window.innerWidth, window.innerHeight);
    
    initVars();
    lengthSlider = createSlider(minLength, maxLength, randomRange(minLength,maxLength));
    lengthSlider.input(updateBranches);


    angleSlider = createSlider(maxAngle*Math.PI/180, maxAngle*Math.PI/180, angleVar,0);
    angleSlider.input(updateAngles);    

    levelSlider = createSlider(minLevel, maxLevel, fractalLevel);
    levelSlider.input(updateMaxLevel);    
    
    randomTreeButton = createButton('Create random tree');
    randomTreeButton.mousePressed(randomTree) ;

    randomTree();
    
    
            
}

// ----- Functions to modify parameters acording to sliders -----
function updateBranches() {
    tree.root.run(branch => branch.updateBranchLength());
}

function updateAngles() {
    tree.root.run(branch => branch.updateBranchAngle());
}

function updateMaxLevel() {
    tree.root.run(branch => branch.updateFractalLevel(levelSlider.value()));
}

function randomTree() {
    // Re-initialize variables, so that they are random
    initVars();
    var startPoint  = createVector(width / 2, height);
    tree = new Tree(startPoint, trunkLength, rootAngle, angleVar, trunkColor, trunkhWidth, fractalLevel, leafLevel, leafColor, leafDensity, leafSize);
      
};

function draw() {
    clear();
    background('black');
    // console.log(tree.root)
    tree.show();

    // for (var i = 0; i < leaves.length; i++) {
        // leaves[i].show();   

    // }

     
}
    
