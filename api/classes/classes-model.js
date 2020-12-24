const db = require('./../../data/dbConfig');

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}

function getAll() {
    return db('classes');
}

function getById(id) {
    return db('classes').where('id', id).first();
}

async function create(fitnessClass) {
    const newId = await db('classes').insert(fitnessClass);
    return db('classes').where('id', newId).first();
}

async function update(id, changes) {
    await db('classes').where('id', id).update(changes);
    const updated = await db('classes').where('id', id).first();
    return updated;
}

async function remove(id) {
    const deleted = await db('classes').where('id', id).del();
    return deleted;
}
