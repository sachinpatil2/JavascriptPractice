var promise1 = Promise.resolve('resolve with success.');
var promise2 = 10;
var promise3 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 100, 'settimeout');
});

Promise.all([promise1, promise2, promise3]).then(function (values) {
    console.log(values);
}, function (error) {
    console.log('Error: ' + error);
});