function Login() {
	// Submit form function
	const submitForm = async (event) => {
		event.preventDefault();

		// Send form data to API
		const formData = new FormData(event.target);
		const username = formData.get('username');
		const password = formData.get('password');

		try {
			const response = await fetch('https://blogapi.miguelruizc.xyz/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username,
					password,
				}),
			});

			// Response NOT OK
			if (!response.ok) {
				const jsonResponse = await response.json();
				console.log('Response not OK: ');
				console.log(jsonResponse);
				return;
			}

			// Response OK
			const jsonResponse = await response.json();
			console.log('Response OK: ');
			console.log(jsonResponse);

			// Extract JWT and store locally
			// ---
			// Redirect to the wakawaka
		} catch (error) {
			console.error('Error sending form data: ', error);
		}
	};

	// JSX elements
	return (
		<div className="main login">
			<form onSubmit={submitForm}>
				<div>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="username"
						// pattern="^[a-zA-Z0-9]+$"
						// title="Special characters and spaces are not allowed"
						// required
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						// pattern="^[a-zA-Z0-9]+$"
						// title="Special characters and spaces are not allowed"
						// required
					/>
				</div>
				<button type="submit">Log In</button>
				<div className="errors"></div>
			</form>
		</div>
	);
}

export default Login;
