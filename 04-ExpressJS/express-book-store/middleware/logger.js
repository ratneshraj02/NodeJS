import fs from 'fs';

export const loggerMiddleware = (req, res, next) => {
	const log = `\n[${Date.now()}] ${req.method} ${req.path}`;
	fs.appendFileSync('logs.txt', log, 'utf-8');
	next();
};
