import { Navigate } from 'react-router-dom';

function MyBlogs() {
	// User not authenticated
	if (!localStorage.getItem('jwt')) return <Navigate to="/login" />;

	// JSX elements
	return <div className="main blogs">List blogs</div>;
}

export default MyBlogs;
