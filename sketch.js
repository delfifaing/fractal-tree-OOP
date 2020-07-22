
p5.disableFriendlyErrors = true;
// ----- Tree variablaes ----
// tree: an array of branches
var tree;
var leaves = [];
var count = 0;
var trunkLength = randomRange(50,200);
var trunkColor = brownColorPalette();
var trunkhWidth = randomRange(3,10);
var trunkAngle = 90 * Math.PI / 180;
var startBranchAngle = randomAngleDeg2Rad(20,70,0);
var fractalLevel = 4;

var lengthSlider;
var angleSlider;
var growButton;

function setup() {
    
    createCanvas(window.innerWidth, window.innerHeight);
    var startPoint = createVector(width / 2, height);
    tree = new Tree(startPoint, trunkLength, trunkColor, trunkhWidth, fractalLevel);

    lengthSlider = createSlider(50, 220, trunkLength);
    lengthSlider.input(tree.updateBranchLength);

    // angleSlider = createSlider(20*Math.PI/180, 70*Math.PI/180, startBranchAngle,0);
    // angleSlider.input(tree.updateBranchAngle);    
    // 
    growButton = createButton('Grow tree');
    // growButton.mousePressed(tree.grow);
    
    
    
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
    
