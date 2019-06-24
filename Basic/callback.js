var company = 'Persistent';
var i = 0;

function display(name, callDisplay) {
    i++;
    name += 'sachin'
    console.log('in display method...' + name);
    callDisplay(display);
}

function callDisplay(callback) {
    var name = 'Persistent';
    console.log('in callDisplay method..'+i);
    callback(name, callDisplay);
    console.log('name:' + name);
}
callDisplay(display);