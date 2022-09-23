import Notiflix from 'notiflix';

export function createMarkup(data = []) {
  return data.hits
    .map(
      card =>
        `<a class="thumb gallery__item" href="${card.largeImageURL}"><div class="photo-card">
  <img class="preview" src="${card.webformatURL}" alt="${card.tags}" title="${card.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes </b> ${card.likes}
    </p>
    <p class="info-item">
      <b>Views </b> ${card.views}
    </p>
    <p class="info-item">
      <b>Comments </b> ${card.comments}
    </p>
    <p class="info-item">
      <b>Downloads </b> ${card.downloads}
    </p>
  </div>
</div></a>`
    )
    .join('');
}
