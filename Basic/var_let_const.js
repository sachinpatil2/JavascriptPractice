'use strict';

var demo = 'persistent';
var demo = 'persistent Systems';
const constVar = 'persistent const';

console.log('Demo: ' + demo);

let demo1 = 'persistent';
// let demo1 = 'persistent Systems'; //Error occur.already been declared.

console.log('Demo1: ' + demo1);
console.log('Const var: ' + constVar);

function show() {
    const tempConst  = 'Temp const';
    console.log('Temp const: '+tempConst);
    try{
        constVar += 'persistent systems';
    }catch(ex){
        console.log('Exception Occured: '+ex);
    }finally{
        console.log('Finally Occured: ');
    }
    
    var showVar = 'showVar';
    console.log('inside show.: ' + showVar);
    for (let i = 0; i < 4; i++)
        console.log('i: ' + i);

    // console.log('outside i: ' + i);// error occured. i is not defined.
}
show();
console.log('Const var after fucntion execution: ' + constVar);
// console.log('Temp  after fucntion execution: '+tempConst);// ReferenceError: tempConst is not defined

// console.log('outside show.: ' + showVar);// error occur. showVar is not defined.
function test(){
    var foo = 33;
    if (true) {
       let foo ;
       foo= (foo + 55); // ReferenceError
    }
 }
 test();