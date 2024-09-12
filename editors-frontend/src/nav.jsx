import { Link } from 'react-router-dom';

function Nav({ isAuthenticated, setIsAuthenticated }) {
	if (isAuthenticated) {
		return (
			<nav>
				<h2>EditorsFrontend</h2>
				<ul>
					<li>
						<Link to="/">My Blogs</Link>
					</li>
					<li>
						<Link to="/new-blog">New Blog</Link>
					</li>
					<li>
						<Link to="/edit-blog">Edit Blog</Link>
					</li>
					<li>
						<Link to="/logout">Log Out</Link>
					</li>
				</ul>
			</nav>
		);
	} else {
		return (
			<nav>
				<h2>EditorsFrontend</h2>
				<ul>
					<li>
						<Link to="/login">Log In</Link>
					</li>
					<li>
						<Link to="/register">Register</Link>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Nav;
