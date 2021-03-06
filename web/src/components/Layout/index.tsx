import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import NewsletterForm from '../NewsletterForm';
import './styles.css';

const Layout: FunctionComponent = ({ children }) => (
	<>
		<header>
			<Link to="/"><strong>Graph Jobs</strong></Link>
		</header>

		<main>
			{children}
		</main>

		<footer className="footer grid">
			<p><strong>Subscribe to the Newsletter!</strong></p>
			<NewsletterForm />
		</footer>
	</>
)

export default Layout;