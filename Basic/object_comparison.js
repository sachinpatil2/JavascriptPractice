var obj1 = {
    name: 'sachin',
    age: 26
}
var obj2 = {
    name: 'patil',
    age: 28
}

var obj3 = obj1;
obj3.name = 'dummy';
console.log(obj1.name);

if (obj1 == obj2)
    console.log('obj1 and obj2 are equal.');

if (obj1 != obj2)
    console.log('obj1 and obj2 are NOT equal.');

if (obj1 == obj3)
    console.log('obj1 and obj3 are equal.');

console.log(typeof obj3);
console.log('obj3.hasOwnProperty(\'name\'): '+obj3.hasOwnProperty('name'));
for(var temp in obj3){
    console.log('Obj3 attribute: '+temp);
}
function temp() {}
console.log(typeof temp);
var string1 = 'sachin';
console.log(typeof string1);
var no = 2;
console.log(typeof no);

//How To Compare Object Values
var a = { blah: 1 };
var b = { blah: 1 };
var c = a;
var d = { blah: 2 };

Object.compare = function (obj1, obj2) {
	//Loop through properties in object 1
	for (var p in obj1) {
		//Check property exists on both objects
		if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;
 
		switch (typeof (obj1[p])) {
			//Deep compare objects
			case 'object':
				if (!Object.compare(obj1[p], obj2[p])) return false;
				break;
			//Compare function code
			case 'function':
				if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
				break;
			//Compare values
			default:
				if (obj1[p] != obj2[p]) return false;
		}
	}
 
	//Check object 2 for any extra properties
	for (var p in obj2) {
		if (typeof (obj1[p]) == 'undefined') return false;
	}
	return true;
};

console.log(Object.compare(a, b));  //true
console.log(Object.compare(a, c));  //true
console.log(Object.compare(a, d));  //false