const db = require('../db/db.js');

const findPerson = (id) => {
  return db.find(p => p.id === id);
}

const fetchEveryone = () => {
  return db;
}
module.exports = {
  findPerson,
  fetchEveryone
}
