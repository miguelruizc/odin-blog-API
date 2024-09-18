import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../misc/formatDate.js';

function Blog() {
	const [blog, setBlog] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const { blogId } = useParams();

	// Fetch blog on mount
	useEffect(() => {
		fetchBlog();
	}, []);

	// Fetch blog
	function fetchBlog() {
		// Fetch data and populate blogs/error/loading
		fetch(`https://blogapi.miguelruizc.xyz/blogs/${blogId}`)
			.then((response) => {
				if (!response.ok) throw new Error('Something went wrong');
				response
					.json()
					.then((data) => {
						setBlog(data.blog);
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
	}

	// Create comment cards
	function commentCards() {
		return blog.comments.map((comment, index) => (
			<div key={index} className="commentCard">
				<p>{comment.body}</p>
				<p>
					{comment.author}[{formatDate(comment.createdAt)}]
				</p>
			</div>
		));
	}

	// Blog details
	return (
		<div className="main blog-details">
			<h1>Blog Details</h1>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{!loading && !error && (
				<>
					<h2>{blog.title}</h2>
					<p>{blog.body}</p>
					<p>Author: {blog.author.username}</p>
					<div className="comments">
						<h3>Comments: </h3>
						{blog.comments.length > 0 ? commentCards() : <p>No comments...</p>}
					</div>

					<form action="">
						<div>
							<label htmlFor="comment">Comment: </label>
							<textarea name="comment"></textarea>
						</div>
						<button type="submit">Submit</button>
					</form>
				</>
			)}
		</div>
	);
}

export default Blog;
