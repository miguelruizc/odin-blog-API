import { Router } from 'express';
const router = Router();
import { POST_login } from '../controllers/login.js';
import { credentialsSanitization } from '../misc/userInputSanitization.js';

router.post('/', credentialsSanitization(), POST_login);

export default router;
