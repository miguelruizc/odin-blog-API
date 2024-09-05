const express = require('express');
const blogsRouter = require('./routes/blogs');

const app = express();
const PORT = process.env.PORT || 3000;

// Blogs route
app.use('/blogs', blogsRouter);

// Not found (catch-all route)
app.use('*', (req, res) => {
	res.status(404).json({
		error: 'Resource not found',
	});
});

// Error handler (if next(error) is called)
app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		error: err.message || 'Internal server error',
	});
});

app.listen(PORT, () => {
	console.log(`Server running, listening port ${PORT}...`);
});
