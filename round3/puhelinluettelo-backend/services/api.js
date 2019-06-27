const db = require('../db/db.js');

const findPerson = (id) => {
  return db.find(p => p.id === id);
}

module.exports = {
  findPerson
}
