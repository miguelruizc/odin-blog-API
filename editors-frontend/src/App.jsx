import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Nav from './nav';
import MyBlogs from './my-blogs';
import NewBlog from './new-blog';
import EditBlog from './edit-blog';
import Register from './register';
import Login from './login';
import Logout from './logout';
import Error from './error';
import Footer from './footer';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(
		Boolean(localStorage.getItem('jwt'))
	);

	return (
		<BrowserRouter>
			<Nav isAuthenticated={isAuthenticated} />
			<Routes>
				<Route path="/" element={<MyBlogs />} />
				<Route
					path="/new-blog"
					element={<NewBlog setIsAuthenticated={setIsAuthenticated} />}
				/>
				<Route path="/edit-blog" element={<EditBlog />}>
					<Route path=":blogId" />
				</Route>
				<Route
					path="/register"
					element={<Register setIsAuthenticated={setIsAuthenticated} />}
				/>
				<Route
					path="/login"
					element={<Login setIsAuthenticated={setIsAuthenticated} />}
				/>
				<Route
					path="/logout"
					element={<Logout setIsAuthenticated={setIsAuthenticated} />}
				/>
				<Route path="*" element={<Error />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
