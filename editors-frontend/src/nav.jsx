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
						<div className="blogsNav">
							<li>
								<Link to="/">My Blogs</Link>
							</li>
							<li>
								<Link to="/new-blog">New Blog</Link>
							</li>
						</div>
						<div className="loginLogout">
							<li className="usernameNav"> ✦{localStorage.getItem('username')}</li>
							<li>
								<Link to="/logout">| Log Out</Link>
							</li>
						</div>
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
						<div className="loginLogout">
							<li>
								<Link to="/login">Log In</Link>
							</li>
							<li>
								<Link to="/register">Register</Link>
							</li>
						</div>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Nav;
