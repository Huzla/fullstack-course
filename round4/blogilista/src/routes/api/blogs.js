const router = require("express").Router();
const controllers = require("../../controllers").apiBlogs;

//----------------------------------GET-------------------------------------
router.get("/", controllers.getBlogs);

//---------------------------------POST-------------------------------------
router.post("/", controllers.postBlog);

//----------------------------------PUT-------------------------------------

//--------------------------------DELETE-------------------------------------

router.delete("/:id", controllers.deleteBlog);
module.exports = router;
