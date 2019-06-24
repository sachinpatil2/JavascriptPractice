'use strict';
var promise1 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        // resolve('success');
    }, 300);

    setTimeout(function () {
        reject('foo');
    }, 300);
});

promise1.then(function (value) {
    console.log('inside promise1 then callback.' + value);
    console.log('Line no 13:', promise1);
}, function (error) {
    console.log('inside error. ' + error);
    console.log('Line no 16:', promise1);
});
promise1.catch(function (value) {
    console.log('inside promise1 catch block.' + value);
    console.log('Line no 20:', promise1);
});
console.log('Line no 22:', promise1);
console.log('promise1 length: ' + promise1.value);