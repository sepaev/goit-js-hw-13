// import
export const buildHtml = (response, target) => {
    const total = response.totalHits
    if (total === 0) {
        target.innerHTML = 'Not found';
        return [];
    } else {
        let text = `<h1>found ${total} pictures</h1>`;
        let respHits = response.hits;
        let pictures = [];
        respHits.forEach(fullInfo => {
            let picture = pictureCutInfo(fullInfo);
            text += `<img href="${picture.webformatURL}">`;
            text += `<p>${picture.tags}</p>`;
            
            console.log(picture);
            pictures.push(picture);
        });

        target.innerHTML = text;
        return pictures;
    }
}
const pictureCutInfo = fullInfo => {
            let { webformatURL, largeImageURL, tags, likes, views, comments, downloads  } = fullInfo;
            return { webformatURL, largeImageURL, tags, likes, views, comments, downloads};
}