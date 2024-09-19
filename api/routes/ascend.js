import { Router } from 'express';
const router = Router();
import { POST_ascend } from '../controllers/ascend.js';
import { authorizeJWT } from '../misc/jwt.js';

router.post('/', authorizeJWT, POST_ascend);

export default router;
