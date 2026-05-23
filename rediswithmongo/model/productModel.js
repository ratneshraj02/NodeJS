import { getDB } from '../db/connect.js';

export async function getProductColor(uInput) {
	const db = getDB();

	const result = await db
		.collection('product')
		.find({ color: uInput })
		.toArray();

    return result;
    
}
