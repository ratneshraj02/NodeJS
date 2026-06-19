import db from '../db/index.js';
import { userTable } from '../models/userModel.js';

async function seeAllUser(req, res) {
    
	const users = await db
		.select({
			id: userTable.id,
			name: userTable.name,
			email: userTable.email,
		})
		.from(userTable);
 
	return res.json({ user });
}

export { seeAllUser };
