let { Person } = require('../db/models');

//Handle errors caused by casting ids to ObjectID.
const handleCastingError = err => {
  if (err.message.includes('Cast'))
    err.code = 100;
  throw err;
}

//-------------------------------------------------------

const findPerson = (id) => {
  return Person.findById(id)
    .then( person => person)
    .catch(handleCastingError);
};

const removePerson = (id) => {
  return Person.deleteOne({_id: id}).exec()
    .catch(handleCastingError);
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
