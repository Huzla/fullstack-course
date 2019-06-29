let { Person } = require('../db/models');

const countPeople = (id) => {
  return Person.find({})
        .then(people => people.length);
}

module.exports = {
  countPeople
}
