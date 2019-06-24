console.log(Object); // -> ƒ Object() { [native code] }
console.log(Array); // -> ƒ Array() { [native code] }
console.dir(Function); // -> ƒ Function() { [native code] }

function fn() {}
console.log('typeof fn.prototype: ' + typeof fn.prototype);
console.log('typeof Object.prototype: ' + typeof Object.prototype);
console.log('typeof fn.prototype.__proto__: ' + typeof fn.prototype.__proto__);