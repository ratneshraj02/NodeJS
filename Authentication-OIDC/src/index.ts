import express, { type Request, type Response } from 'express';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
	res.json({ status: 'ok', message: 'TypeScript Node server is running' });
});

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
