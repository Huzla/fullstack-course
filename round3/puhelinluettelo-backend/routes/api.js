const router = require('express').Router();
const controllers = require('../controllers/api.js');

router.get('/', controllers.getEveryone);

router.get('/:id', controllers.getPerson);

module.exports = router;
