import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorIcon from '../img/error.svg';

export function imgTemplate(img) {
  const {
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
    largeImageURL,
  } = img;

  const tagsString = [...new Set(tags.split(', ').map(tag => tag.trim()))]
    .slice(0, 3)
    .join(', ');

  return `<li class="gallery-item" >
            <a href="${largeImageURL}" class="gallery-link">
              <img class="image" src="${webformatURL}" alt="${tagsString}" />
            </a>
            <div class="img-info">
              <p class="gallery-desc">Likes <span>${likes}</span></p>
              <p class="gallery-desc">Views <span>${views}</span></p>
              <p class="gallery-desc">Comments <span>${comments}</span></p>
              <p class="gallery-desc">Downloads <span>${downloads}</span></p>
            </div>
          </li>`;
}

export function imgsTemplate(arr) {
  return arr.map(imgTemplate).join('');
}

export function showError() {
  iziToast.error({
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
    messageColor: '#ffffff',
    color: '#EF4040',
    iconUrl: errorIcon,
  });
}

export function showMessage() {
  iziToast.info({
    message: `We're sorry, but you've reached the end of search results.
`,
    position: 'topRight',
    messageColor: '#ffffff',
    color: '#3498db',
  });
}
