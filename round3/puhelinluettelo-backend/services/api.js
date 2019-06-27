let db = require('../db/db.js');

//-------------------------------------------------------

const findPerson = (id) => {
  return db.find((p) => p.id === id);
}

const removePerson = (id) => {
  let index = db.findIndex((p) => p.id === id);

  if (index < 0)
    return false;

  db.splice(index, 1);

  return true;
}

const fetchEveryone = () => {
  return db;
}
module.exports = {
  findPerson,
  fetchEveryone,
  removePerson

}
