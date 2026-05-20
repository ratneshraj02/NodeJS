let http = require('http');
let server = http.createServer((req, res) => {
    // req = what we send to the server(params, queryParams and body)
    // res = what server return

    res.write("<h1>This is NodeJS code server</h1>");
    res.end();

});


server.listen(8000, () => {
    console.log(`server is listening on port`);
});