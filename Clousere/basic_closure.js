function person() {
    var name = 'sachin';
    var id;
    return function closure() {
        return name + ' patil';
    }
}
person.name = 'patil';
var fullname = person();
console.log(fullname());

function sayHello() {
    var text = ' Persistent';
    var sayAlert = function (name) {
        // alert(text);
        text = name + ' Persistent'
        console.log(text);
    }
    return sayAlert;
}
var sayAlert = sayHello();
console.log(sayAlert.toString());
sayAlert('Adam');

class Names {
    constructor(names) {
        this.names = names;
    }
    contains(names) {
        return names.every((name) => this.names.indexOf(name) !== -1);
    }
}
var countries = new Names(['UK', 'Italy', 'Germany', 'France']);
countries.contains(['UK', 'Germany']); // => true  
countries.contains(['USA', 'Italy']); // => false