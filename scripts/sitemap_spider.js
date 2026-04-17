import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 10 }, // Мягкий разгон
        { duration: '2m', target: 30 },  // Держим нагрузку
        { duration: '30s', target: 0 },  // Завершаем
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'], 
    },
};

// 1. Функция setup() выполняется ровно 1 раз ДО запуска VUs
export function setup() {
    const res = http.get('https://fuse8.ru/sitemap.xml');
    
    if (res.status !== 200) {
        throw new Error(`Не удалось загрузить sitemap.xml. Статус: ${res.status}`);
    }
    
    // Вырезаем ссылки регулярным выражением и возвращаем массив
    const urls = res.body.match(/<loc>(.*?)<\/loc>/g).map(s => s.replace(/<\/?loc>/g, ''));
    
    console.log(`✅ Sitemap успешно загружен! Найдено ссылок: ${urls.length}`);
    return urls; 
}

// 2. Основная функция VUs
export default function (sitemapData) {
    if (!sitemapData || sitemapData.length === 0) {
        return; // Защита от пустой карты сайта
    }

    // Выбираем случайную ссылку из переданного массива
    const url = sitemapData[Math.floor(Math.random() * sitemapData.length)];
    
    // Тегируем запросы, чтобы в Графане было видно, что это Паук
    const res = http.get(url, { tags: { name: 'Sitemap_Spider' } });

    // Сохраняем результат проверки в переменную
    const isSuccessful = check(res, {
        'status is 200': (r) => r.status === 200,
    });

    // Если проверка провалилась (статус не 200), логируем ошибку в терминал
    if (!isSuccessful) {
        console.error(`🚨 [БИТАЯ ССЫЛКА] Статус: ${res.status} | URL: ${url}`);
    }

    // Человеческая пауза между переходами по страницам (от 1 до 4 секунд)
    sleep(Math.random() * 3 + 1);
}