import { findImg } from './js/pixabay-api';
import { imgsTemplate, showError } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form-search');
const searchInput = document.querySelector('#search-input');
const button = document.querySelector('[data-search]');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('#loader');

let lightbox = null;

form.addEventListener('submit', e => {
  e.preventDefault();
  const searchValue = searchInput.value.trim();

  if (searchValue === '') {
    button.disabled = true;
    return;
  }

  button.disabled = false;
  loader.classList.remove('hidden');

  findImg(searchValue).then(data => {
    loader.classList.add('hidden');

    if (data.length === 0) {
      showError();
      gallery.innerHTML = '';
      return;
    }

    const markup = imgsTemplate(data);
    gallery.innerHTML = markup;

    if (lightbox) {
      lightbox.refresh();
    } else {
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    }
  });

  form.reset();
});
