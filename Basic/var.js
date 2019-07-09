var a = 10;
var a;
console.log(a);

function add(a, b) {
  console.log(a + b+' '+arguments.length);
}

add(2, 3);

var b, c, d;
b = c = d = a;
console.log('B: '+b+' C: '+c+' D: '+d);