import './css/styles.css';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { formRef, galleryRef, moreBtnRef, lessBtnRef } from './js/refs/index';
import { getData } from './js/api/index';
import { createMarkup } from './js/markup/index';
let pageNumber = 1;
let valueFromInput = '';
let gallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

formRef.addEventListener('submit', onSubmit);
moreBtnRef.addEventListener('click', loadMore);
lessBtnRef.addEventListener('click', loadLess);

async function onSubmit(evt) {
  evt.preventDefault();
  pageNumber = 1;

  valueFromInput = evt.target.searchQuery.value.trim();
  if (!valueFromInput) {
    Notify.warning('Enter data to search');
    return;
  }

  takeData();
}
async function loadMore(evt) {
  pageNumber += 1;

  takeData();
}
async function loadLess(evt) {
  pageNumber -= 1;
  takeData();
}

function validData(data) {
  let numberOfPages = Math.ceil(data.totalHits / 40);
  console.log(pageNumber);
  console.log(numberOfPages);
  if (data.totalHits === 0) {
    invisibleBtn(moreBtnRef);
    invisibleBtn(lessBtnRef);
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else if (pageNumber === 1) {
    visibleBtn(moreBtnRef);
    invisibleBtn(lessBtnRef);
    return Notify.success(`Hooray! We found ${data.totalHits} images.`);
  } else if (pageNumber === numberOfPages) {
    invisibleBtn(moreBtnRef);
    visibleBtn(lessBtnRef);
    return Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
  visibleBtn(moreBtnRef);
  visibleBtn(lessBtnRef);
}

function visibleBtn(btn) {
  btn.classList.remove('is-hidden');
  btn.classList.remove('is-hidden');
}
function invisibleBtn(btn) {
  btn.classList.add('is-hidden');
  btn.classList.add('is-hidden');
}

gallery.on('show.simplelightbox');

async function takeData() {
  try {
    const { data } = await getData(valueFromInput, pageNumber);
    validData(data);
    console.log(data);
    const markup = createMarkup(data, valueFromInput);
    galleryRef.innerHTML = markup;
    gallery.refresh();
    window.scrollTo(0, 0);
  } catch (error) {
    console.log(error);
  }
}
