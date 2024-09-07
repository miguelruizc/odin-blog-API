const jwt = require('jsonwebtoken');

const generateJWT = (user) => {
	return jwt.sign(
		{
			id: user.id,
			username: user.username,
			isAuthor: user.isAuthor,
		},
		process.env.JWT_SECRET_KEY,
		{
			expiresIn: '1h',
		}
	);
};

const authorizeJWT = (req, res, next) => {
	// Extract JWT from Authorization header
	const token = req.header('Authorization')?.split(' ')[1];

	// No token - Access denied: Not authenticated
	if (!token) {
		return res
			.status(403)
			.json({ message: 'Access denied: Not authenticated' });
	}

	jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
		// Invalid token - Access denied: Invalid JWT
		if (err)
			return res.status(403).json({ message: 'Access denied: Invalid JWT' });

		// Valid token - Acess granted
		req.user = user;
		next();
	});
};

const authorizeAuthorJWT = (req, res, next) => {
	// Extract JWT from Authorization header
	const token = req.header('Authorization')?.split(' ')[1];

	// No token - Access denied: Not authenticated
	if (!token) {
		return res
			.status(403)
			.json({ message: 'Access denied: Not authenticated' });
	}

	jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
		// Invalid token - Access denied: Invalid JWT
		if (err)
			return res.status(403).json({ message: 'Access denied: Invalid JWT' });

		// Check if user is Author
		if (!user.isAuthor)
			return res.status(403).json({ message: 'Acess denied: Must be author' });

		//Acess granted
		req.user = user;
		next();
	});
};

const softAuthenticateJWT = (req, res, next) => {
	// Extract JWT from Authorization header
	const token = req.header('Authorization')?.split(' ')[1];

	if (token) {
		jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
			// If valid token: Save user info
			req.user = user;
			next();
		});
	} else {
		next();
	}
};

module.exports = {
	generateJWT,
	authorizeJWT,
	authorizeAuthorJWT,
	softAuthenticateJWT,
};
