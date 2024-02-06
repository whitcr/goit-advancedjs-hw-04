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

const lightbox = new SimpleLightbox('.gallery a');

let page;
let searchValue;
let totalResults;

elements.form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  elements.gallery.innerHTML = '';
  totalResults = 0;
  page = 1;
  searchValue = elements.input.value.trim();

  if (searchValue === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please, fill the input',
    });

    return;
  }

  try {
    const { hits, totalHits, total } = await searchImages(searchValue, page);

    const markup = createImageMarkup(hits);
    elements.gallery.insertAdjacentHTML('beforeend', markup);

    totalResults += totalHits;
    lightbox.refresh();
    if (total >= totalResults) {
      observer.observe(elements.guard);
    }
    if (hits.length === 0) {
      iziToast.warning({
        title: 'Warning',
        message: `Sorry, there are no images matching your search query. Please try again.`,
      });
      return;
    }

    iziToast.success({
      title: 'Horray!',
      message: `We found ${totalHits} images.`,
    });
  } catch (e) {
    console.log(e);
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

  return response.data;
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
  for (const entry of entries) {
    if (entry.isIntersecting) {
      page += 1;

      try {
        const { hits, totalHits, total } = await searchImages(
          searchValue,
          page
        );
        const markup = createImageMarkup(hits);
        elements.gallery.insertAdjacentHTML('beforeend', markup);

        totalResults += totalHits;
        lightbox.refresh();

        if (total > totalResults) {
          observer.observe(elements.guard);

          // SMOOTH SCROLL

          const { height: cardHeight } = document
            .querySelector('.gallery')
            .firstElementChild.getBoundingClientRect();

          window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
          });
        } else {
          observer.unobserve(elements.guard);
          iziToast.error({
            title: 'Error',
            message: `We're sorry, but you've reached the end of search results.`,
          });
        }
      } catch (e) {
        console.log(e);
        iziToast.error({
          title: 'Error',
          message: 'Please, try again',
        });
      }
    }
  }
}

// LIGHTBOX

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
