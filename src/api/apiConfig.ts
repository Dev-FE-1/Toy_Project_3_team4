import axios from 'axios';

const API_VERSION = 'v1';
const BASE_URL = `http://localhost:5001/toy-project-2-team-4-pizza/us-central1/api/${API_VERSION}`;

export const LIMIT = 2;
export const USER_ID = 'LOqpUwROHvMHB2gJri49';

export const axiosApi = axios.create({
  baseURL: BASE_URL,
});

export default BASE_URL;
