import express from 'express';
import userRouter from './routes/user.router.js'
import jwt from 'jsonwebtoken';

const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(express.json());


app.use(async function (req, res, next) {
    try {
        const tokenHeader = req.headers['authorization'];

    if (!tokenHeader) {
        return next();
    }

    if (!tokenHeader.startsWith('Bearer')) {
        return res.status(400).json({ error: "authorization header must start with Bearer" });
    }

    const token = tokenHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    } catch (error) {
        next(); 
    }
})

app.get('/', (req, res) => {
    res.send("Sever is running");
})
app.use('/user', userRouter);


app.listen(port, () => {
    console.log(`Server is listening port : ${port}`);
})