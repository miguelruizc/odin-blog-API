import { Router } from 'express';
const router = Router();
import { POST_register } from '../controllers/register.js';
import { credentialsSanitization } from '../misc/userInputSanitization.js';

router.post('/', credentialsSanitization(), POST_register);

export default router;
