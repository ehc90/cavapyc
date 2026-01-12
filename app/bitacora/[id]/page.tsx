'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { BlogPost } from '@/types';
import Link from 'next/link';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogPostPage() {
    const { id } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchPost = async () => {
            const docRef = doc(db, 'blog_posts', id as string);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setPost({ id: docSnap.id, ...docSnap.data() } as BlogPost);
            }
            setLoading(false);
        };
        fetchPost();
    }, [id]);

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

                    <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-center text-slate-400 text-sm font-sans">
                        <span>Escrito por El Príncipe</span>
                        <button className="flex items-center gap-2 hover:text-amber-600 transition-colors">
                            <Share2 className="w-4 h-4" /> Compartir
                        </button>
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
