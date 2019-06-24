var promise1 = new Promise(function (resolve, reject) {
    console.log('in promise 1');
    setTimeout(resolve, 200, 'one');
});

var promise2 = new Promise(function (resolve, reject) {
    console.log('in promise 2');
    setTimeout(resolve, 100, 'two');
});

Promise.race([promise2, promise1]).then(function (value) {
    console.log(value);
    // Both resolve, but promise2 is faster
});
// expected output: "two"

// var demo1 = function() {}
// demo1.then(function (value) {
//     console.log(value);
// });
async function logFetch(url) {
    try {
      const response = await fetch(url);
      console.log(await response.text());
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }