'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { BlogPost, WineItem } from '@/types';
import Link from 'next/link';
import { ArrowLeft, Calendar, Share2, Wine } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogPostPage() {
    const { id } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [relatedWine, setRelatedWine] = useState<WineItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        if (!id) return;
        const fetchPost = async () => {
            const docRef = doc(db, 'blog_posts', id as string);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const postData = { id: docSnap.id, ...data } as BlogPost;
                setPost(postData);
                setLikes(data.likes || 0);

                // Fetch Related Wine if exists
                if (data.relatedWineId) {
                    const wineRef = doc(db, 'cava_items', data.relatedWineId);
                    const wineSnap = await getDoc(wineRef);
                    if (wineSnap.exists()) {
                        setRelatedWine({ id: wineSnap.id, ...wineSnap.data() } as WineItem);
                    }
                }
            }
            setLoading(false);
        };
        fetchPost();

        // Check local storage for like status
        if (localStorage.getItem(`liked_${id}`)) setHasLiked(true);
    }, [id]);

    const handleLike = async () => {
        if (hasLiked || !post) return;

        // Optimistic UI update
        setLikes(prev => prev + 1);
        setHasLiked(true);
        localStorage.setItem(`liked_${post.id}`, 'true');

        // Firestore update
        const docRef = doc(db, 'blog_posts', post.id);
        await updateDoc(docRef, { likes: increment(1) });
    };

    const handleShare = async () => {
        const shareData = {
            title: post?.title,
            text: `Lee esta crónica de El Príncipe: ${post?.title}`,
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('¡Enlace copiado al portapapeles!');
        }
    };

    if (loading) return <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center"><div className="animate-spin w-8 h-8 border-b-2 border-amber-600 rounded-full"></div></div>;
    if (!post) return <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-slate-500">Entrada no encontrada.</div>;

    return (
        <article className="min-h-screen bg-[#FDFBF7] text-slate-800 font-serif selection:bg-amber-200 pb-24">

            {/* Navigation */}
            <nav className="p-6 sticky top-0 z-50 mix-blend-difference text-white">
                <Link href="/bitacora" className="flex items-center gap-2 hover:opacity-70 transition-opacity w-fit">
                    <ArrowLeft className="w-5 h-5" /> <span className="uppercase tracking-widest text-sm font-sans font-bold">Volver a la Bitácora</span>
                </Link>
            </nav>

            {/* Hero Image */}
            <div className="w-full h-[60vh] relative -mt-20">
                {post.image ? (
                    <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
                ) : (
                    <div className="w-full h-full bg-slate-200" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-black/30" />
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 relative -mt-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#FDFBF7] p-8 md:p-12 shadow-2xl rounded-sm border-t-4 border-amber-600"
                >
                    <div className="flex items-center gap-4 text-sm text-amber-700 font-sans tracking-widest uppercase mb-6">
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {post.date?.seconds ? new Date(post.date.seconds * 1000).toLocaleDateString() : (typeof post.date === 'string' ? post.date : 'Reciente')}
                        </span>
                        {post.tags && <span className="px-2 py-1 bg-amber-100 rounded text-xs">{post.tags}</span>}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="prose prose-lg prose-slate prose-headings:font-serif prose-p:font-light prose-p:leading-loose text-slate-600">
                        {/* Start rendering content with preserving line breaks */}
                        {post.content.split('\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </div>

                    {/* Featured Wine */}
                    {relatedWine && (
                        <div className="mt-12 mb-8 p-6 bg-slate-900 rounded-xl border border-amber-900/30 text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-amber-500 shadow-lg shrink-0">
                                    <img src={relatedWine.image || '/bottle-placeholder.png'} className="w-full h-full object-cover" alt={relatedWine.name} />
                                </div>
                                <div className="text-left flex-1">
                                    <p className="text-amber-500 text-xs uppercase tracking-widest mb-1">Copa del Relato</p>
                                    <h3 className="text-xl font-bold text-white font-serif">{relatedWine.name}</h3>
                                    <p className="text-slate-400 text-sm italic">{relatedWine.producer} — {relatedWine.type}</p>
                                </div>
                                <Link href="/catalogo" className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-bold uppercase tracking-wider transition-colors">
                                    Ver en Cava
                                </Link>
                            </div>
                        </div>
                    )}

                    <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-sm font-sans">
                        <span className="italic">Escrito por El Príncipe</span>

                        <div className="flex gap-4">
                            <button
                                onClick={handleLike}
                                disabled={hasLiked}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${hasLiked ? 'bg-amber-100 text-amber-700 border-amber-200 cursor-default' : 'hover:bg-amber-50 text-slate-500 border-slate-200 hover:text-amber-600'}`}
                            >
                                <Wine className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`} />
                                <span className="font-bold">{hasLiked ? '¡Salud!' : 'Brindar'}</span>
                                {likes > 0 && <span className="ml-1 opacity-70">({likes})</span>}
                            </button>

                            <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors">
                                <Share2 className="w-5 h-5" /> Compartir
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Footer Simple */}
            <footer className="py-12 text-center border-t border-amber-900/10 mt-12 max-w-4xl mx-auto">
                <p className="text-slate-400 text-sm italic">"El conocimiento se expande cuando se comparte."</p>
                <div className="mt-4">
                    <img src="/logo-hero.png" className="h-12 mx-auto opacity-20 grayscale invert" alt="Logo" />
                </div>
            </footer>

        </article>
    );
}
