# NPM : Node Package Manager
 NPM is a registry which contains all the packages that are available for Node.js. It is going to have one more thing that is called as how to manage that package for the application

 Package : NodeJS is a server side language, but it requires many more dependency, many more depended package.

E.g : -
1. Making Own : - We can make our own package and use it in our project.
2. Using Third Party Package : - We can use third party package in our project. It is very easy to use third party package in our project. We just need to install the package and use it in our project.

NPM is a package manager which have a lot of package accounting to our requirement. we have to use those package.

Every package has own functionality. there is no any list available to this package do this.

How to decide which package is best for our project?
    1. figure out the requirement of the project.
    2. figure out which package is more updated.
    3. which package in more popular.
    4. Quickly check the documentation of the package.

Opensource has security risk : 
There are two ways to deal with this risk : 

1. Nexus repo : 
    Nexus repo is a repository which contains all the packages that are available for Node.js. It is a private repository which is maintained by the company. It is a secure repository which is used to store the packages that are used in the project.       
2. Snyk :  
    Snyk is a tool which is used to find the vulnerabilities in the packages that are used in the project. It is a free tool which is used to find the vulnerabilities in the packages that are used in the project. It is a very useful tool which is used to find the vulnerabilities in the packages that are used in the project.     


## JSON : Javascript Object Notation
  It is a way represent data in key:value pair.
  [
    {
        "name": "John",
        "age": 30,
        "city": "New York"  
    },
    {
        "name": "Jane",
        "age": 25,
        "city": "London"
    }
  ]

## package.json

This file is the most important file in a Node.js project.

It contains all the package used in application.

It also contains the script(start, test) to run the application.

Meta data[name, version, description, author] about the project is also mentioned in this file.

### To create a package.json file, run the following command in the terminal:

```bash
    npm init
```
answer all question.

then type yes to confirm.

### How to install any package in the project?

```bash
    npm install <package-name>

    #eg: npm install bcryptjs    
```
You get dependency in package.json file and also in node_modules folder.

## node_modules
**node_modules** folder is a folder, in which particular, your all installed package is present. There is possible you installed one package and you get many more package these packages are made individual developers, so making package they need more packages that's why you install one package and you get more package.

``` bash
    npm i jsonwebtoken
```
But, you get many more, because these are supporting libraries.

``` bash
    npm i express
```
we never transfer this folder to run command.
``` bash
    npm i
```
This command goes package.json file and look for required package and install all the package in node_modules folder.

## package-lock.json
**package-lock.json :** It is a file that contains the exact versions of the dependencies installed in the project. It ensures that all developers are using the same versions of the dependencies.

## .gitignore
**.gitignore :** What all things you don't want to push to the git repository, you can mention in this file. We never push node_modules folder to the git repository.

## README.md
**README.md :** It is a markdown file, in which we can write about our project, how to run the project, how to install the package, etc. It is a documentation file for the project. It is very important file for the project. It is a good practice to write a README.md file for your project. It helps other developers


## Dependency
There are three types of dependencies in npm:
1. local
2. global
3. dev

### local dependency
Default installation is refers as local dependency. It is installed in the node_modules folder of the project. It is used in the project.

They are local to folder.

Only used for specific project.

### global dependency
Global dependency is installed globally in the system. only used before start, to generate the app and run the app.

It will not add package.json file and we need to sudo permission to install global dependency.

How to install global dependency?

```bash
    sudo npm i  -g <package-name>
```
```bash
    sudo npm i -g nodemon
```

### dev dependency
Dev dependency is used for development purpose. It is not required in production. It is installed in the node_modules folder of the project. It is used for testing, linting, etc.
To install dev dependency, we need to use the following command:

```bash
    npm install <package-name> --save-dev
```
```bash
    npm install nodemon --save-dev
```