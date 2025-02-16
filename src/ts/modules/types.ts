export interface Event {
    date: Date;
    text: string;
}

export interface Category {
    id: number;
    label: string;
    dateRange: [number, number];
    events: Event[];
}

export interface Timeline {
    categories: Category[];
    currentCategoryIndex: number;
}