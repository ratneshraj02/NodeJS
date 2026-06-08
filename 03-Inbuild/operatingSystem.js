let os = require('os');

console.log(os.platform()); //linus
console.log(os.arch()); //x64
console.log(os.cpus().length + "core");  //4
console.log(os.freemem()); //10218721280 bytes
console.log(os.uptime());

