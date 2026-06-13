import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const config = defineConfig({
	out: './drizzle',
	schema: './models/index.js',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL,
	},
});


export default config;
