const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.post("/", postController.createPost);
router.delete("/:id", postController.deletePost);
router.put("/:id", postController.updatePost);
router.get("/user/:userId", postController.getPostsByUser);


module.exports = router;