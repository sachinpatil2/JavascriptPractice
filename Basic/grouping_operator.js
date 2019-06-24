console.log(1 + 2 * 3); // 1 + 6
// expected output: 7

console.log(1 + (2 * 3)); // 1 + 6
// expected output: 7

console.log((1 + 2) * 3); // 3 * 3
// expected output: 9

console.log(1 * 3 + 2 * 3); // 3 + 6
// expected output: 9

(() => {
    var demo = 'This is demo';
    console.log('This is Immedialtely Invoked Fucntion Expression. IIFE ' + demo);
})();
// console.log(demo);

function sample() {
    var temp = 'temp';
    console.log('this is sample' + temp);
}
try {

    console.log(temp); //gives undefined value.
} catch (ex) {
    // console.log(ex);
} finally {
    console.log('this is Final');
}


var materials = ['One', 'Two', 'Three'];
console.log(materials.map(material => material.length));
materials.map((material) => {
    console.log(material);
});