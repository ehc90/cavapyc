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
