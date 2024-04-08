import axios from 'axios';

// Функция запроса на сервер
export async function getPhotos(wordForSearch, startPage) {
    try {
        // Параметры поиска
        const BASE_URL = 'https://pixabay.com/api/';
        const searchParams = new URLSearchParams({
            key: '2842151-bd094d52b36040a4b6da8b1da',
            format: 'json',
            q: wordForSearch, // Поисковая фраза => Введённое слово
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page: startPage,
            per_page: 40,
        });
        // Запрос на сервер
        const response = await axios.get(`${BASE_URL}?${searchParams}`);
        return response;
    } catch (error) {
        console.error(error);
    }
}