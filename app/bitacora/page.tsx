import { Metadata } from 'next';
import BlogListing from '@/components/BlogListing';

export const metadata: Metadata = {
    title: 'La Bitácora del Príncipe | Diario de Viajes y Vinos',
    description: 'Crónicas de un sommelier en movimiento. Descubre viñedos, destinos y experiencias enológicas únicas con Emiliano.',
};

export default function BlogListingPage() {
    return <BlogListing />;
}
