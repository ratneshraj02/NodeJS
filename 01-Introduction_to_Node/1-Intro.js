/* NODE */
/*
    NodeJS is not a programming language. It is a runtime environment which runs the code of the Javascript.

    "Runtime Environment", which provide necessary infrastructure for code to execute.

    NodeJS is an open source and cross platform runtime environment that allows us to use javascript to develop serve side applications.

    Every web browser have a javascript engine that takes javascript code and compile it to machine code.
        e.g: FireFox uses Spider Monkey
             Safari user Apple Webkit
             Chrome uses V8 Engine
    
    Because browser use different javascript engine, sometimes you will see that javascript behaves different between the browser.
    
    In 2019, Ryan Dahl, the creator of NodeJS, took the V8 engine and embedded it in an application that could execute javascript outside the browser.

        V8 Engine
                    ==> NodeJS(Runtime Environment)
           C++
    
    Browser Runtime Capability :
                -> accessing DOM tree
                -> accessing CSSOM tree
                -> XML HTTP request
                -> Timer

    NodeJS Capability : 
                -> Run JS outside browser
                -> Build web server with JS
                -> Build CLI Tools with JS
                -> Build iOS and Android App with JS
                -> Build IOT and watch app
*/

/* 
    NodeJS is single threaded. It means that each process has only one thread of execution. 

    NodeJS uses Non-Blocking I/O

    Non-Blocking means that we can make a request which  doing something else and then, when this request is finished a callback will execute to handle to handle the result

    "Asynchronous programming" is a key of NodeJS provides several mechanism for handling asynchronous tasks, including, callbacks, promises, and async/await.
*/