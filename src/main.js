import iziToast from 'izitoast';
import { findImg } from './js/pixabay-api';
import { imgsTemplate, showError, showMessage } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form-search');
const searchInput = document.querySelector('#search-input');
const button = document.querySelector('[data-search]');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('#loader');
const loadMoreBtn = document.querySelector('#moreBtn');

let lightbox = null;
hideLoadMoreBtn();

const params = {
  page: 1,
  searchValue: '',
  total: null,
};

form.addEventListener('submit', async e => {
  e.preventDefault();
  params.searchValue = searchInput.value.trim();
  params.page = 1;
  if (params.searchValue === '') {
    return;
  }

  loader.classList.remove('hidden');

  try {
    const data = await findImg(params.searchValue, params.page);
    loader.classList.add('hidden');

    if (data.hits.length === 0) {
      showError();
      gallery.innerHTML = '';
      hideLoadMoreBtn();
      return;
    }

    const markup = imgsTemplate(data.hits);
    gallery.innerHTML = markup;
    params.total = data.totalHits;

    checkBtnStatus();

    if (lightbox) {
      lightbox.refresh();
    } else {
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    loader.classList.add('hidden');
    showError();
  }

  form.reset();
});

loadMoreBtn.addEventListener('click', async e => {
  e.preventDefault();
  loader.classList.add('loaderBottom');
  loader.classList.remove('hidden');
  params.page += 1;

  try {
    const data = await findImg(params.searchValue, params.page);
    loader.classList.add('hidden');
    const markup = imgsTemplate(data.hits);
    gallery.insertAdjacentHTML('beforeend', markup);
    checkBtnStatus();
    smoothScroll();

    if (lightbox) {
      lightbox.refresh();
    } else {
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    loader.classList.add('hidden');
    showError();
  }
});

loader.classList.remove('loaderBottom');

function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('hidden');
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('hidden');
}

function checkBtnStatus() {
  const perPage = 40;
  const maxPage = Math.ceil(params.total / perPage);

  if (params.page >= maxPage) {
    showMessage();
    hideLoadMoreBtn();
  } else {
    showLoadMoreBtn();
  }
}

function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');

  if (galleryItem) {
    const itemHeight = galleryItem.getBoundingClientRect().height;
    window.scrollBy({
      top: itemHeight * 2,
      behavior: 'smooth',
    });
  }
}
