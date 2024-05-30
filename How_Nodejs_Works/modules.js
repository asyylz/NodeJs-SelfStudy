// console.log(arguments);
// console.log(require('module').wrapper);

const C = require('./test-module-1');
const calc1 = new C();

console.log(calc1.add(1, 6));

//exports
//const calc2 = require('./test-module-2');
const { add, multiply, devide } = require('./test-module-2');
console.log(multiply(2, 5));

//caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();


