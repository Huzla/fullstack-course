let { Person } = require('../db/models');

//-------------------------------------------------------

const findPerson = (id) => {
  return Person.findById(id)
    .then( person => person)
    .catch(err => null);
};

const removePerson = (id) => {
  let index = db.findIndex((p) => p.id === id);

  if (index < 0)
    return false;

  db.splice(index, 1);

  return true;
};

const addPerson = (person) => {
  return new Person( person ).save();
}

const fetchEveryone = () => {
  return Person.find({}).exec();
};

const changePerson = (id, number) => {
    return findPerson(id)
      .then(person => {
        person.number = number;
        person.save()
      });
};


module.exports = {
  findPerson,
  fetchEveryone,
  removePerson,
  addPerson,
  changePerson
}
