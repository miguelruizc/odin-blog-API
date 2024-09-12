import { Navigate } from 'react-router-dom';

function NewBlog() {
	// User not authenticated
	if (!localStorage.getItem('jwt')) return <Navigate to="/login" />;

	return <h1>New Blog</h1>;
}

export default NewBlog;
