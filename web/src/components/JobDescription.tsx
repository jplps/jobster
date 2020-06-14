import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Markdown from 'react-markdown';

import api from '../services/api';

interface Job {
	id: string;
	slug: string;
	title: string;
	commitment: {
		title: string;
	};
	description: string;
	postedAt: string;
}

interface JobMatch {
	jobSlug: string;
	companySlug: string;
}


const JobDescription = ({ match }: RouteComponentProps<JobMatch>) => {
	const [job, setJob] = useState<Job>({
		id: '', commitment: { title: '' }, postedAt: '', slug: '', title: '', description: ''
	});

	const { jobSlug } = match.params;
	const { companySlug } = match.params;

	const query = `
		query {
			job(input: {
				jobSlug: "${jobSlug}" 
				companySlug: "${companySlug}"
			}) {
				id,
				slug,
				title,
				commitment {
					title
				},
				description,
				postedAt
			}
		}
	`;

	useEffect(() => {
		api({ data: { query } })
			.then(response => {
				setJob(response.data.data.job);
			});
	}, [query]);

	return (
		<>
			{match.isExact && !job
				? <p>Loading Job details...</p>
				: <div className="job-description grid">
					<h1>{job.title}</h1>

					<span>
						{job.postedAt}
						<br />
						{job.commitment.title}
					</span>

					<hr />
					<Markdown source={job.description} />
					<hr />
				</div>
			}
		</>
	);
}

export default JobDescription;