
p5.disableFriendlyErrors = true;
// ----- Tree variablaes ----
// tree: an array of branches
var tree;
function initVars() {
    minLength    = 20;
    maxLength    = 150;
    trunkLength  = randomRange(minLength, maxLength);
    minLenRatio  = 0.6;
    maxLenRatio  = 1;
    lengthRatio  = randomRange(minLenRatio, maxLenRatio);
    rootAngle    = Math.PI/2;
    minAngle     = 10;
    maxAngle     = 50;
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
    arraySeasons = ["Summer", "Autumn", "Winter", "Spring"]
    leafSeason   = arraySeasons[Math.floor(randomRange(0,arraySeasons.length))];
    minDensity   = 0;
    maxDensity   = 20;
    leafDensity  = Math.floor(randomRange(minDensity,maxDensity));
    arrayLeaf    = ["small", "medium","large"]
    leafSize     = arrayLeaf[Math.floor(randomRange(0,arrayLeaf.length))];

}

function setup() {
    
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent("canvas-div");
    
    
    initVars();
    lengthSlider = createSlider(minLength, maxLength, randomRange(minLength,maxLength));
    lengthSlider.input(updateLenghts);
    lengthSlider.parent("length-slider");

    lengthRatioSlider = createSlider(minLenRatio, maxLenRatio, randomRange(minLenRatio,maxLenRatio), 0.1);
    lengthRatioSlider.input(updateLenRatio);
    lengthRatioSlider.parent("length-ratio-slider");
    

    levelSlider = createSlider(minLevel, maxLevel, fractalLevel);
    levelSlider.input(updateMaxLevel);   
    levelSlider.parent("level-slider"); 
    
    angleSlider = createSlider(maxAngle*Math.PI/180, maxAngle*Math.PI/180, angleVar,0);
    angleSlider.input(updateAngles);   
    angleSlider.parent("angle-slider"); 
    
    dropSeason = createSelect();
    dropSeason.option(arraySeasons[0]); 
    dropSeason.option(arraySeasons[1]); 
    dropSeason.option(arraySeasons[2]); 
    dropSeason.option(arraySeasons[3]);
    dropSeason.input(updateSeason);
    dropSeason.parent("season-dropdown"); 
    
    dropLeafSize = createSelect();
    dropLeafSize.option(arrayLeaf[0]); 
    dropLeafSize.option(arrayLeaf[1]); 
    dropLeafSize.option(arrayLeaf[2]); 
    dropLeafSize.input(updateLeafSize);
    dropLeafSize.parent("leaf-size-dropdown"); 
    

    randomTreeButton = createButton('Create random tree');
    randomTreeButton.mousePressed(randomTree) ;

    randomTree();  
} 

//Generate tree with random variables 
function randomTree() {
    // Re-initialize variables, so that they are random
    initVars();  
    var startPoint  = createVector(width / 2, height);
    tree = new Tree(startPoint, trunkLength, lengthRatio, rootAngle, angleVar, trunkColor, trunkhWidth, fractalLevel, leafLevel, leafSeason, leafDensity, leafSize);
    
    // Set sliders to to the random value to which the tree is initialzed
    lengthSlider.value(trunkLength);
    lengthRatioSlider.value(lengthRatio);
    levelSlider.value(leafLevel);
    angleSlider.value(angleVar);
    
    // Set dropdowns to the random option to which the tree is initialzed
    dropSeason.selected(leafSeason);
    dropLeafSize.selected(leafSize);   
    
    
};

// ----- Functions to modify parameters acording to sliders/dropdowns -----
function updateLenghts() {
    tree.root.run(branch => branch.updateBranchLength());
}

// Change ratio between each branch and its parent branch
function updateLenRatio(){
    tree.root.run(branch => branch.lengthRatio = lengthRatioSlider.value());
    tree.root.run(branch => branch.updateBranchLength());
}

function updateAngles() {
    tree.root.run(branch => branch.updateBranchAngle());
}

function updateMaxLevel() {
    tree.root.run(branch => branch.updateFractalLevel(levelSlider.value()));
}

function updateSeason() {
    tree.root.run(branch => branch.leafSeason = dropSeason.value());
    tree.root.run(branch => branch.addLeaves());
    // If spring, add flowers
    if (dropSeason.value() == arraySeasons[3]) {
        tree.root.run(branch => branch.addFlowers());
    }
    else {
        tree.root.run(branch => branch.flowers = []);
    }
}

function updateLeafSize() {
    tree.root.run(branch => branch.leafSize = dropLeafSize.value());
    tree.root.run(branch => branch.addLeaves());
}


function draw() {

    // Set sliders values to the actual value
    document.getElementById("length-slider-value").innerHTML = lengthSlider.value();
    document.getElementById("length-ratio-value").innerHTML = lengthRatioSlider.value().toFixed(2);
    document.getElementById("angle-slider-value").innerHTML = angleSlider.value().toFixed(2);
    document.getElementById("level-slider-value").innerHTML = levelSlider.value();
    
    

    clear();
    background('black');
    // console.log(tree.root)
    tree.show();

    // for (var i = 0; i < leaves.length; i++) {
        // leaves[i].show();   

    // }

     
}
    
