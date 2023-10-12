import axios from 'axios';

const axiosConfig = {
	baseURL: 'https://restcountries.com/v3.1/',
}

const nationalityInstance = axios.create(axiosConfig);

export default nationalityInstance;