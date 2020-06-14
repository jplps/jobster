import React, { useState, ChangeEvent, FormEvent } from 'react';

import api from '../services/api';

const NewsletterForm = () => {
	const [formData, setFormData] = useState({ name: '', email: '' });

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	}

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		const { name, email } = formData;

		const query = `
			mutation {
				subscribe(input: {
					name: "${name}",
					email: "${email}"
				}) {
					name,
					subscribe
				}
			}
		`;

		const { data } = await api({ data: { query } });
		alert(data.data.subscribe ? 'Subscribed!' : 'There was an error. Please try again!')
	}

	return (
		<form className="grid" onSubmit={handleSubmit}>
			<fieldset>
				<legend style={{ display: 'none' }}>Newsletter Subscription</legend>

				<input type="text" name="name" id="name" title="Insert your name." placeholder="Name" onChange={handleInputChange} required />
				<input type="email" name="email" id="email" title="Insert you e-mail." placeholder="E-mail" onChange={handleInputChange} required />
			</fieldset>

			<button type="submit">Subscribe</button>
		</form>
	)
}

export default NewsletterForm;
