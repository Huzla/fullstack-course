let { Person } = require('../db/models');

//-------------------------------------------------------

//All functions should return Promises so use exec() to get rid off Queries.
const findPerson = (id) => {
  return Person.findById(id).exec();
};

const removePerson = (id) => {
  return Person.deleteOne({_id: id}).exec();
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
        return person.save();
      });
};


module.exports = {
  findPerson,
  fetchEveryone,
  removePerson,
  addPerson,
  changePerson
}
