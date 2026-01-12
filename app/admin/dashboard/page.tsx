'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { WineItem } from '@/types';
import { Plus, Edit2, Trash2, Save, X, Sparkles, LogOut, Wine } from 'lucide-react';

export default function AdminDashboard() {
    const router = useRouter();
    const [items, setItems] = useState<WineItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<WineItem>>({});

    // Tab State
    const [activeTab, setActiveTab] = useState<'wines' | 'members' | 'blog'>('wines');
    const [members, setMembers] = useState<any[]>([]);
    const [posts, setPosts] = useState<any[]>([]);
    const [blogFormData, setBlogFormData] = useState<any>({});
    const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem('isAdmin')) router.push('/admin');

        // Subscribe to wines
        const qWines = query(collection(db, 'cava_items'));
        const unsubWines = onSnapshot(qWines, (snap) => {
            setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as WineItem)));
        });

        // Subscribe to members
        const qMembers = query(collection(db, 'club_members'), orderBy('joinedAt', 'desc'));
        const unsubMembers = onSnapshot(qMembers, (snap) => {
            setMembers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });

        // Subscribe to blog posts
        const qPosts = query(collection(db, 'blog_posts'), orderBy('date', 'desc'));
        const unsubPosts = onSnapshot(qPosts, (snap) => {
            setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });

        return () => {
            unsubWines();
            unsubMembers();
            unsubPosts();
        };
    }, [router]);

    const handleLogout = () => {
        sessionStorage.removeItem('isAdmin');
        router.push('/admin');
    };

    const copyEmails = () => {
        const emails = members.map(m => m.email).join(', ');
        navigator.clipboard.writeText(emails);
        alert('Correos copiados al portapapeles');
    };

    const openModal = (item?: WineItem) => {
        if (item) {
            setFormData(item);
        } else {
            setFormData({
                name: '', type: 'tinto', price: 1, rating: 5, description: '', pairing: '',
                tags: [], image: '', producer: '', varietal: '', vintage: '', region: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (formData.id) {
                await updateDoc(doc(db, 'cava_items', formData.id), { ...formData, updatedAt: new Date() });
            } else {
                await addDoc(collection(db, 'cava_items'), { ...formData, createdAt: new Date() });
            }
            setIsModalOpen(false);
        } catch (err) {
            alert('Error al guardar: ' + err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('¿Eliminar este vino definitivamente?')) {
            await deleteDoc(doc(db, 'cava_items', id));
        }
    };

    // Blog Handlers
    const openBlogModal = (post?: any) => {
        if (post) {
            setBlogFormData({ ...post, date: post.date?.toDate ? post.date.toDate().toISOString().split('T')[0] : post.date });
        } else {
            setBlogFormData({
                title: '', content: '', image: '', tags: '', date: new Date().toISOString().split('T')[0]
            });
        }
        setIsBlogModalOpen(true);
    };

    const handleBlogSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const dataToSave = {
                ...blogFormData,
                date: new Date(blogFormData.date),
                updatedAt: new Date()
            };

            if (blogFormData.id) {
                await updateDoc(doc(db, 'blog_posts', blogFormData.id), dataToSave);
            } else {
                await addDoc(collection(db, 'blog_posts'), { ...dataToSave, createdAt: new Date() });
            }
            setIsBlogModalOpen(false);
        } catch (err) {
            alert('Error al guardar post: ' + err);
        } finally {
            setLoading(false);
        }
    };

    // AI SOMMELIER FUNCTION
    const generateAIContent = async (field: 'description' | 'pairing') => {
        if (!formData.name || !formData.type) return alert('Ingresa al menos nombre y tipo.');
        setAiLoading(true);

        const prompt = field === 'description'
            ? `Actúa como 'El Príncipe', un sommelier experto y elegante. Escribe una nota de cata técnica pero seductora para un vino ${formData.type} llamado "${formData.name}" de la variedad ${formData.varietal || 'desconocida'}. Máximo 50 palabras.`
            : `Actúa como 'El Príncipe'. Sugiere un maridaje sofisticado para el vino ${formData.name} (${formData.type}). Sé breve y elegante.`;

        try {
            const res = await fetch('/api/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });
            const data = await res.json();
            if (data.text) {
                setFormData(prev => ({ ...prev, [field]: data.text }));
            }
        } catch (e) {
            alert('Error con la IA: ' + e);
        } finally {
            setAiLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">

            {/* Header */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-amber-500">Panel de Control</h1>
                    <p className="text-slate-500 text-sm">Gestionando la Colección Privada</p>
                </div>

                {/* Tabs */}
                <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                    <button
                        onClick={() => setActiveTab('wines')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'wines' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                        Vinos
                    </button>
                    <button
                        onClick={() => setActiveTab('members')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'members' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                        Socios
                    </button>
                </div>

                <div className="flex gap-4">
                    {activeTab === 'wines' && (
                        <button onClick={() => openModal()} className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold transition-colors">
                            <Plus className="w-4 h-4" /> Nuevo Vino
                        </button>
                    )}
                    {activeTab === 'blog' && (
                        <button onClick={() => openBlogModal()} className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold transition-colors">
                            <Plus className="w-4 h-4" /> Nuevo Post
                        </button>
                    )}
                    <button onClick={handleLogout} className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                        <LogOut className="w-4 h-4" /> Salir
                    </button>
                </div>
            </div>

            {/* Table/List */}
            <div className="max-w-7xl mx-auto bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
                {activeTab === 'wines' ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-950 text-slate-400 uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="p-4">Vino</th>
                                    <th className="p-4">Tipo</th>
                                    <th className="p-4">Bodega</th>
                                    <th className="p-4 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {items.map(item => (
                                    <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="p-4 flex items-center gap-3">
                                            {item.image ? <img src={item.image} className="w-10 h-10 object-cover rounded-md" /> : <div className="w-10 h-10 bg-slate-800 rounded-md flex items-center justify-center"><Wine className="w-5 h-5 text-slate-600" /></div>}
                                            <span className="font-bold text-slate-200">{item.name}</span>
                                        </td>
                                        <td className="p-4"><span className="text-xs uppercase bg-slate-800 text-amber-500 px-2 py-1 rounded border border-slate-700">{item.type}</span></td>
                                        <td className="p-4 text-slate-400">{item.producer || '-'}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => openModal(item)} className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded transition-colors"><Edit2 className="w-4 h-4" /></button>
                                                <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    // Members Table
                    <div className="overflow-x-auto">
                        <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
                            <h3 className="text-slate-300 font-bold">Listado de Socios ({members.length})</h3>
                            <button onClick={copyEmails} className="text-xs text-amber-500 hover:text-white transition-colors border border-amber-500/30 px-3 py-1 rounded">
                                Copiar Emails
                            </button>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-slate-950 text-slate-400 uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Fecha de Alta</th>
                                    <th className="p-4">Origen</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {members.length === 0 ? (
                                    <tr><td colSpan={3} className="p-8 text-center text-slate-500">Aún no hay socios registrados.</td></tr>
                                ) : members.map((member) => (
                                    <tr key={member.id} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="p-4 font-mono text-slate-300">{member.email}</td>
                                        <td className="p-4 text-slate-400 text-sm">
                                            {member.joinedAt?.seconds ? new Date(member.joinedAt.seconds * 1000).toLocaleDateString() : 'Reciente'}
                                        </td>
                                        <td className="p-4 text-slate-500 text-sm">{member.source || 'Web'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* BLOG TAB */}
                {activeTab === 'blog' && (
                    <div className="overflow-x-auto">
                        <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
                            <h3 className="text-slate-300 font-bold">Entradas de Bitácora ({posts.length})</h3>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-slate-950 text-slate-400 uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="p-4">Título</th>
                                    <th className="p-4">Fecha</th>
                                    <th className="p-4 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {posts.map(post => (
                                    <tr key={post.id} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                {post.image && <img src={post.image} className="w-12 h-8 object-cover rounded" />}
                                                <span className="font-bold text-slate-200">{post.title}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-slate-400 text-sm">
                                            {post.date?.seconds ? new Date(post.date.seconds * 1000).toLocaleDateString() : 'Sin fecha'}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => openBlogModal(post)} className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded transition-colors"><Edit2 className="w-4 h-4" /></button>
                                                <button onClick={() => handleDelete(post.id)} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
                        <div className="p-6 border-b border-slate-800 flex justify-between items-center sticky top-0 bg-slate-900 z-10">
                            <h2 className="text-xl font-serif font-bold text-white">{formData.id ? 'Editar Vino' : 'Nueva Adquisición'}</h2>
                            <button type="button" onClick={() => setIsModalOpen(false)}><X className="text-slate-500 hover:text-white" /></button>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-xs uppercase text-slate-500 mb-1">Nombre</label>
                                <input required className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-slate-500 mb-1">Bodega (Productor)</label>
                                <input className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" value={formData.producer} onChange={e => setFormData({ ...formData, producer: e.target.value })} />
                            </div>

                            <div>
                                <label className="block text-xs uppercase text-slate-500 mb-1">Tipo</label>
                                <select className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                    <option value="tinto">Tinto</option>
                                    <option value="blanco">Blanco</option>
                                    <option value="rosado">Rosado</option>
                                    <option value="espumoso">Espumoso</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-slate-500 mb-1">Varietal (Uva)</label>
                                <input className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" value={formData.varietal} onChange={e => setFormData({ ...formData, varietal: e.target.value })} />
                            </div>

                            <div>
                                <label className="block text-xs uppercase text-slate-500 mb-1">Imagen (URL)</label>
                                <input placeholder="https://..." className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white text-sm" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-xs uppercase text-slate-500 mb-1">Precio ($)</label>
                                    <input type="number" min="1" max="5" className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" value={formData.price} onChange={e => setFormData({ ...formData, price: parseInt(e.target.value) })} />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs uppercase text-slate-500 mb-1">Puntaje (1-5)</label>
                                    <input type="number" min="1" max="5" className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" value={formData.rating} onChange={e => setFormData({ ...formData, rating: parseInt(e.target.value) })} />
                                </div>
                            </div>

                            <div className="col-span-2">
                                <div className="flex justify-between items-center mb-1">
                                    <label className="block text-xs uppercase text-slate-500">Nota de Cata</label>
                                    <button type="button" onClick={() => generateAIContent('description')} disabled={aiLoading} className="text-amber-500 text-xs hover:text-amber-400 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Redactar con IA</button>
                                </div>
                                <textarea rows={3} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white text-sm" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>

                            <div className="col-span-2">
                                <div className="flex justify-between items-center mb-1">
                                    <label className="block text-xs uppercase text-slate-500">Maridaje</label>
                                    <button type="button" onClick={() => generateAIContent('pairing')} disabled={aiLoading} className="text-amber-500 text-xs hover:text-amber-400 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Sugerir con IA</button>
                                </div>
                                <textarea rows={2} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white text-sm" value={formData.pairing} onChange={e => setFormData({ ...formData, pairing: e.target.value })} />
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-800 flex justify-end gap-3 sticky bottom-0 bg-slate-900 z-10">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">Cancelar</button>
                            <button type="submit" disabled={loading} className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-bold shadow-lg flex items-center gap-2">
                                {loading ? 'Guardando...' : <><Save className="w-4 h-4" /> Guardar Ficha</>}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* BLOG Post Modal */}
            {isBlogModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <form onSubmit={handleBlogSubmit} className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
                        <div className="p-6 border-b border-slate-800 flex justify-between items-center sticky top-0 bg-slate-900 z-10">
                            <h2 className="text-xl font-serif font-bold text-white">{blogFormData.id ? 'Editar Entrada' : 'Nueva Noticia de Viaje'}</h2>
                            <button type="button" onClick={() => setIsBlogModalOpen(false)}><X className="text-slate-500 hover:text-white" /></button>
                        </div>

                        <div className="p-6 grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-xs uppercase text-slate-500 mb-1">Título</label>
                                <input required className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" value={blogFormData.title} onChange={e => setBlogFormData({ ...blogFormData, title: e.target.value })} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs uppercase text-slate-500 mb-1">Fecha</label>
                                    <input type="date" required className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" value={blogFormData.date} onChange={e => setBlogFormData({ ...blogFormData, date: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase text-slate-500 mb-1">Etiquetas (sep. por comas)</label>
                                    <input className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" placeholder="Crucero, Italia, Vino..." value={blogFormData.tags} onChange={e => setBlogFormData({ ...blogFormData, tags: e.target.value })} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs uppercase text-slate-500 mb-1">Imagen de Portada (URL)</label>
                                <input placeholder="https://..." className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white text-sm" value={blogFormData.image} onChange={e => setBlogFormData({ ...blogFormData, image: e.target.value })} />
                            </div>

                            <div>
                                <label className="block text-xs uppercase text-slate-500 mb-1">Cuerpo del Texto</label>
                                <textarea required rows={10} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white text-sm font-serif leading-relaxed" placeholder="Escribe aquí tus memorias..." value={blogFormData.content} onChange={e => setBlogFormData({ ...blogFormData, content: e.target.value })} />
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-800 flex justify-end gap-3 sticky bottom-0 bg-slate-900 z-10">
                            <button type="button" onClick={() => setIsBlogModalOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">Cancelar</button>
                            <button type="submit" disabled={loading} className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-bold shadow-lg flex items-center gap-2">
                                {loading ? 'Publicando...' : <><Save className="w-4 h-4" /> Publicar Entrada</>}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
