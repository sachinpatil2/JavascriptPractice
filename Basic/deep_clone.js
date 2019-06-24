function keepCloning(objectpassed) {
    if (objectpassed === null || typeof objectpassed !== 'object') {
        return objectpassed;
    }
    // give temporary-storage the original obj's constructor
    var temporary_storage = objectpassed.constructor();
    for (var key in objectpassed) {
        temporary_storage[key] = keepCloning(objectpassed[key]);
    }
    return temporary_storage;
}
var employeeDetailsOriginal = {
    name: 'Manjula',
    age: 25,
    Profession: 'Software Engineer'
};
var employeeDetailsDuplicate = keepCloning(employeeDetailsOriginal);
employeeDetailsOriginal.name = "NameChanged";
console.log(employeeDetailsOriginal);
console.log(employeeDetailsDuplicate);

const a = [1, 2, 3]
let b = [...a];
b[1] = 4;
console.log(b[1]) // 4
console.log(a[1]) // 2

const object1 = {};

Object.preventExtensions(object1);

try {
  Object.defineProperty(object1, 'property1', {
    value: 42
  });
} catch (e) {
  console.log(e);
  // Expected output: TypeError: Cannot define property property1, object is not extensible
}