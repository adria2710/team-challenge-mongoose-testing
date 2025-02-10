const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

router.post("/create", async (req, res) => {
try {
    const { title, body } = req.body;
    if (!title || !body) return res.status(400).json({ error: "All fields are required" });
    const newPost = new Post({ title, body });
    await newPost.save();
    res.status(201).json(newPost);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

router.get("/", async (req, res) => {
try {
    const posts = await Post.find();
    res.json(posts);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

router.get("/id/:_id", async (req, res) => {
try {
    const post = await Post.findById(req.params._id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

router.get("/title/:title", async (req, res) => {
try {
    const posts = await Post.find({ title: req.params.title });
    res.json(posts);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

router.put("/id/:_id", async (req, res) => {
try {
    const updatedPost = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true });
    if (!updatedPost) return res.status(404).json({ error: "Post not found" });
    res.json(updatedPost);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

router.delete("/id/:_id", async (req, res) => {
try {
    const deletedPost = await Post.findByIdAndDelete(req.params._id);
    if (!deletedPost) return res.status(404).json({ error: "Post not found" });
    res.json({ message: "Post deleted" });
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

router.get("/postsWithPagination", async (req, res) => {
try {
    const { page = 1 } = req.query;
    const limit = 10;
    const posts = await Post.find().skip((page - 1) * limit).limit(limit);
    res.json(posts);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

module.exports = router;
