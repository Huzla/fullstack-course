const services = require('../services/general.js');

const getInfo = (req, res) => {
  let count = services.countPeople();

  if (count) {

    return res.send( `<p>Phonebook has info for ${ count } people</p>
                      <p>${ (new Date()).toString() }</p>`
                    );
  }

  res.status(500).end();
}

module.exports = {
  getInfo
}
