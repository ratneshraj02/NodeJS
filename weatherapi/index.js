let express = require('express');
let request = require('request');

let app = express();
let port = process.env.PORT || 8000;

//default route
app.get('/', (req, res) => {
	res.send('Default Route');
});

app.get('/weather', (req, res) => {
	let city = req.query.city ? req.query.city : 'Sonepur';

    let url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;

    //calling api
    request(url, (err, response) => {
        if (err) throw err;
        res.send(response.body);
    });
    

});

app.listen(port, () => {
	console.log(`Server is listening on ${port}`);
});
