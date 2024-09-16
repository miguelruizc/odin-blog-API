import { Router } from 'express';
const router = Router();
import { POST_login } from '../controllers/login';
import { credentialsSanitization } from '../misc/userInputSanitization';

router.post('/', credentialsSanitization(), POST_login);

export default router;
