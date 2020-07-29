// Random range
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Input: range on angles in degrees
// Output random angle in radians
function randomAngleDeg2Rad(min, max) {
    return randomRange(min, max) * Math.PI / 180;
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
    var color = brownArray[Math.floor(randomRange(0,brownArray.length))]
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
    
    var color = greenArray[Math.floor(randomRange(0,greenArray.length))]
    // console.log(color)
    return color
}

//  Returns random color from orange/autumn palette
function orangeColorPalette() {
    orangeArray = [
        '#BF670B',
        '#7F4507',
        '#FF8A0E',
        '#402304',
        '#F29F05',
        '#A68112',
        '#D95323',
        '#D94032',
        '#A63F03',
        '#8C1C03',
        '#590202',
        '#595332',
        '#D98E04'

    ]
    var color = orangeArray[Math.floor(randomRange(0,orangeArray.length))]
    return color
}


function flowerColorPalette() {
    flowerColorArray = [
        '#FF645E',
        '#CC2C50',
        '#73163E',
        '#A61C41',
        '#AB46FF',
        '#70B5B6',
        '#F26DB6',
        '#FFB845'

    ]
    
    var color = flowerColorArray[Math.floor(randomRange(0,flowerColorArray.length))]
    // console.log(color)
    return color
}

// Returns the n digit of a number (reading from right to left and starting with 0)
function nDigit(n, number){
    return Math.floor((number / Math.pow(10, n)) % 10);
  }
