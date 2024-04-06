// import { getPhotos } from './js/api-pixabay-fetch';
import { getPhotos } from './js/api-pixabay-axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from "simplelightbox";

// Код модального окна Lightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  captionClass: "",
});

// Выбор <form>
const inputOfUser = document.querySelector('.search-form');
// Выбор <div> для вывода картинок
const galleryOfPhotos = document.querySelector('.gallery');
// Выбор кнопки More photos
const buttonMore = document.querySelector('.btn-more');

// Переменная для хранения введенного пользователем слова
let wordForSearch = '';
// Переменная для хранения начальной страницы отображения
let startPage = 1;

// Сохренение введённого пользователем слова
inputOfUser.addEventListener('input', (event) => {
    // Добавление в переменную введённого запроса
    wordForSearch = event.target.value;
});

// Обработчик нажатия кнопки Load more
buttonMore.addEventListener('click', onLoadMore);

// Слушатель на кнопку Поиск
inputOfUser.addEventListener('submit', setOutput);

// Функция обработки нажатия на кнопку Поиск
function setOutput(evt) {
  // Запрет действий по-умолчанию
  evt.preventDefault();
  // Установка первой страницы запроса
  startPage = 1;
  
  // Вызов функции запроса на сервер по введённому слову
  getPhotos(wordForSearch, startPage)
    .then(response => {
      // Добавление разметки загруженных фото из api-pixabay-fetch
      // galleryOfPhotos.innerHTML = createGallery(response.hits);
      
      // Проверка существований фото по запросу
      if (response.data.hits.length === 0) {
        // Вывод сообщения:"Таких фото не существует!";
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        galleryOfPhotos.innerHTML = ""; // Очистка экрана от предыдущего запроса
        buttonMore.classList.add("js-hidden"); // Блокировка вывода кнопки
      } else {
        // Вывод сообщения об общек кол-ве найденных фото
        const totalHits = response.data.totalHits;
        Notify.success(`Hooray! We found ${totalHits} images.`);
        // Добавление разметки загруженных фото из api-pixabay-axios если фото есть
        galleryOfPhotos.innerHTML = createGallery(response.data.hits);
        // Проявление кнопки Load more
        buttonMore.classList.remove("js-hidden");
        // Активация слушателя клика по фото
        listener();
      }
    })
    .catch(error => console.log(error));
};

// Функция создания разметки галереи
function createGallery(arr) {
  return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <div class="photo-card">
      <a href="${largeImageURL}">
        <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
       <div class="info">
         <p class="info-item">
            <b>Likes:</b>${likes}
         </p>
         <p class="info-item">
            <b>Views:</b>${views}
         </p>
         <p class="info-item">
            <b>Comments:</b>${comments}
         </p>
         <p class="info-item">
            <b>Downloads:</b>${downloads}
         </p>
       </div>
     </div>`).join(' ');
};

// Функция пагинации при нажатии More photos
function onLoadMore() {
  startPage += 1; // Увеличение номера следующей страницы
  getPhotos(wordForSearch, startPage) // Запрос на сервер
    .then(response => {
      // Проверка окончания выборки фото
      if (response.data.hits.length === 0) {
        buttonMore.classList.add("js-hidden");
        // Вывод сообщения: "Фотографии закончились!"
        Notify.success("We're sorry, but you've reached the end of search results.");
      } else {
        // Добавление разметки загруженных фото из api-pixabay-fetch
        // galleryOfPhotos.innerHTML = createGallery(response.hits);
      
        // Добавление разметки загруженных фото из api-pixabay-axios если фото есть
        galleryOfPhotos.insertAdjacentHTML("beforeend", createGallery(response.data.hits));
        // Обновление лайт бокса после добавления новых фото
        lightbox.refresh();
      }
    })
    .catch(error => console.log(error));
};

// Функция добавления слушателя клика по фото
function listener() {
  // Добавление слушателя клика по фото
        const clickImg = document.querySelector('.gallery');
        clickImg.addEventListener('click', hendleClick);
        console.log('Обработчик клика слышит клик после респонса');
        console.log('clickImg: ', clickImg);
}
    
// Функция вызова Lightbox
function hendleClick(event) {
  console.log('Клик внутри функции вызова Lightbox');
  // Блокирование действий по умолчанию
  event.preventDefault(); 

  // Блокирование действий при клике не по картинке
    if (event.target.nodeName !== "IMG") {
        return;
  };

  lightbox.open();
  console.log('Lightbox вызван');
}