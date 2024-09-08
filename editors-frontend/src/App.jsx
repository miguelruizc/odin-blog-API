import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './nav';
import MyBlogs from './my-blogs';
import NewBlog from './new-blog';
import EditBlog from './edit-blog';
import Register from './register';
import Login from './login';
import Error from './error';

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<Routes>
				<Route path="/" element={<MyBlogs />} />
				<Route path="/new-blog" element={<NewBlog />} />
				<Route path="/edit-blog" element={<EditBlog />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
