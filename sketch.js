
p5.disableFriendlyErrors = true;
// ----- Tree variablaes ----
// tree: an array of branches
var tree;
var leaves = [];
var count = 0;
var trunkLength = randomRange(50,200);
var trunkColor = brownColorPalette();
var trunkhWidth = randomRange(3,10);
var angleVariation = randomAngleDeg2Rad(10,40);
var fractalLevel = Math.floor(randomRange(1,10));

var lengthSlider;
var angleSlider;
var growButton;

function setup() {
    
    createCanvas(window.innerWidth, window.innerHeight);
    
    

    lengthSlider = createSlider(50, 200, trunkLength);
    lengthSlider.input(updateBranches);

    angleSlider = createSlider(20*Math.PI/180, 90*Math.PI/180, angleVariation,0);
    angleSlider.input(updateAngles);    

    levelSlider = createSlider(1, 5, fractalLevel);
    levelSlider.input(updatelLevel);    
    
    
    growButton = createButton('Grow tree');
    // growButton.mousePressed(tree.grow);

    var startPoint = createVector(width / 2, height);
    tree = new Tree(startPoint,lengthSlider.value(), trunkColor, trunkhWidth, levelSlider.value());
}

// ----- Functions to modify parameters acording to sliders -----
function updateBranches() {
    tree.root.run(branch => branch.updateBranchLength());
}

function updateAngles() {
    tree.root.run(branch => branch.updateBranchAngle());
}

function updatelLevel() {
    tree.root.updateFractalLevel(levelSlider.value());
}

function draw() {
    clear();
    background('black');
    // console.log(tree.root)
    tree.show();

    // for (var i = 0; i < leaves.length; i++) {
        // leaves[i].show();   

    // }

     
}
    
