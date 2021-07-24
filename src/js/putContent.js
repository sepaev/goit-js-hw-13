import { getContent } from './getContent'
import { buildHtml } from './buildHtml'
import Notiflix from "notiflix";

export const putContent = (current, page, tag) => {
   Notiflix.Loading.circle();
   getContent(current, page)
       .then(pictures => {
           Notiflix.Loading.remove();
           buildHtml(pictures, page, tag);
       })
       .catch(error => {
           Notiflix.Loading.remove();
           console.log(error);
       })
};