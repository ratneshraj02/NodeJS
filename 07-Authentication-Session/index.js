import express from 'express';
import userRouter from './routes/user.route.js';


const app = express();
const port = process.env.PORT || 8000;


//middleware
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Sever is running");
});

app.use('/user', userRouter);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});


