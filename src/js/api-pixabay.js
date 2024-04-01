
const BASE_URL = 'https://pixabay.com/api/';

// Функция запроса на сервер
export const getPhotos = async (wordForSearch) => { 

    // Параметры поиска
    const searchParams = new URLSearchParams({
    key: '2842151-bd094d52b36040a4b6da8b1da',
    format: 'json',
    q: wordForSearch, // Поисковая фраза => Введённое слово
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: 1,
    per_page: 10,
    });

    console.log(`${BASE_URL}?${searchParams}`);

    const response = await fetch(`${BASE_URL}?${searchParams}`);
    if (!response.ok) {
        throw new Error(response.statusText)
    };
    return response.json();
};

