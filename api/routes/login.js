const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	res.json({
		message: 'User authenticated',
	});
});

module.exports = router;
