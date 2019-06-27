const router = require('express').Router();
const controllers = require('../controllers/api.js');

//----------------GET----------------------------
router.get('/', controllers.getEveryone);

router.get('/:id', controllers.getPerson);

//---------------POST---------------------------


//--------------DELETE--------------------------

router.delete('/:id', controllers.deletePerson);

module.exports = router;
