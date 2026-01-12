'use client';

import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { WineItem } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Wine } from 'lucide-react';

const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'tinto', label: 'Tinto' },
    { id: 'blanco', label: 'Blanco' },
    { id: 'espumoso', label: 'Espumoso' },
    { id: 'rosado', label: 'Rosado' }
];

export default function Catalog() {
    const [items, setItems] = useState<WineItem[]>([]);
    const [filter, setFilter] = useState('todos');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Real-time subscription to 'cava_items'
        const q = query(collection(db, 'cava_items'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WineItem));
            setItems(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const filteredItems = filter === 'todos'
        ? items
        : items.filter(item => item.type?.toLowerCase() === filter);

    return (
        <section id="collection" className="py-24 bg-slate-950 text-slate-200 relative">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header & Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-100 dark:text-white mb-2">
                            La Colección Privada
                        </h2>
                        <p className="text-slate-500 font-light">Selección técnica y sensorial de momentos líquidos.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 bg-slate-900/50 p-1.5 rounded-full border border-slate-800 backdrop-blur-sm">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setFilter(cat.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat.id
                                    ? 'bg-amber-700 text-white shadow-lg shadow-amber-900/20'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="min-h-[400px]">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                        </div>
                    ) : (
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence>
                                {filteredItems.map(item => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        key={item.id}
                                        className="group bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-700/50 transition-colors shadow-xl hover:shadow-2xl hover:shadow-amber-900/10"
                                    >
                                        {/* Image */}
                                        <div className="relative h-64 overflow-hidden bg-slate-800">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-600">
                                                    <Wine className="w-12 h-12 opacity-20" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent opacity-60" />
                                            <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur px-3 py-1 rounded-full border border-slate-700">
                                                <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">{item.type}</span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-serif font-bold text-slate-100 group-hover:text-amber-500 transition-colors">
                                                    {item.name}
                                                </h3>
                                                <span className="text-amber-500/80 font-mono text-sm">
                                                    {Array(item.price || 1).fill('$').join('')}
                                                </span>
                                            </div>

                                            <div className="flex gap-1 mb-4">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`w-3 h-3 ${star <= (item.rating || 5) ? 'fill-amber-600 text-amber-600' : 'text-slate-800 fill-slate-800'}`}
                                                    />
                                                ))}
                                            </div>

                                            <p className="text-slate-400 text-sm line-clamp-3 mb-6 font-light leading-relaxed">
                                                {item.description}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                                                <span className="text-xs text-slate-600 font-mono uppercase tracking-wider">
                                                    {item.vintage || 'NV'} • {item.region || 'Mendoza'}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {!loading && filteredItems.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-slate-600">No hay vinos en esta categoría.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
