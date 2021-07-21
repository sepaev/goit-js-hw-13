import './sass/main.scss';
import { getRefs } from './js/refs'
import { getContent } from './js/getContent'
import { buildHtml } from './js/buildHtml'
import { Loading } from 'notiflix';
const refs = getRefs();
const startHref = document.URL.split('?')[0]+"?searchQuery=";

refs.searchButton.addEventListener('click', e => {
    e.preventDefault();
    
    let joinedText;
    let urlRequest;
    const urlRequestArr = refs.searchBox.value.trim().split(' ');
    
        urlRequestArr.forEach(word => { if (word) joinedText += word.toLowerCase() + '+'; });
        urlRequest = joinedText.slice(0, -1);
        history.pushState(null, null, startHref + urlRequest);
        
        getContent(urlRequest)
            .then(pictures => buildHtml(pictures, refs.searchSection))
            .catch(error => console.log(error))
});

