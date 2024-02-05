import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const elements = {
  form: document.querySelector('.js-form'),
  button: document.querySelector('.js-button'),
  input: document.querySelector('input[name="searchQuery"]'),
  gallery: document.querySelector('.js-gallery'),
  guard: document.querySelector('.js-guard'),
};

let page = 1;
let searchValue;
let totalResults;

elements.form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  elements.gallery.innerHTML = '';
  totalResults = 0;

  searchValue = elements.input.value.trim();
  if (searchValue === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please, fill the input',
    });

    return;
  }

  try {
    const images = await searchImages(searchValue, page);
    const markup = createImageMarkup(images);

    elements.gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
  } catch (e) {
    iziToast.error({
      title: 'Error',
      message: 'Please, try again',
    });
  } finally {
    elements.input.value = '';
  }
}

async function searchImages(value, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '42206478-925606497870cbb45f2a85a6e';

  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 40,
    },
  });
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  totalResults += response.data.totalHits;

  if (response.data.total > totalResults) {
    observer.observe(elements.guard);
    iziToast.success({
      title: 'Horray!',
      message: `We found ${totalResults} images.`,
    });
  } else {
    observer.unobserve(selectors.guard);
    iziToast.error({
      title: 'Error',
      message: `We're sorry, but you've reached the end of search results.`,
    });
  }

  return response.data.hits;
}

function createImageMarkup(arr) {
  return arr
    .map(
      element => `
      <a class="photo-card" href="${element.largeImageURL}">
        <div class="image-wrapper">
          <img
            src="${element.webformatURL}"
            alt="${element.tags}"
            loading="lazy"
            class="image"
          />
        </div>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            <b> ${element.likes}</b>
          </p>
          <p class="info-item"><b>Views</b><b>${element.views}</b></p>
          <p class="info-item"><b>Comments</b><b>${element.comments}</b></p>
          <p class="info-item"><b>Downloads</b><b>${element.downloads}</b></p>
        </div>
      </a>
        `
    )
    .join('');
}

// INFINITY SCROLL
const options = {
  root: null,
  rootMargin: '300px',
  threshold: 0,
};

const observer = new IntersectionObserver(handlerLoadMore, options);

async function handlerLoadMore(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      if (elements.gallery.textContent === '') {
        observer.unobserve(elements.guard);
        return;
      }

      searchImages(searchValue, page).then(data => {
        const markup = createImageMarkup(data);

        elements.gallery.insertAdjacentHTML('beforeend', markup);
        lightbox.refresh();

        // SMOOTH SCROLL
        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      });
    }
  });
}

// LIGHTBOX
const lightbox = new SimpleLightbox('.gallery a');

// SCROLL TO TOP
const scrollToTop = () => {
  const header = document.getElementById('search-form');
  const headerOffset = header.offsetTop;

  window.scrollTo({
    top: headerOffset,
    behavior: 'smooth',
  });
};
document.querySelector('.scroll-to-top').addEventListener('click', scrollToTop);
