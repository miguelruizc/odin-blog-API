import { Link } from 'react-router-dom';

function Nav({ isAuthenticated }) {
	if (isAuthenticated) {
		return (
			<nav>
				<div className="navInner">
					<a href="/">
						<h2>EditorsFrontend</h2>
					</a>
					<ul>
						<li>
							<Link to="/">My Blogs</Link>
						</li>
						<li>
							<Link to="/new-blog">New Blog</Link>
						</li>
						<li>
							<Link to="/logout">(Log Out)</Link>
						</li>
						<li>| 😎{localStorage.getItem('username')}</li>
					</ul>
				</div>
			</nav>
		);
	} else {
		return (
			<nav>
				<div className="navInner">
					<a href="/">
						<h2>EditorsFrontend</h2>
					</a>
					<ul>
						<li>
							<Link to="/login">Log In</Link>
						</li>
						<li>
							<Link to="/register">Register</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Nav;
