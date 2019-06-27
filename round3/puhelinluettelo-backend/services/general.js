const db = require('../db/db.js');

const countPeople = (id) => {
  return db.length;
}

module.exports = {
  countPeople
}
