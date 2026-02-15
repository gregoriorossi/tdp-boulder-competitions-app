import axios from "axios";

const editorsApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL
});

export default editorsApi;