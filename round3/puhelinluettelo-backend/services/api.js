let { Person } = require('../db/models');

//-------------------------------------------------------

const findPerson = (id) => {
  return db.find((p) => p.id === id);
};

const removePerson = (id) => {
  let index = db.findIndex((p) => p.id === id);

  if (index < 0)
    return false;

  db.splice(index, 1);

  return true;
};

const addPerson = (person) => {
  if (db.find((p) => p.name === person.name))
    return false;

  db.push(person);
  return true;
}

const fetchEveryone = () => {
  return db;
};

const changePerson = (id, number) => {
  try {
    findPerson(id).number = number;
    return true;
  }
  catch (err) {
    return false;
  }
};


module.exports = {
  findPerson,
  fetchEveryone,
  removePerson,
  addPerson,
  changePerson
}
