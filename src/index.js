import './sass/main.scss';
import Notiflix from "notiflix";
import { getRefs } from './js/refs'
import { HREF } from './js/constants'
import { createUrlForRequest, writeInnerHTML } from './js/buildHtml'
import { putContent } from './js/putContent';
import { debounce } from "debounce";

const refs = getRefs();
let CURRENT = '';
let PAGE = 1;
let documentHeight = document.documentElement.scrollHeight;

refs.searchButton.addEventListener('click', e => {
    e.preventDefault();
    
    writeInnerHTML(refs.gallerySection, '');
    CURRENT = createUrlForRequest(refs.searchBox.value);
    history.pushState(null, null, HREF + "?searchQuery=" + CURRENT);
    putContent(CURRENT, PAGE, refs.gallerySection);
});

refs.searchBox.addEventListener('input', () => {
    if (CURRENT) {
        let urlRequest = createUrlForRequest(refs.searchBox.value);
        if (urlRequest < CURRENT) {
            CURRENT = '';
            PAGE = 1;
            writeInnerHTML(refs.gallerySection, '');
        }
    }
})

window.addEventListener('scroll', debounce(() => {
    const currentPosition = window.scrollY + document.documentElement.clientHeight;
    if (PAGE === 1) documentHeight = document.documentElement.scrollHeight;
    const index = documentHeight * PAGE - currentPosition;

    if (index <= 400 && documentHeight > 2000) {
        console.log(documentHeight);
        console.log(documentHeight * PAGE - currentPosition);
        PAGE++;
        putContent(CURRENT, PAGE, refs.gallerySection);
    }
    setTimeout(() => {
        if (currentPosition === document.documentElement.scrollHeight) {
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
        }
    } , 200)
}), 200);
