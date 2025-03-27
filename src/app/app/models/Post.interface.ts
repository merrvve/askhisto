export interface Annotation {
    id: number;
    content: number;
    image: string;
}

export interface Label {
    id: string;
    name: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface Post {
    id?: string;
    userId: string;
    title: string;
    images: string[];
    annotations?: Annotation[];
    text: string;
    labels: Label[];
    category: Category;
}