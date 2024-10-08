import express, { json, urlencoded } from 'express';
import blogsRouter from './routes/blogs.js';
import registerRouter from './routes/register.js';
import loginRouter from './routes/login.js';
import ascendRouter from './routes/ascend.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration
const corsOptions = {
	origin: '*',
};

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Routes
app.use('/blogs', blogsRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/ascend', ascendRouter);

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
