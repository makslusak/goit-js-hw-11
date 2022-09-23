import './css/styles.css';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { formRef, galleryRef } from './js/refs/index';
import { getData } from './js/api/index';
import { createMarkup } from './js/markup/index';

formRef.addEventListener('submit', onFormClick);

async function onFormClick(evt) {
  evt.preventDefault();

  const valueFromInput = evt.target.searchQuery.value;

  try {
    const { data } = await getData(valueFromInput, 1);
    validData(data);
    console.log(data);
    const markup = createMarkup(data, valueFromInput);

    galleryRef.innerHTML = markup;
  } catch (error) {}
}

function validData(data) {
  if (data.total === 0) {
    return Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
  Notify.success(`Hooray! We found ${data.total} images.`);
}
let gallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
gallery.on('show.simplelightbox');
