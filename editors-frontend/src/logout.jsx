import { Navigate } from 'react-router-dom';

function Logout({ setIsAuthenticated }) {
	// Remove user info from local storage
	localStorage.clear();
	setIsAuthenticated(false);

	// Redirect to home
	return <Navigate to="/" />;
}

export default Logout;
