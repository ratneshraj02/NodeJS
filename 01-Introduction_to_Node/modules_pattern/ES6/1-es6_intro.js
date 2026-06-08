/* ES6 Module */
/*
  They use import keyword.

  1. Way : 
      Using .mjs extension that enables to use ES modeling.
      e.g : index.mjs
  
  2. Way : 
     Add the line in package.json file
      {
        "type" : "module"
      }
*/

/* Difference between named export and default export & * as export. */
/*
  named export:-
    named export allow a module to export multiple values, each with a unique name. These can be imported into another module using same name.

    e.g : 
    math.js
      export const sum = (a,b) => a+b;
      export const multiply = (a, b) =>  a*b;
    
    index.js
      import  {sum, multiply} from './math.js';
      console.log(sum(2,3));//5
      console.log(multiply(2,3));//6

  Default export : 
    It allow a module to export a single value as the default export. This value can be imported into another module suing any name.

  for example :-
  math.js
    const sum = (a, b) => a + b;
    export default sum;

  index.js
    import sum from './math.js'
    console.log(sum(2,4));//5


  "* as"  : 
    This syntax allows to import all the exports from a module and bind them to a specific object
  
  math.js
    export const sum = (a, b) => a+b;
    export const multiple = (a, b) => a*b;

  index.js
    import * as math from './math.js'
    console.log(math.sum(2, 3)); // 5
    console.log(math.multiply(2, 4)); //6
  

*/
