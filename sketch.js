
p5.disableFriendlyErrors = true;
// ----- Tree variablaes ----
// tree: an array of branches
var tree = []
var leaves = [];
var count = 0;
var trunkLength = randomRange(50,200);
var trunkColor = brownColorPalette();
var branchWidth = randomRange(3,10);
// var startAngle = randomAngleDeg2Rad(20,70);
var startAngle = 30*Math.PI/180;

// ----- Page element variables ----
var lengthSlider;
var angleSlider;
var growButton;

function setup() {
    // frameRate(10);
    lengthSlider = createSlider(50, 220, trunkLength);
    lengthSlider.input(updateLengths);

    angleSlider = createSlider(20, 70, startAngle);
    angleSlider.input(updateAngles);    
    
    growButton = createButton('Grow tree');
    growButton.mousePressed(grow);
    
    createCanvas(window.innerWidth, innerHeight);

    initTree();
    
}

function initTree() {
    var a = createVector(width / 2, height);
    var b = createVector(width / 2, height - lengthSlider.value());
    var root = new Branch(a, b, trunkColor, branchWidth, angleSlider.value()*Math.PI/180);
    tree[0] = root;    
}

// Add two branches every button click
function grow() {
    // noLoop();
    for (var i = tree.length-1; i >= 0; i--) {
        if (!tree[i].finished) {
            tree.push(tree[i].branch('left'));
            tree.push(tree[i].branch('right'));
        }
        tree[i].finished = true;
    }   
    count ++;

    if (count > 3) {
        for (var i = 0; i < tree.length; i++) {
             if (!tree[i].finished) {
                var leafColor = greenColorPalette();
                // var leafColor2 = greenColorPalette();
                // var leafColor3 = greenColorPalette();

                var leaf = new Leaf(tree[i].end.x,tree[i].end.y,leafColor);
                // var leaf2 = new Leaf(tree[i].end.x+5,tree[i].end.y+2,leafColor2);
                // var leaf3 = new Leaf(tree[i].end.x-2,tree[i].end.y-5,leafColor3);

                leaves.push(leaf);
                // leaves.push(leaf2);
                // leaves.push(leaf3);
            }
        } 
    }    
}

function clearTree() {
    clear();
    background('black');
    tree = [];
    leaves = [];
    noLoop();
}

function updateLengths() {
    // Por ahora solo se puede cambiar la altura de forma no dinámica
    loop();
    tree = [];
    leaves = [];
    initTree();



    // grow();
    // a = createVector(width / 2, height);
    // b = createVector(width / 2, height - lengthSlider.value());
    // root = new Branch(a, b, trunkColor, branchWidth, startAngle);
    // tree[0] = root;

    // tree[0].end.x = lengthSlider.value()*cos(PI/2) + tree[0].begin.x;
    // tree[0].end.y = -lengthSlider.value()*sin(PI/2) + tree[0].begin.y;
    // var count = 1;
    // var alpha = PI/2;
    // var beta  = PI/2;
    // for (var i = 1; i < tree.length; i++) {

        // console.log(tree[i].direction)
        
        // if (count %2 != 0) {
            // if (i % 2 != 0) {
                // tree[i].end.x = lengthSlider.value()*cos(alpha - tree[i].angle) + tree[i].begin.x;
                // tree[i].end.y = -lengthSlider.value()*sin(alpha - tree[i].angle) + tree[i].begin.y;
        // 
            // }else {
                // tree[i].end.x = lengthSlider.value()*cos(alpha + tree[i].angle)+ tree[i].begin.x;
                // tree[i].end.y = -lengthSlider.value()*sin(alpha + tree[i].angle) + tree[i].begin.y;
                // alpha -= tree[i].angle;
                // count += 1;
            // }
        //    
        // 
        // } else {
            // if (i % 2 === 0) {
                // tree[i].end.x = lengthSlider.value()*cos(beta + tree[i].angle) + tree[i].begin.x;
                // tree[i].end.y = -lengthSlider.value()*sin(beta + tree[i].angle) + tree[i].begin.y;  
                // beta -= tree[i].angle;
                // count+=1            
//   
            // }else{
                // tree[i].end.x = lengthSlider.value()*cos(beta - tree[i].angle) + tree[i].begin.x;
                // tree[i].end.y = -lengthSlider.value()*sin(beta - tree[i].angle) + tree[i].begin.y;  
                
                
                
                
            // }
        // }
            
        // draw();
        
    // }
}

function updateAngles() {
    for (var i = 0; i < tree.length; i++) {
        tree[i].angle = angleSlider.value()*Math.PI/180;
        draw()
    }
}

function draw() {
    background('black');
    // Show each branch of the array
    for (var i = 0; i < tree.length; i++) {
        tree[i].show();
    }

    for (var i = 0; i < leaves.length; i++) {
        leaves[i].show();   

    }     
    // noLoop();
}
    
