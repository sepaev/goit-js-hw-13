import { API_KEY, API_URL } from './constants';
import axios from 'axios';
axios.defaults.baseURL = `${API_URL}`;

export const fetchContent = async req => {
    const response = await axios.get(`?key=${API_KEY}&q=${req}&image_type=photo`);
    return response.data;

}


// https://pixabay.com/api/?key=22594439-4316377fda5f0b6c1b052f095&q=yellow+flowers&image_type=photo
// https://pixabay.com/api/?key=22594439-4316377fda5f0b6c1b052f095/&q=cat&image_type=photo    