const express = require('express');
const blogsRouter = require('./routes/blogs');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/blogs', blogsRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

// Not found (catch-all route)
app.use('*', (req, res) => {
	res.status(404).json({
		error: 'Resource not found',
	});
});

// Error handler (if next(error) is called)
app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		error: 'Internal server error',
	});
});

app.listen(PORT, () => {
	console.log(`Server running, listening port ${PORT}...`);
});
