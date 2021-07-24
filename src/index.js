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
let pageHeight = document.documentElement.scrollHeight;

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
    // if (PAGE === 1) pageHeight = document.documentElement.scrollHeight;
    pageHeight = document.documentElement.scrollHeight / PAGE;
    const index = pageHeight * PAGE - currentPosition - 100;

    if (index < 500 && pageHeight > 2000) {

        if (PAGE < 13) {
            console.log('page '+ PAGE);
            console.log(index);
            PAGE++;
            putContent(CURRENT, PAGE, refs.gallerySection);
        } else {
            debounce(Notiflix.Notify.warning("We're sorry, but you've reached the end of search results."), 3000);
        }
    }
    setTimeout(() => {
        if (currentPosition >= document.documentElement.scrollHeight-1) {
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
        }
    } , 500)
}), 300);
