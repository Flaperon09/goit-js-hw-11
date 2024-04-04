import { getPhotos } from './js/api-pixabay';

// Выбор <form>
const inputOfUser = document.querySelector('.search-form');
// Выбор <div> для вывода картинок
const galleryOfPhotos = document.querySelector('.gallery');
console.log(galleryOfPhotos);

// Переменная для хранения введенного пользователем слова
let wordForSearch = '';

// Сохренение введённого пользователем слова
inputOfUser.addEventListener('input', (event) => {
    // Добавление в переменную введённого запроса
    wordForSearch = event.target.value;
});

// Слушатель на кнопку Поиск
inputOfUser.addEventListener('submit', setOutput);

// Функция обработки нажатия на кнопку Поиск
function setOutput(evt) {
  // Запрет действий по-умолчанию
  evt.preventDefault();
  // Функция запроса на сервер по введённому слову
  getPhotos(wordForSearch)
    .then(response => {
      console.log(response);
      // Добавление разметки загруженных фото
      galleryOfPhotos.innerHTML = createGallery(response.hits);
      })
    .catch(error => console.log(error));
};

// Функция создания разметки галереи
function createGallery(arr) {
  console.log(arr);
  return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<div class="photo-card">
     <img src="${webformatURL}" alt="${tags}" loading="lazy" />
       <div class="info">
         <p class="info-item">
           <b>Likes: ${likes}</b>
         </p>
         <p class="info-item">
           <b>Views: ${views}</b>
         </p>
         <p class="info-item">
         <b>Comments: ${comments}</b>
         </p>
         <p class="info-item">
           <b>Downloads: ${downloads}</b>
         </p>
       </div>
     </div>`).join(' ');
}