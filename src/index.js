import './sass/main.scss';
import { getRefs } from './js/refs'
import { getContent } from './js/getContent'
import { HREF } from './js/constants'
import { buildHtml, createUrlForRequest, writeInnerHTML } from './js/buildHtml'

const refs = getRefs();
let CURRENT = '';

refs.searchButton.addEventListener('click', e => {
    e.preventDefault();

    CURRENT = createUrlForRequest(refs.searchBox.value);
    history.pushState(null, null, HREF + "?searchQuery=" + CURRENT);
    getContent(CURRENT)
        .then(pictures => buildHtml(pictures, refs.gallerySection))
        .catch(error => console.log(error))
});

refs.searchBox.addEventListener('input', e => {
    if (CURRENT) {
        let urlRequest = createUrlForRequest(refs.searchBox.value);
        if (urlRequest < CURRENT) {
            CURRENT = '';
            writeInnerHTML(refs.gallerySection, '');
        }
    }
})
