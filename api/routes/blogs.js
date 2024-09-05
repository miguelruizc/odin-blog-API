const express = require('express');
const router = express.Router();

// Get all blogs
router.get('/', (req, res) => {
	res.json({
		message: 'All blogs',
	});
});

// Get one blog
router.get('/:blogId', (req, res) => {
	res.json({
		message: `One blog(${req.params.blogId})`,
	});
});

// Get all comments of a blog
router.get('/:blogId/comments', (req, res) => {
	res.json({
		message: `All comment of blog(${req.params.blogId})`,
	});
});

// Get one comment of a blog
router.get('/:blogId/comments/:commentId', (req, res) => {
	res.json({
		message: `One comment(${req.params.commentId}) of blog(${req.params.blogId})`,
	});
});

// Create new blog
router.post('/', (req, res) => {
	res.json({
		message: 'Blog created',
	});
});

// Create new comment
router.post('/:blogId/comments', (req, res) => {
	res.json({
		message: `Comment created on blog(${req.params.blogId})`,
	});
});

// Edit blog
router.put('/:blogId', (req, res) => {
	res.json({
		message: `Blog(${req.params.blogId}) edited`,
	});
});

// Edit comment
router.put('/:blogId/comments/:commentId', (req, res) => {
	res.json({
		message: `Comment(${req.params.commentId}) from Blog(${req.params.blogId}) edited`,
	});
});

// Delete blog
router.delete('/:blogId', (req, res) => {
	res.json({
		message: `Blog(${req.params.blogId}) deleted`,
	});
});

// Delete comment
router.delete('/:blogId/comments/:commentId', (req, res) => {
	res.json({
		message: `Comment(${req.params.commentId}) from Blog(${req.params.blogId}) deleted`,
	});
});

module.exports = router;
