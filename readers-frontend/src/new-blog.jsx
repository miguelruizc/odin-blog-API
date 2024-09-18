import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function NewBlog() {
	const navigate = useNavigate();

	// User not authenticated
	if (!localStorage.getItem('jwt')) return <Navigate to="/login" />;

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

		fetch('https://blogapi.miguelruizc.xyz/blogs', {
			method: 'POST',
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
					return response.json().then((json) => alert(JSON.stringify(json)));
				}
				navigate('/');
			})
			.catch((error) => {
				console.error(error);
				alert(error);
				// Show errors in errors div
			});
	};

	return (
		<div className="main new-blog">
			<h1>New Blog</h1>
			<form className="newBlogForm" onSubmit={submitHandler}>
				<div>
					<label htmlFor="title">Title</label>
					<input type="text" name="title" minLength="3" maxLength="50" required />
				</div>
				<div>
					<label htmlFor="body">Body</label>
					<textarea name="body" minLength="15" required></textarea>
				</div>
				<button type="submit">Submit</button>
			</form>
			<div className="errors"></div>
		</div>
	);
}

export default NewBlog;
