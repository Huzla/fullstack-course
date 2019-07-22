const router = require("express").Router();
const controllers = require("../../controllers").apiUsers;

//----------------------------------GET-------------------------------------
router.get("/", controllers.getUsers);

//---------------------------------POST-------------------------------------
router.post("/", controllers.postUser);

//----------------------------------PUT-------------------------------------

router.put("/:id", controllers.putUser);

//--------------------------------DELETE-------------------------------------

router.delete("/:id", controllers.deleteUser);
module.exports = router;
