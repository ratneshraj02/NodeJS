/* Globals */
/*
    In NodeJS global objects are the objects. that are accessing in the application from anywhere with explicitly using the import or require keyword.

    In browser-based javascript, the "window" object is the global scope, meaning it holds all global variable functions.

    In NodeJS, instead of the window object, the global object serves as the global scope, which holds all the global variable & function for the application.


    The most commonly used NodeJS global objects.
    1. global
    2. console
    3. process
    4. __dirname and __filename
*/

/*
    1. global :
        The global object in NodeJS is equivalent to the window object in browser. andy variable or function added to global becomes globally accessible across the application.
    
    e.g :-
*/
global.a = 10; // This is a global variable
console.log(a); // Accessible from anywhere in application.

/*
    2. console : 
        It is used for printing messages to standard output & error.

    e.g :-
*/
console.log("This is a log messages");
console.log("This is an error message");

/*
    3. process : 
        It provides information about the current running NodeJS process.
    
    e.g :-
*/
console.log("Process ID : ", process.pid);
console.log("Node JS version", process.version);

/*
    4. __dirname & __filename : 
        These are global variable that represent the 
            __dirname = directory name
            __filename = filename
    
    e.g :-
*/
console.log(__dirname);
console.log(__filename);
