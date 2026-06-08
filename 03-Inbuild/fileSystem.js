let fs = require('fs');

//create a file and app the data
/*
fs.writeFile('mycode.txt', 'this is my data of code', (err)=>{
    if (err) throw err;
    console.log("Task done");
});
*/

// append the data when run the file again and again
/*
fs.appendFile('myText.txt', '\nCode from Node', (err) => {
    if (err) throw err;
    console.log('File appended');
});
*/

//read the city.json file
/*
fs.readFile('city.json', 'utf-8', (err, data) => {
	if (err) throw err;
	console.log(data);
});
*/

//readSync() : read the file synchronous
/*
let data = fs.readFileSync('city.json', { encoding: 'utf-8', flag: 'r' });
console.log(data);

let data1 = fs.readFileSync('myText.txt', { encoding: 'utf-8', flag: 'r' });
console.log(data1);
*/

//delete file
/*
fs.unlink('mycode_copy.txt', (err) => {
	if (err) throw err;
	console.log('File is deleted');
});
*/

//rename file
/*
fs.rename('myText.txt', 'myFile.txt', (err) => {
    if (err) throw err;
    console.log("File renamed");
});
*/
