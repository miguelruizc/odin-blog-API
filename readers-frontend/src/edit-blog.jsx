import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditBlog() {
	const [blog, setBlog] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const { blogId } = useParams();

	// Fetch blog on mount
	useEffect(() => {
		fetchBlog();
	}, []);

	// User not authenticated
	if (!localStorage.getItem('jwt')) return <Navigate to="/login" />;

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

	// User not authenticated -> redirect to /login
	if (!localStorage.getItem('jwt')) return <Navigate to="/login" />;

	// Submit handler
	const submitHandler = (event) => {
		event.preventDefault();

		// Get errors div
		const errorsDiv = document.querySelector('.errors');
		errorsDiv.innerHTML = '';

		// Send form data to API
		const formData = new FormData(event.target);
		const title = formData.get('title');
		const body = formData.get('body');
		event.target.reset();

		console.log('title: ', title);
		console.log('body: ', body);

		fetch(`https://blogapi.miguelruizc.xyz/blogs/${blogId}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: title,
				body: body,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					// Show errors in errors div
					return response.json().then((json) => setError(json.error));
				}
				setBlog({ title, body });
				navigate('/');
			})
			.catch((error) => {
				console.error(error);
				// Show errors in errors div
				setError(error.message);
			});
	};

	// Create form element
	const form = () => {
		console.log('Blog title: ', blog.title);
		console.log('Blog body: ', blog.body);
		return (
			<>
				<form className="editBlogForm" onSubmit={submitHandler}>
					<div>
						<label htmlFor="title">Title</label>
						<input
							type="text"
							name="title"
							minLength="3"
							maxLength="50"
							defaultValue={blog.title}
							required
						/>
					</div>
					<div>
						<label htmlFor="body">Body</label>
						<textarea
							name="body"
							minLength="15"
							defaultValue={blog.body}
							required
						></textarea>
					</div>
					<button type="submit">Submit</button>
				</form>
				<div className="errors"></div>
			</>
		);
	};

	return (
		<div className="main new-blog">
			<h1>Edit Blog</h1>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{!loading && !error && form()}
		</div>
	);
}

export default EditBlog;
