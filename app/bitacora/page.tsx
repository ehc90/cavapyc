'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { BlogPost } from '@/types';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, Anchor } from 'lucide-react';

export default function BlogListing() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const q = query(collection(db, 'blog_posts'), orderBy('date', 'desc'));
            const snap = await getDocs(q);
            setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() } as BlogPost)));
            setLoading(false);
        };
        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-serif selection:bg-amber-200">

            {/* Header / Hero */}
            <header className="relative pt-32 pb-20 px-6 text-center border-b border-amber-900/10 mb-12">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 flex flex-col items-center"
                >
                    {/* User Image with Liquid Border */}
                    <div className="relative w-24 h-24 mb-6 group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-purple-600 to-amber-500 rounded-full opacity-75 group-hover:opacity-100 blur animate-spin transition duration-1000"></div>
                        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-slate-900">
                            <img
                                src="https://tpoeahzwujcghqsjanon.supabase.co/storage/v1/object/public/ImagenPyC/PrincipePyC.jpg"
                                alt="El Príncipe"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
                        Bitácora del Príncipe
                    </h1>
                    <p className="max-w-3xl mx-auto text-xl text-slate-600 italic leading-relaxed">
                        "Crónicas de un sommelier en movimiento. Desde los viñedos de Mendoza hasta los rincones más lejanos del mundo. Cada destino, una copa; cada bodega, una historia."
                    </p>
                </motion.div>
            </header>

            {/* Content List */}
            <main className="max-w-6xl mx-auto px-6 pb-24">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-20 opacity-50">
                        <p className="text-2xl italic">El diario está aún en blanco...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {posts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group cursor-pointer flex flex-col"
                            >
                                <Link href={`/bitacora/${post.id}`} className="block h-full relative">
                                    <div className="aspect-[4/5] overflow-hidden rounded-sm mb-6 relative shadow-md group-hover:shadow-xl transition-shadow duration-500">
                                        {post.image ? (
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                                                <Anchor className="w-12 h-12 opacity-20" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4 text-xs tracking-widest text-amber-700 uppercase font-sans">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {post.date?.seconds ? new Date(post.date.seconds * 1000).toLocaleDateString() : (typeof post.date === 'string' ? post.date : 'Reciente')}
                                            </span>
                                            {post.tags && <span>— {post.tags[0]}</span>}
                                        </div>

                                        <h2 className="text-3xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-tight">
                                            {post.title}
                                        </h2>

                                        <p className="text-slate-500 line-clamp-3 leading-relaxed font-sans font-light">
                                            {post.content}
                                        </p>

                                        <div className="pt-4 flex items-center text-amber-700 text-sm font-bold tracking-wider uppercase group/link">
                                            Leer Entrada <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                )}
            </main>

            {/* Footer Simple */}
            <footer className="py-12 text-center border-t border-amber-900/10 mt-12">
                <Link href="/" className="text-slate-400 hover:text-amber-600 transition-colors text-sm uppercase tracking-widest">
                    Volver a Príncipe y Centauro
                </Link>
            </footer>
        </div>
    );
}
