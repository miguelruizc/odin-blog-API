import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../misc/formatDate.js';

function Blog({ isAuthenticated }) {
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

	// Submit comment handler
	const submitComment = () => {
		event.preventDefault();

		// Get errors div
		const errorsDiv = document.querySelector('.errors');
		errorsDiv.innerHTML = '';

		// Send form data to API
		const formData = new FormData(event.target);
		const comment = formData.get('comment');
		event.target.reset();

		fetch(`https://blogapi.miguelruizc.xyz/blogs/${blogId}/comments`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				body: comment,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					// Show errors in errors div
					return response
						.json()
						.then((json) => (errorsDiv.textContent = JSON.stringify(json.errors)));
				}
				// Fetch blog again with new comment to refresh
				fetchBlog();
			})
			.catch((error) => {
				console.error(error);
				// Show errors in errors div
				errorsDiv.textContent = error;
			});
	};

	// Create comment cards
	function commentCards() {
		return blog.comments.map((comment, index) => (
			<div key={index} className="commentCard">
				<p>{comment.body}</p>
				<p className="signature">
					-by <strong>{comment.author}</strong> on {formatDate(comment.createdAt)}
				</p>
			</div>
		));
	}

	// Create comment form (deactivated if not authenticated)
	const commentTextarea = (
		<textarea
			name="comment"
			required
			maxLength={150}
			minLength={3}
			title={isAuthenticated ? '' : 'Authenticate to post comments'}
			disabled={isAuthenticated ? false : true}
		></textarea>
	);
	const submitCommentButton = (
		<button type="submit" disabled={isAuthenticated ? false : true}>
			{isAuthenticated ? 'Submit' : 'Log in to comment'}
		</button>
	);
	// Blog details
	return (
		<div className="main blog-details">
			<h2>Blog Details</h2>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{!loading && !error && (
				<>
					<h3>{blog.title}</h3>
					<p>{blog.body}</p>
					<p className="signature">
						-by <strong>{blog.author.username}</strong> on {formatDate(blog.createdAt)}
					</p>
					<div className="comments">
						<h3>Comments: </h3>
						{blog.comments.length > 0 ? commentCards() : <p>No comments...</p>}
					</div>

					<form className="commentForm" action="" onSubmit={submitComment}>
						<div>
							<label htmlFor="comment">Comment: </label>
							{commentTextarea}
						</div>
						{submitCommentButton}
					</form>
					<div className="errors"></div>
				</>
			)}
		</div>
	);
}

export default Blog;

//minLength={3} maxLength={150} required
