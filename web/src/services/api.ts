import axios from 'axios';

const api = axios.create({
	method: "POST",
	url: 'https://api.graphql.jobs/'
});

export default api;