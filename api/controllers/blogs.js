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
			'Blog created:\n-title:',
			post.title,
			'\n-body:',
			post.body,
			'\n-author:',
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
const POST_create_comment = async (req, res, next) => {
	// Check if :blogId is valid
	const blogId = parseInt(req.params.blogId);
	if (isNaN(blogId)) {
		return res.status(400).json({ error: 'Invalid blog id' });
	}

	try {
		// Check if blog exists
		const blog = await prisma.blog.findUnique({ where: { id: blogId } });
		if (!blog) {
			return res.status(404).json({ error: 'Blog not found' });
		}

		// Check for validation/sanitization errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array().map((error) => error.msg),
			});
		}

		// Add comment to database, anonymous if no user, authored if yes user
		const comment = await prisma.comment.create({
			data: {
				body: req.body.body,
				author: req.user?.username || 'Anonymous',
				blogId,
			},
		});
		console.log(
			'Comment created:\n-blogId:',
			blogId,
			'\n-body:',
			comment.body,
			'\n-author:',
			comment.author
		);

		// Respond with comment info
		return res.json({
			message: 'Comment created',
			blogId,
			body: comment.body,
			author: comment.author,
		});
	} catch (error) {
		console.error(
			'Error handling POST /blog/:blogId/comment request (create blog): ',
			error
		);
		return next(error);
	}
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
