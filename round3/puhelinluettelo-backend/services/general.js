let { Person } = require("../db/models");

const countPeople = () => {
  return Person.find({})
    .then(people => people.length);
};

module.exports = {
  countPeople
};
