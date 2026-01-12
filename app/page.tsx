import Hero from '@/components/Hero';
import Catalog from '@/components/Catalog';
import BodegaIudica from '@/components/BodegaIudica';
import ClubPrivado from '@/components/ClubPrivado';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <main className="min-h-screen bg-slate-950">
            <Hero />
            <BodegaIudica />
            <Catalog />
            <ClubPrivado />
            <Footer />
        </main>
    );
}
