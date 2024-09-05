const express = require('express');
const router = express.Router();
const { POST_register } = require('../controllers/register');
const { credentialsSanitization } = require('../misc/userInputSanitization');

router.post('/', credentialsSanitization(), POST_register);

module.exports = router;
