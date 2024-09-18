import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Nav from './nav';
import AllBlogs from './all-blogs';
import Blog from './blog';
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
				<Route path="/" element={<AllBlogs />} />
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
				<Route path="/blog">
					<Route path=":blogId" element={<Blog isAuthenticated={isAuthenticated} />} />
				</Route>
				<Route path="*" element={<Error />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
