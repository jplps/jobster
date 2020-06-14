import React from 'react';
import { BrowserRouter as AppRouter, Switch, Route } from 'react-router-dom';

import Layout from './components/Layout';
import JobList from './components/JobList';
import JobDescription from './components/JobDescription';

const App = () => {
	return (
		<Layout>
			<AppRouter>
				<Switch>
					<Route exact path="/" component={JobList} />
					<Route path="/:companySlug/:jobSlug" component={JobDescription} />
				</Switch>
			</AppRouter>
		</Layout>
	);
}

export default App;
