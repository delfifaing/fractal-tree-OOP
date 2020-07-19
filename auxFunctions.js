// Random range
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Input: range on angles in degrees
// Output random angle in radians
function randomAngleDeg2Rad(min, max) {
    return randomRange(min, max) * Math.PI / 180
}
//  Returns random color from brown palette

function brownColorPalette() {
    brownArray = [
        '#735438',
        '#40211A',
        '#8C5954',
        '#BF726B',
        '#A66B49',
        '#402015',
        '#8C4830',
        '#540D02',
        '#6B1B05'
    ] 
    var color = brownArray[Math.floor(randomRange(0,brownArray.length-1))]
    // console.log(color)
    return color
}

//  Returns random color from green palette
function greenColorPalette() {
    greenArray = [
        '#abc32f',
        '#809c13',
        '#607c3c',
        '#659D32',
        '#699864',
        '#337147',
        '#165751',
        '#52A874',
        '#A7D175'
    ]
    
    var color = greenArray[Math.floor(randomRange(0,brownArray.length-1))]
    // console.log(color)
    return color
}