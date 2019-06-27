const services = require('../services/api.js');

const getPerson = (req, res) => {
  let person = services.findPerson(req.params.id);

  if (person)
    return res.json(person);

  res.status(404).end();
}

module.exports = {
  getPerson
}
