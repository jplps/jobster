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
		name: string;
		slug: string;
	};
	postedAt: string;
	isPublished: boolean;
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
				name,
				slug
			},
			postedAt,
			isPublished
    }
  }
`;

const JobList = () => {
	const [jobs, setJobs] = useState<Job[]>([]);

	const getAllJobs = async () => {
		const { data } = await api({ data: { query } });

		const publishedJobs = data.data.jobs.filter((job: Job) => job.isPublished === true);

		setJobs(publishedJobs);
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

								<span>
									<span>{job.company.name}</span> - {job.commitment.title}
									<br />
									{new Date(job.postedAt).toLocaleString()}
								</span>
							</li>
						</Link>
					))}
			</ul>
			<hr />
		</>
	);
}

export default JobList;