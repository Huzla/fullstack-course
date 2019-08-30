const router = require("express").Router();
const controllers = require("../../controllers").apiTesting;

//----------------------------------GET-------------------------------------

//---------------------------------POST-------------------------------------
router.post("/reset", controllers.postReset);

//----------------------------------PUT-------------------------------------

//--------------------------------DELETE-------------------------------------

module.exports = router;
