import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function EditBlog() {
	const { blogId } = useParams();
	// User not authenticated
	if (!localStorage.getItem('jwt')) return <Navigate to="/login" />;
	return <h1>Edit Blog ID({blogId})</h1>;
}

export default EditBlog;
