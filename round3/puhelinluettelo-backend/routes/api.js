const router = require('express').Router();
const controllers = require('../controllers/api.js');


router.get('/:id', controllers.getPerson);

module.exports = router;
