import {
    Category
} from "./types";

export const createListItem = (item: Category, active: boolean = false): HTMLLIElement => {
    const li = document.createElement('li');
    li.setAttribute('data-id', item.id.toString());

    if (active) {
        li.classList.add('is-active');
    }

    const button = document.createElement('button');
    button.setAttribute('aria-label', `Выбрать категорию ${item.label}`);

    const span = document.createElement('span');
    span.textContent = item.id.toString();

    const p = document.createElement('p');
    p.textContent = item.label;

    button.appendChild(span);
    button.appendChild(p);
    li.appendChild(button);

    return li;
};