import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Register({ setIsAuthenticated }) {
	const navigate = useNavigate();

	// Submit form function
	const submitForm = async (event) => {
		event.preventDefault();

		// Get errors div
		const errorsDiv = document.querySelector('.register .errors');
		errorsDiv.innerHTML = '';

		// Send form data to API
		const formData = new FormData(event.target);
		const username = formData.get('username');
		const password = formData.get('password');

		try {
			const response = await fetch('https://blogapi.miguelruizc.xyz/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username,
					password,
					isAuthor: true,
				}),
			});

			// Response NOT OK
			if (!response.ok) {
				const jsonResponse = await response.json();
				const errors = jsonResponse.errors || [jsonResponse.error];

				errors.forEach((error) => (errorsDiv.innerHTML += `<p>·${error}</p>`));
				event.target.reset();
				return;
			}

			// Response OK
			const jsonResponse = await response.json();

			// Extract JWT + username and store locally
			localStorage.setItem('jwt', jsonResponse.JWT);
			localStorage.setItem('username', username);
			localStorage.setItem('isAuthor', true);
			setIsAuthenticated(true);

			// Redirect to /home
			navigate('/');
		} catch (error) {
			console.error('Error sending form data: ', error);
		}
	};

	// JSX elements
	return (
		<div className="main register">
			<form onSubmit={submitForm}>
				<div>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="username"
						pattern="^[a-zA-Z0-9]+$"
						title="Special characters and spaces are not allowed"
						required
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						pattern="^[a-zA-Z0-9]+$"
						title="Special characters and spaces are not allowed"
						required
					/>
				</div>
				<button type="submit">Register</button>
				<div className="errors"></div>
			</form>
			<div className="donthaveanaccount">
				<p>Have an account?</p>
				<Link to="/login">Log In</Link>
			</div>
		</div>
	);
}

export default Register;
