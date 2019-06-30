const services = require("../services/general.js");

const getInfo = (req, res, next) => {
  services.countPeople()
    .then(count => {
      return res.send( `<p>Phonebook has info for ${ count } people</p>
                        <p>${ (new Date()).toString() }</p>`
      );
    })
    .catch(next);
};

module.exports = {
  getInfo
};
