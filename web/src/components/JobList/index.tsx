import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

interface Job {
	id: string;
	slug: string;
	title: string;
	commitment: {
		title: string;
	};
	company: {
		slug: string;
	};
	postedAt: Date;
}

const query = `
  query {
    jobs {
			id,
      slug,
      title,
      commitment {
        title
			},
			company {
				slug
			},
      postedAt
    }
  }
`;

const JobList = () => {
	const [jobs, setJobs] = useState<Job[]>([]);

	const getAllJobs = async () => {
		const { data } = await api({ data: { query } });
		setJobs(data.data.jobs);
	}

	useEffect(() => {
		getAllJobs();
	}, []);

	return (
		<>
			<h1>Job List</h1>

			<hr />
			<ul className="job-list grid">
				{jobs.length < 1
					? <p>Loading Jobs from API...</p>
					: jobs.map(job => (
						<Link to={`/${job.company.slug}/${job.slug}`} key={job.id}>
							<li>
								<p>{job.title}</p>
								<span>{job.postedAt}</span>
								<br />
								<span>{job.commitment.title}</span>
							</li>
						</Link>
					))}
			</ul>
			<hr />
		</>
	);
}

export default JobList;