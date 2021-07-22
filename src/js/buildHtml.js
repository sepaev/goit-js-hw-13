import Notiflix from "notiflix";
import imgGrid from '../templates/imgGrid.hbs';

export const buildHtml = (response, target) => {
    const total = response.totalHits
    if (total === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        writeInnerHTML(target, '');
        return [];
    } else {
        console.dir(response);
        Notiflix.Notify.success(`Hooray! We found ${total} images.`);
        writeInnerHTML(target, createTextHTML(response.hits))
    }
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
    obj.innerHTML = html;
}

export const createUrlForRequest = (text) => {
    const textArray = text.trim().split(' ');
    let joinedText = '';

    textArray.map(word => {
        if (word) joinedText += word.toLowerCase() + '+';
    });

    return joinedText.slice(0, -1);
}