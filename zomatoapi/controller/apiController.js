import { db } from '../db/db.js  ';

export function getData(colName, query) {
	if (colName && query) {
		const data = db.collection(colName).find(query).toArray();
		return data;
	} else {
		return 'Data Missing';
	}
}
export function getDataWithSort(colName, query, sort) {
	if (colName && query) {
		const data = db.collection(colName).find(query).sort(sort).toArray();
		return data;
	} else {
		return 'Data Missing';
	}
}

export function getDataWithSortLimit(colName, query, sort, skip, limit) {
	if (colName && query) {
		const data = db
			.collection(colName)
			.find(query)
			.sort(sort)
			.skip(skip)
			.limit(limit)
			.toArray();
		return data;
	} else {
		return 'Data Missing';
	}
}

export async function getPostData(collName, data) {
	return await db.collection(collName).insertOne(data);
}
