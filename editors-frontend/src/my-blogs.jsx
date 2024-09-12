import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function MyBlogs() {
	const [blogs, setBlogs] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch data on mount
	useEffect(() => {
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
	}, []);

	// User not authenticated
	if (!localStorage.getItem('jwt')) return <Navigate to="/login" />;

	// Create blog cards
	let blogCards;
	if (blogs) {
		blogCards = blogs.map((blog) => {
			console.log(blog);
			return (
				<div className="blogCard" key={blog.id}>
					<h3>{blog.title}</h3>
					<p>{blog.body}</p>
					<p>{blog.author}</p>
					<p>{blog.createdAt}</p>
				</div>
			);
		});
	}

	// JSX elements
	return (
		<div className="main blogs">
			<h2>My Blogs</h2>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{blogs && <p>{blogCards}</p>}
		</div>
	);
}

export default MyBlogs;
