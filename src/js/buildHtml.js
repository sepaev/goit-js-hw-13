import Notiflix from "notiflix";
import imgGrid from '../templates/imgGrid.hbs';

export const buildHtml = (response, page, target) => {
    const total = response.totalHits
    if (total === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        writeInnerHTML(target, '');
    } else {
        if (page === 1) Notiflix.Notify.success(`Hooray! We found ${total} images.`);
        if (response.hits.length > 0) {
            writeInnerHTML(target, createTextHTML(response.hits));
        }
    }
    return response;
}

const createTextHTML = (obj) => {
    return obj.map(picture => imgGrid({
        webformatURL: picture.webformatURL,
        largeImageURL: picture.largeImageURL,
        tags: picture.tags,
        likes: picture.likes,
        views: picture.views,
        comments: picture.comments,
        downloads: picture.downloads,
    })).join('')
}

export const writeInnerHTML = (obj, html) => {
    if (html) {
        obj.innerHTML += html;
    } else {
        obj.innerHTML = html
    }
}

export const createUrlForRequest = (text) => {
    const textArray = text.trim().split(' ');
    let joinedText = '';

    textArray.map(word => {
        if (word) joinedText += word.toLowerCase() + '+';
    });

    return joinedText.slice(0, -1);
}