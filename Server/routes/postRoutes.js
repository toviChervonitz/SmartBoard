const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.getAllPosts);
router.get("/getAllFavoritePosts", postController.getAllFavoritePosts);
router.get("/:id", postController.getPostById);
router.post("/", postController.createPost);
router.post("/addFavoritePost/:id", postController.addFavoritePost);
router.post("/removeFavoritePost/:id", postController.removeFavoritePost);
router.delete("/:id", postController.deletePost);
router.put("/:id", postController.updatePost);


module.exports = router;