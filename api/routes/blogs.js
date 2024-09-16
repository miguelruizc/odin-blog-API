import { Router } from 'express';
const router = Router();
import {
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
} from '../controllers/blogs.js';
import { authorizeJWT, softAuthenticateJWT, authorizeAuthorJWT } from '../misc/jwt.js';
import { blogSanitization, commentSanitization } from '../misc/userInputSanitization.js';

router.get('/', GET_all_blogs);
router.get('/:blogId', GET_one_blog);
router.get('/:blogId/comments', GET_all_comments);
router.get('/:blogId/comments/:commentId', GET_one_comment);

router.post('/', authorizeAuthorJWT, blogSanitization(), POST_create_blog);
router.post(
	'/:blogId/comments',
	softAuthenticateJWT,
	commentSanitization(),
	POST_create_comment
);

router.put('/:blogId', authorizeAuthorJWT, blogSanitization(), PUT_edit_blog);
router.put(
	'/:blogId/comments/:commentId',
	commentSanitization(),
	authorizeJWT,
	PUT_edit_comment
);

router.delete('/:blogId', authorizeAuthorJWT, DELETE_blog);
router.delete('/:blogId/comments/:commentId', authorizeJWT, DELETE_comment);

export default router;
