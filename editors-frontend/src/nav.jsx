import { Link } from 'react-router-dom';

function Nav() {
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
					<Link to="/login">Log In</Link>
				</li>
				<li>
					<Link to="/register">Register</Link>
				</li>
				<li>
					<Link to="/error">Error</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Nav;
