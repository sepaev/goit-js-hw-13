import './sass/main.scss';
import { getRefs } from './js/refs'
import { fetchContent } from './js/searchContent'
import { buildHtml } from './js/buildHtml'
import { Loading } from 'notiflix';
const refs = getRefs();
const startHref = document.URL.split('?')[0]+"?searchQuery=";

refs.searchButton.addEventListener('click', e => {
    e.preventDefault();

    const searchRequest = refs.searchBox.value.trim();
    const urlRequest = searchRequest.split(' ').join('+').toLowerCase();
    // e.view.location.href = startHref + urlRequest;
    history.pushState(null, null, startHref + urlRequest);
    fetchContent(urlRequest)
        .then(pictures => buildHtml(pictures, refs.searchSection))
        .catch(error => console.log(error))
});

