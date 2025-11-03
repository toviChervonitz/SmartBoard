const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.getAllPosts);
<<<<<<< HEAD
router.get("/:id", postController.getPostById);
router.post("/", postController.createPost);
router.delete("/:id", postController.deletePost);
router.put("/:id", postController.updatePost);
router.get("/user/:userId", postController.getPostsByUser);

=======
router.get("/posts/:id", postController.getPostById);
router.post("/posts/", postController.createPost);
router.delete("/posts/:id", postController.deletePost);
router.put("/posts/:id", postController.updatePost);
>>>>>>> 96b79c26613ea8a616fab1c9d77d4f3c24bb31ed

module.exports = router;