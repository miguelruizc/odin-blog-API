import { useEffect, useState } from 'react';
import { formatDate } from '../misc/formatDate';
import { truncateString } from '../misc/truncateString.js';

function AllBlogs() {
	const [blogs, setBlogs] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch data on mount
	const fetchBlogs = () => {
		// Fetch data and populate blogs/error/loading
		fetch('https://blogapi.miguelruizc.xyz/blogs')
			.then((response) => {
				if (!response.ok) throw new Error('Something went wrong');
				response
					.json()
					.then((data) => {
						setBlogs(data);
						setLoading(false);
					})
					.catch((error) => {
						setError(error.message);
						setLoading(false);
					});
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchBlogs();
	}, []);

	// Create blog cards
	let blogCards = [];
	if (blogs) {
		// Order blogs by creation time (newer first)
		const orderedBlogs = blogs.sort(
			(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
		);
		blogCards = orderedBlogs.map((blog) => {
			return (
				<div className="blogCard" key={blog.id}>
					<h3>{blog.title}</h3>
					<p>{truncateString(blog.body, 250)}</p>
					<p className="signature">
						-by <strong>{blog.author.username}</strong> on {formatDate(blog.createdAt)}
					</p>
					<a href={`/blog/${blog.id}`}>Show more</a>
				</div>
			);
		});
	}

	// JSX elements
	return (
		<div className="main blogs">
			<h2>All Blogs</h2>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{!loading &&
				!error &&
				(blogs && blogCards.length > 0 ? blogCards : <p>No blogs found...</p>)}
		</div>
	);
}

export default AllBlogs;
