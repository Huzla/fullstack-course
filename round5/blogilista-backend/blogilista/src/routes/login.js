const router = require("express").Router();
const controllers = require("../controllers").login;

//----------------------------------GET-------------------------------------
//router.get("/", controllers.getLogin);

//---------------------------------POST-------------------------------------
router.post("/", controllers.postLogin);

module.exports = router;
