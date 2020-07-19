
// tree: an array of branches
var tree = []
var leaves = [];
var count = 0;
var trunkLength = randomRange(100,120);
var trunkColor = brownColorPalette();
var branchWidth = randomRange(3,10);
var startAngle = randomAngleDeg2Rad(20,60)

function setup() {
    createCanvas(window.innerWidth, innerHeight);
    var a = createVector(width / 2, height);
    var b = createVector(width / 2, height - trunkLength);
    var root = new Branch(a, b, trunkColor, branchWidth, startAngle);

    tree[0] = root;
}

// Add two branches every mouse click
function mousePressed() {
    for (var i = tree.length-1; i >= 0; i--) {
        if (!tree[i].finished) {
            tree.push(tree[i].branch('left'));
            tree.push(tree[i].branch('right'));
        }
        tree[i].finished = true;
    }   
    count ++;

    if (count > 5) {
        for (var i = 0; i < tree.length; i++) {
             if (!tree[i].finished) {
                var leafColor = greenColorPalette();
                var leafColor2 = greenColorPalette();
                var leaf = new Leaf(tree[i].end.x,tree[i].end.y,leafColor);
                var leaf2 = new Leaf(tree[i].end.x+5,tree[i].end.y+5,leafColor2);

                leaves.push(leaf);
                leaves.push(leaf2);
            }
        } 
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
    
}
    
    
    
    
    
    
    
    
   

  