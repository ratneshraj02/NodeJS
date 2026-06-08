import { readFileSync } from 'fs';

const filePath = new URL('./index.html', import.meta.url);
let content = await readFileSync(filePath, { encoding: 'utf8' });
console.log(content);
