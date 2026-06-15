import express from 'express';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

const DIARY = {};
const EMAIL = new Set();

//Hey, here is my car = Please park it and give me back a token
//Email - Unique Car Number

app.get('/', (req, res) => {
	res.send('HI');
});

app.post('/signup', (req, res) => {
	const { name, email, password } = req.body;

	if (EMAIL.has(email)) {
		res.status(400).json({ error: 'Email already taken' });
	}

	//create a token for user
	const token = `${Date.now()}`;

	//do a entry on diary
	DIARY[token] = { name, email, password };
	EMAIL.add(email);
  
	return res.json({ status: 'succuss', token });
});

app.post('/me', (req, res) => {
	const { token } = req.body;

	console.log("token : ",token);

	if (!token) {
		res.status(400).json({ error: 'Missing token' });
	}

	if (!(token in DIARY)) {
		res.status(400).json({ error: 'Invalid token' });
	}
	const entry = DIARY[token];

	return res.json({ data: entry });
});

app.post('/private-data', (req, res) => {
	const { token } = req.body;

	if (!token) {
		res.status(400).json({ error: "Missing token" });
	}

	if (!(token in DIARY)) {
		res.status(400).json({ error: "Invalid token" });
	}

	const entry = DIARY[token];
	return res.json({ privateData: 'Access granted' });
});

app.listen(port, () => {
	console.log(`Server is listening port ${port}`);
});

//1781524913161
