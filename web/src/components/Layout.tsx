import React, { FunctionComponent } from 'react';

import NewsletterForm from './NewsletterForm';

const Layout: FunctionComponent = ({ children }) => (
	<>
		<header>
			<p><strong>Graph Jobs</strong></p>
		</header>

		<main>
			{children}
		</main>

		<footer className="grid">
			<p><strong>Subscribe to the Newsletter!</strong></p>
			<NewsletterForm />
		</footer>
	</>
)

export default Layout;