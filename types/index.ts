export interface WineItem {
    id: string;
    name: string;
    producer?: string;
    varietal?: string;
    vintage?: string;
    region?: string;
    type: string; // 'tinto', 'blanco', 'espumoso', 'rosado'
    rating?: number;
    price?: number;
    tags?: string[];
    description: string;
    image?: string;
    pairing?: string;
    createdAt?: any;
}

export interface BlogPost {
    id: string;
    title: string;
    content: string;
    image: string;
    date: Date | any;
    tags?: string[];
    slug?: string;
    createdAt?: Date | any;
}
