const services = require('../services/api.js');

const getPerson = (req, res) => {
  console.log('request for id:', req.params.id)
  let person = services.findPerson(Number(req.params.id));

  if (person)
    return res.json(person);

  res.status(404).end();
}

module.exports = {
  getPerson
}
