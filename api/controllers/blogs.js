const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const GET_all_blogs = (req, res) => {
	res.json({
		message: 'All blogs',
	});
};
const GET_one_blog = (req, res) => {
	res.json({
		message: `One blog(${req.params.blogId})`,
	});
};
const GET_all_comments = (req, res) => {
	res.json({
		message: `All comment of blog(${req.params.blogId})`,
	});
};
const GET_one_comment = (req, res) => {
	res.json({
		message: `One comment(${req.params.commentId}) of blog(${req.params.blogId})`,
	});
};
const POST_create_blog = async (req, res) => {
	// Check for validation/sanitization errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array().map((error) => error.msg),
		});
	}

	// Add post to database
	try {
		const post = await prisma.blog.create({
			data: {
				title: req.body.title,
				body: req.body.body,
				userId: req.user.id,
			},
			include: {
				author: true,
			},
		});
		console.log(
			'Blog created:\n-title: ',
			post.title,
			'\n-body: ',
			post.body,
			'\n-author: ',
			post.author.username
		);

		// Respond with blog info
		res.json({
			message: 'Blog created',
			title: post.title,
			body: post.body,
			author: post.author.username,
		});
	} catch (error) {
		console.error('Error handling request /POST blogs: ', error);
		return next(error);
	}
};
const POST_create_comment = (req, res) => {
	res.json({
		message: `Comment created on blog(${req.params.blogId})`,
	});
};
const PUT_edit_blog = (req, res) => {
	// Check for validation/sanitization errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array().map((error) => error.msg),
		});
	}

	res.json({
		message: `Blog(${req.params.blogId}) edited`,
	});
};
const PUT_edit_comment = (req, res) => {
	res.json({
		message: `Comment(${req.params.commentId}) from Blog(${req.params.blogId}) edited`,
	});
};
const DELETE_blog = (req, res) => {
	res.json({
		message: `Blog(${req.params.blogId}) deleted`,
	});
};
const DELETE_comment = (req, res) => {
	res.json({
		message: `Comment(${req.params.commentId}) from Blog(${req.params.blogId}) deleted`,
	});
};

module.exports = {
	GET_all_blogs,
	GET_one_blog,
	GET_all_comments,
	GET_one_comment,
	POST_create_blog,
	POST_create_comment,
	PUT_edit_blog,
	PUT_edit_comment,
	DELETE_blog,
	DELETE_comment,
};
