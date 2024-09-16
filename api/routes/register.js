import { Router } from 'express';
const router = Router();
import { POST_register } from '../controllers/register';
import { credentialsSanitization } from '../misc/userInputSanitization';

router.post('/', credentialsSanitization(), POST_register);

export default router;
