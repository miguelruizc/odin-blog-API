import chalk from 'chalk';
import { validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const GET_all_blogs = async (req, res, next) => {
	try {
		// Query all blogs from database
		const blogs = await prisma.blog.findMany({
			include: {
				author: {
					select: {
						username: true,
					},
				},
			},
		});

		// Return them
		res.json(blogs);
	} catch (error) {
		console.error('Error handling request (GET /blogs): ', error);
		next(error);
	}
};
const GET_one_blog = async (req, res, next) => {
	// Check if :blogId is valid
	const blogId = parseInt(req.params.blogId);
	if (isNaN(blogId)) {
		return res.status(400).json({ error: 'Invalid blog id' });
	}

	try {
		// Search blog in database
		const blog = await prisma.blog.findUnique({
			where: { id: blogId },
			include: {
				author: {
					select: {
						username: true,
					},
				},
			},
		});
		// Not Found
		if (!blog) return res.status(404).json({ error: 'Blog not found' });

		// Found
		return res.json({
			blog,
		});
	} catch (error) {
		console.error(`Error handling GET /blogs/${blogId} request: `, error);
		return next(error);
	}
};
const GET_all_comments = async (req, res, next) => {
	// Check if :blogId is valid
	const blogId = parseInt(req.params.blogId);
	if (isNaN(blogId)) {
		return res.status(400).json({ error: 'Invalid blog id' });
	}

	try {
		// Query comments from database
		const comments = await prisma.comment.findMany({ where: { blogId } });
		// Return them
		res.json(comments);
	} catch (error) {
		console.error(`Error handling request (GET /blogs/${blogId}/comments): `, error);
		next(error);
	}
};
const GET_one_comment = async (req, res, next) => {
	// Check if :blogId is valid
	const blogId = parseInt(req.params.blogId);
	if (isNaN(blogId)) {
		return res.status(400).json({ error: 'Invalid blog id' });
	}
	// Check if :commentId is valid
	const commentId = parseInt(req.params.commentId);
	if (isNaN(commentId)) {
		return res.status(400).json({ error: 'Invalid comment id' });
	}

	try {
		// Search comment in database
		const comment = await prisma.comment.findUnique({
			where: { id: commentId, blogId },
		});
		// Not Found
		if (!comment) return res.status(404).json({ error: 'Comment not found' });

		// Found
		return res.json({
			comment,
		});
	} catch (error) {
		console.error(
			`Error handling GET /blogs/${blogId}/comments/${commentId} request: `,
			error
		);
		return next(error);
	}
};
const POST_create_blog = async (req, res, next) => {
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
			green('*---'),
			'\nBlog created:\n-title:',
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
			'*---\nComment created:\n-blogId:',
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
const PUT_edit_blog = async (req, res, next) => {
	// Check if :blogId is valid
	const blogId = parseInt(req.params.blogId);
	if (isNaN(blogId)) {
		return res.status(400).json({ error: 'Invalid blog id' });
	}

	// Check for validation/sanitization errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array().map((error) => error.msg),
		});
	}

	try {
		// Check if blog exists
		const blog = await prisma.blog.findUnique({ where: { id: blogId } });
		if (!blog) return res.status(404).json({ error: 'Blog not found' });

		// Check if user is blog.author
		if (req.user.id !== blog.userId)
			return res.status(403).json({
				error: "Can't update blog, blog doesn't belong to current user",
			});

		// Modify blog in database
		const updatedBlog = await prisma.blog.update({
			where: { id: blogId },
			data: {
				title: req.body.title,
				body: req.body.body,
			},
		});
		console.log(
			'*---\nBlog updated:\n-Old title:',
			blog.title,
			'\n-Old body:',
			blog.body,
			'\n-New title:',
			updatedBlog.title,
			'\n-New body:',
			updatedBlog.body
		);

		// Return updated blog
		return res.json({ message: 'Blog updated', blog: updatedBlog });
	} catch (error) {
		console.error(`Error handling request PUT /blog/${blogId}: `, error);
		return next(error);
	}
};
const PUT_edit_comment = async (req, res, next) => {
	// Check if :blogId is valid
	const blogId = parseInt(req.params.blogId);
	if (isNaN(blogId)) {
		return res.status(400).json({ error: 'Invalid blog id' });
	}
	// Check if :commentId is valid
	const commentId = parseInt(req.params.commentId);
	if (isNaN(commentId)) {
		return res.status(400).json({ error: 'Invalid comment id' });
	}

	// Check for validation/sanitization errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array().map((error) => error.msg),
		});
	}

	try {
		// Check if blog exists
		const blog = await prisma.blog.findUnique({ where: { id: blogId } });
		if (!blog) return res.status(404).json({ error: 'Blog not found' });

		// Check if comment exists
		const comment = await prisma.comment.findUnique({
			where: { id: commentId },
		});
		if (!comment) return res.status(404).json({ error: 'Comment not found' });

		// Check if user is comment.author
		if (req.user.username !== comment.author)
			return res.status(403).json({
				error: "Can't update comment, comment doesn't belong to current user",
			});

		// Modify comment in database
		const updatedComment = await prisma.comment.update({
			where: { id: commentId },
			data: {
				body: req.body.body,
			},
		});
		console.log(
			'*---\nComment updated:\n-Old body:',
			comment.body,
			'\n-New body:',
			updatedComment.body
		);

		// Return updated comment
		return res.json({ message: 'Comment updated', comment: updatedComment });
	} catch (error) {
		console.error(
			`Error handling request PUT /blog/${blogId}/comments/${commentId}: `,
			error
		);
		return next(error);
	}
};
const DELETE_blog = async (req, res, next) => {
	// Check if :blogId is valid
	const blogId = parseInt(req.params.blogId);
	if (isNaN(blogId)) {
		return res.status(400).json({ error: 'Invalid blog id' });
	}

	try {
		// Check if blog exists
		const blog = await prisma.blog.findUnique({ where: { id: blogId } });
		if (!blog) return res.status(404).json({ error: 'Blog not found' });

		// Check if user is blog.author
		if (req.user.id !== blog.userId)
			return res.status(403).json({
				error: "Can't delete blog, blog doesn't belong to current user",
			});

		// Delete comments associated in database
		await prisma.comment.deleteMany({
			where: { blogId: blogId },
		});
		// Delete blog in database
		const deletedBlog = await prisma.blog.delete({
			where: { id: blogId },
		});

		console.log('*---\nBlog deleted:\n-title:', blog.title, '\n-body:', blog.body);

		// Return deleted blog
		return res.json({ message: 'Blog deleted', blog: deletedBlog });
	} catch (error) {
		console.error(`Error handling request DELETE /blog/${blogId}: `, error);
		return next(error);
	}
};
const DELETE_comment = async (req, res, next) => {
	// Check if :blogId is valid
	const blogId = parseInt(req.params.blogId);
	if (isNaN(blogId)) {
		return res.status(400).json({ error: 'Invalid blog id' });
	}
	// Check if :commentId is valid
	const commentId = parseInt(req.params.commentId);
	if (isNaN(commentId)) {
		return res.status(400).json({ error: 'Invalid comment id' });
	}

	try {
		// Check if blog exists
		const blog = await prisma.blog.findUnique({ where: { id: blogId } });
		if (!blog) return res.status(404).json({ error: 'Blog not found' });

		// Check if comment exists
		const comment = await prisma.comment.findUnique({
			where: { id: commentId },
		});
		if (!comment) return res.status(404).json({ error: 'Comment not found' });

		// Check if user is comment.author
		if (req.user.username !== comment.author)
			return res.status(403).json({
				error: "Can't delete comment, comment doesn't belong to current user",
			});

		// Delete comment from database
		const deletedComment = await prisma.comment.delete({
			where: { id: commentId },
		});
		console.log(
			`*---\nComment deleted (from blogID:${blogId}):\n`,
			'-body:',
			deletedComment.body
		);

		// Return deleted comment
		return res.json({ message: 'Comment deleted', comment: deletedComment });
	} catch (error) {
		console.error(
			`Error handling request DELETE /blog/${blogId}/comments/${commentId} `,
			error
		);
		return next(error);
	}
};

export default {
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
