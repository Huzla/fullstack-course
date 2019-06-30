const router = require("express").Router();
const controllers = require("../controllers/general.js");

router.get("/info", controllers.getInfo);

module.exports = router;
