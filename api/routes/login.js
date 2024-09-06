const express = require('express');
const router = express.Router();
const { POST_login } = require('../controllers/login');
const { credentialsSanitization } = require('../misc/userInputSanitization');

router.post('/', credentialsSanitization(), POST_login);

module.exports = router;
