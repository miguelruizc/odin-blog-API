import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function MyBlogs() {
	const [blogs, setBlogs] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch data on mount
	useEffect(() => {
		fetch('blogapi.miguelruizc.xyz/blogs')
			.then((response) => {
				if (!response.ok) throw new Error('Something went wrong');
				return response.json();
			})
			.then((data) => {
				setBlogs(data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	}, []);

	// User not authenticated
	if (!localStorage.getItem('jwt')) return <Navigate to="/login" />;

	// JSX elements
	console.log('blogs: ', blogs);
	console.log('error: ', error);
	return (
		<div className="main blogs">
			{loading && <p>Loading...</p>}
			{error && <p>{JSON.stringify(error)}</p>}
			{blogs && <p>{JSON.stringigy(blogs)}</p>}
		</div>
	);
}

export default MyBlogs;
