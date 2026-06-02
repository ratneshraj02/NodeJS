import {collection} from '../db/db.js';

export function getData(query) {
    return collection.find(query);
}

export function getOneUser(query) {
    return collection.findOne(query);
}

export function addUser(data) {
    return collection.insertOne(data);
}

export function updateUser(query,data) {
    return collection.updateOne(query, data);
}

export function deleteUser(query) {
    return collection.deleteOne(query);
}

