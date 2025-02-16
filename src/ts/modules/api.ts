import {
    Category
} from './types';

export async function loadJson(url: string): Promise < Category[] > {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.status);
        }
        const jsonData: Category[] = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Ошибка загрузки json:', error);
        return [];
    }
}