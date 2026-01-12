import Hero from '@/components/Hero';
import Catalog from '@/components/Catalog';
import BodegaIudica from '@/components/BodegaIudica';

export default function Home() {
    return (
        <main className="min-h-screen bg-slate-950">
            <Hero />
            <BodegaIudica />
            <Catalog />
        </main>
    );
}
