const express = require('express');
const router = express.Router();
const c = require('../controllers/blogs');
const { authorizeJWT } = require('../misc/jwt');
const { blogSanitization } = require('../misc/userInputSanitization');

router.get('/', c.GET_all_blogs);
router.get('/:blogId', c.GET_one_blog);
router.get('/:blogId/comments', c.GET_all_comments);
router.get('/:blogId/comments/:commentId', c.GET_one_comment);

router.post('/', authorizeJWT, blogSanitization(), c.POST_create_blog);
router.post('/:blogId/comments', c.POST_create_comment);

router.put('/:blogId', authorizeJWT, blogSanitization(), c.PUT_edit_blog);
router.put('/:blogId/comments/:commentId', authorizeJWT, c.PUT_edit_comment);

router.delete('/:blogId', authorizeJWT, c.DELETE_blog);
router.delete('/:blogId/comments/:commentId', authorizeJWT, c.DELETE_comment);

module.exports = router;
