console.log(Object); // -> ƒ Object() { [native code] }
console.log(Array); // -> ƒ Array() { [native code] }
console.dir(Function); // -> ƒ Function() { [native code] }

function fn() {}
console.log('typeof fn.prototype: ' + typeof fn.prototype);
console.log('typeof Object.prototype: ' + typeof Object.prototype);
console.log('typeof fn.prototype.__proto__: ' + typeof fn.prototype.__proto__);
console.log();

function doSomething(){}
doSomething.prototype.foo = "bar";
var doSomeInstancing = new doSomething();
doSomeInstancing.prop = "some value";
console.log("doSomeInstancing.prop:      " + doSomeInstancing.prop);
console.log("doSomeInstancing.foo:       " + doSomeInstancing.foo);
console.log("doSomething.prop:           " + doSomething.prop);
console.log("doSomething.foo:            " + doSomething.foo);
console.log("doSomething.prototype.prop: " + doSomething.prototype.prop);
console.log("doSomething.prototype.foo:  " + doSomething.prototype.foo);