const db = require('./../../data/dbConfig');

module.exports = {
    getAll,
    getById,
    getByUser,
    create,
    update,
    remove
}

function getAll() {
    return db('users');
}

function getById(id) {
    return db('users').where('id', id).first();
}

function getByUser(user) {
    return db('users').where(user).orderBy('id');
}

async function create(fitnessClass) {
    const newId = await db('users').insert(fitnessClass);
    return db('users').where('id', newId).first();
}

async function update(id, changes) {
    await db('users').where('id', id).update(changes);
    const updated = await db('users').where('id', id).first();
    return updated;
}

async function remove(id) {
    const deleted = await db('users').where('id', id).del();
    return deleted;
}