const services = require('../services/api.js');

const getPerson = (req, res) => {
  console.log('request for id:', req.params.id)
  let person = services.findPerson(Number(req.params.id));

  if (person)
    return res.json(person);

  res.status(404).end();
}

const getEveryone = (req, res) => {
  let everyone = services.fetchEveryone();

  if (everyone)
    return res.json( everyone );

  res.status(500).end();
}

module.exports = {
  getPerson,
  getEveryone
}
