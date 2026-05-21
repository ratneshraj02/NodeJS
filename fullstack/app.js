let express = require('express');
const app = express();

let dotenv = require('dotenv');
dotenv.config();

let morgan = require('morgan');
let fs = require('fs');

const port = process.env.PORT || 8000;


let menu = [
    { name: "Category", link: '/category' },
    {name: "Product", link : '/product'}
];

const categoryRouter = require('./src/controller/categoryController.js')(menu);
const productRouter = require('./src/controller/productController.js')(menu);


//middleware
app.use(morgan('common', {stream: fs.createWriteStream('./app.log')}));


//static path
app.use(express.static(__dirname + '/public'));

//html file path
app.set('views', './src/views');

//view engine
app.set('view engine', 'ejs')

//default
app.get('/', (req, res) => {
    res.send("Hi from Default port");
});

app.use('/category', categoryRouter);
app.use('/product', productRouter);


app.listen(port, () => {
    console.log(`app is listening in port ${port}`);
});