const router = require("express").Router();
const controllers = require("../../controllers").apiBlogs;

//----------------------------------GET-------------------------------------
router.get("/", controllers.getBlogs);

//---------------------------------POST-------------------------------------
router.post("/", controllers.postBlog);

//----------------------------------PUT-------------------------------------

//--------------------------------DELETE-------------------------------------
module.exports = router;
