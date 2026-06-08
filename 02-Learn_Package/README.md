# learnpackage : npm

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