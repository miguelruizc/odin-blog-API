const express = require('express');
const router = express.Router();
const c = require('../controllers/blogs');
const {
	authorizeJWT,
	softAuthenticateJWT,
	authorizeAuthorJWT,
} = require('../misc/jwt');
const {
	blogSanitization,
	commentSanitization,
} = require('../misc/userInputSanitization');

router.get('/', c.GET_all_blogs);
router.get('/:blogId', c.GET_one_blog);
router.get('/:blogId/comments', c.GET_all_comments);
router.get('/:blogId/comments/:commentId', c.GET_one_comment);

router.post('/', authorizeAuthorJWT, blogSanitization(), c.POST_create_blog);
router.post(
	'/:blogId/comments',
	softAuthenticateJWT,
	commentSanitization(),
	c.POST_create_comment
);

router.put('/:blogId', authorizeAuthorJWT, blogSanitization(), c.PUT_edit_blog);
router.put(
	'/:blogId/comments/:commentId',
	commentSanitization(),
	authorizeJWT,
	c.PUT_edit_comment
);

router.delete('/:blogId', authorizeAuthorJWT, c.DELETE_blog);
router.delete('/:blogId/comments/:commentId', authorizeJWT, c.DELETE_comment);

module.exports = router;
