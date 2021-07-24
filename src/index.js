import './sass/main.scss';
import Notiflix from "notiflix";
import { getRefs } from './js/refs'
import { HREF } from './js/constants'
import { createUrlForRequest, writeInnerHTML } from './js/buildHtml'
import { takeContent } from './js/takeContent';
import { debounce } from "debounce";

let current = '', page = 1, pageHeight = document.documentElement.scrollHeight;
const refs = getRefs();

if (HREF[1]) {
    window.scrollTo(1, 1);
    refs.searchBox.value = HREF[2];
    takeContent(HREF[1], page, refs.gallerySection);
    current = HREF[1];
}
refs.searchButton.addEventListener('click', e => {
    e.preventDefault();
    
    refresh();
    current = createUrlForRequest(refs.searchBox.value);
    history.pushState(null, null, HREF[0] + "?searchQuery=" + current);
    takeContent(current, page, refs.gallerySection);
});

refs.searchBox.addEventListener('input', () => {
    if (current) {
        let urlRequest = createUrlForRequest(refs.searchBox.value);
        if (urlRequest < current) {
            refresh();
        }
    }
    if (!refs.searchBox.value) history.pushState(null, null, HREF[0]);
})

window.addEventListener('scroll', debounce(() => {
    const currentPosition = window.scrollY + document.documentElement.clientHeight;
    pageHeight = document.documentElement.scrollHeight / page;
    const index = pageHeight * page - currentPosition;

    if (index < 600 && pageHeight > 2000) {

        if (page < 13) {
            page++;
            takeContent(current, page, refs.gallerySection);
        } else {
            debounce(Notiflix.Notify.warning("We're sorry, but you've reached the end of search results."), 3000);
        }
    }
    if (refs.gallerySection.innerHTML) {
        setTimeout(() => {
            if (currentPosition >= document.documentElement.scrollHeight - 1) {
                Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
            }
        }, 500)
    }
}), 300);

const refresh = () => {
    current = '';
    page = 1;
    writeInnerHTML(refs.gallerySection, '');
    pageHeight = document.documentElement.scrollHeight;
};
