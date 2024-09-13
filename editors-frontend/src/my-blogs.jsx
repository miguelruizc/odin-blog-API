import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { formatDate } from '../misc/formatDate';
import { Link } from 'react-router-dom';

function MyBlogs() {
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

	// User not authenticated
	if (!localStorage.getItem('jwt')) return <Navigate to="/login" />;

	// Delete blog handler
	const handleDelete = (blogId, event) => {
		event.preventDefault();
		fetch(`https://blogapi.miguelruizc.xyz/blogs/${blogId}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
		})
			.then((response) => {
				if (!response.ok) {
					alert('Something went wrong, response not OK');
				}
				// Item deleted, force rerender
				fetchBlogs();
			})
			.catch((error) => {
				console.error(error.message);
				alert(`Something went wrong: ${error.message}`);
			});
	};

	// Create blog cards
	let blogCards;
	if (blogs) {
		blogCards = blogs.map((blog) => {
			console.log(blog);
			return (
				<div className="blogCard" key={blog.id}>
					<h3>{blog.title}</h3>
					<p>{blog.body}</p>
					<p>Author: {blog.author.username}</p>
					<p>{formatDate(blog.createdAt)}</p>
					<Link to={`/edit-blog/${blog.id}`}>Edit</Link>
					<a href="" onClick={() => handleDelete(blog.id, event)}>
						Delete
					</a>
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
			{blogs && blogCards}
		</div>
	);
}

export default MyBlogs;
