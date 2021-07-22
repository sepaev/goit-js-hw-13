import { API_KEY, API_URL } from './constants';
import axios from 'axios';
export let OPTIONS = {
    key: API_KEY,
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'false',  //перед сдачей поменять
    per_page: 40,
    page: 2,
}

export const getContent = async req => {
    if (!req) return '';
    OPTIONS.q = req;
    axios.defaults.baseURL = `${API_URL}`;
    const response = await axios.get(getStringOptions(OPTIONS));
    return response.data;

}

export const getStringOptions = options => {
    const { key, q, image_type, orientation, safesearch, per_page, page } = options;
    if (!key || !q) return '';

    let stringOptions = '?';
    stringOptions += 'key=' + key;
    stringOptions += '&q=' + q;
    if (image_type) stringOptions += '&image_type=' + image_type;
    if (orientation) stringOptions += '&orientation=' + orientation;
    if (safesearch) stringOptions += '&safesearch=' + safesearch;
    if (per_page) stringOptions += '&per_page=' + per_page;
    if (page) stringOptions += '&page=' + page;

    return stringOptions;

}
