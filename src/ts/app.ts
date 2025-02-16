import {
    Page
} from "./modules/page";
import {
    initializeApp
} from "./modules/initializeApp";
import chalk from 'chalk';

window.addEventListener("load", () => {
    Page();
    initializeApp();


    const message: string = `
    ${chalk.bgCyan.black('Привет, я Макс, и делал это тестовое задание.')}
    ${chalk.bgCyan.black('Буду рад получить обратную связь по выполненной работе, какой бы она ни была.')}

    ${chalk.bgCyan.black('Оставляю необходимые ссылки и контакт:')}
    
    ${chalk.blue('https://github.com/junkq/only')}
    ${chalk.blue('https://cdn.tmweb.ru/only/')}
    ${chalk.blue('https://cdn.tmweb.ru/resume_maks_mironov.pdf')}
    ${chalk.blue('https://t.me/get_junk')}

    ${chalk.bgCyan.black('---')}

    ${chalk.bgCyan.black('Если нужно внести какие-либо изменения, дайте знать!')}
    `;

    console.log(message);
});