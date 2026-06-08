/* CJS */
/*
    They use require keyword to import the function.
*/

/* module.exports */
/*
    In NodeJS, "module.exports" is an object that is used to define what a module exports and makes available for other module to use.

    When we create a module in NodeJS, any variable, functions or object that we want to expose to other mdoules mus tbe added to the "module.exports" objects.

    for example, we have a file called my module and we want to export a function called "addNumbers"

    function add(a, b) {
      return a + b;
    }
    module.exports = add;

    module.export = {add};

    It means that when we import "myModule" into another file using the require(), function we can access the addNumber function

    const add = require('./math.js');
    console.log(add(3, 6)); //9

    By default "module.exports" is an empty object but we can assign any value to it an object a function or a primitive value, such as a string or Number.
*/



