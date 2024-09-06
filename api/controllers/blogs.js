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
const POST_create_blog = (req, res) => {
	res.json({
		message: 'Blog created',
	});
};
const POST_create_comment = (req, res) => {
	res.json({
		message: `Comment created on blog(${req.params.blogId})`,
	});
};
const PUT_edit_blog = (req, res) => {
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
