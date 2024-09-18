import { Link } from 'react-router-dom';

function Nav({ isAuthenticated }) {
	if (isAuthenticated) {
		return (
			<nav>
				<h2>ReadersFrontend</h2>
				<ul>
					<li>
						<Link to="/">All blogs</Link>
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
				<h2>ReadersFrontend</h2>
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
