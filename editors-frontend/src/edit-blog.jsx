import { Navigate } from 'react-router-dom';

function EditBlog() {
	// User not authenticated
	if (!localStorage.getItem('jwt')) return <Navigate to="/login" />;
	return <h1>Edit Blog</h1>;
}

export default EditBlog;
