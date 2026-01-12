import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Metadata } from 'next';
import BlogPostContent from '@/components/BlogPostContent';
import { BlogPost, WineItem } from '@/types';

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

async function getPostData(id: string) {
    const docRef = doc(db, 'blog_posts', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;

    const postData = { id: docSnap.id, ...docSnap.data() } as BlogPost;

    // Fetch Related Wine if exists
    let relatedWine: WineItem | null = null;
    if (postData.relatedWineId) {
        const wineRef = doc(db, 'cava_items', postData.relatedWineId);
        const wineSnap = await getDoc(wineRef);
        if (wineSnap.exists()) {
            relatedWine = { id: wineSnap.id, ...wineSnap.data() } as WineItem;
        }
    }

    return { post: postData, relatedWine };
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const data = await getPostData(params.id);
    if (!data) return { title: 'Post no encontrado' };

    return {
        title: data.post.title,
        description: data.post.content.substring(0, 160) + '...',
        openGraph: {
            title: data.post.title,
            description: data.post.content.substring(0, 160) + '...',
            images: [data.post.image || 'https://tpoeahzwujcghqsjanon.supabase.co/storage/v1/object/public/ImagenPyC/PrincipePyC.jpg'],
        },
    }
}

export default async function BlogPostPage({ params }: Props) {
    const data = await getPostData(params.id);

    if (!data) return <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-slate-500">Entrada no encontrada.</div>;

    // Serialization for Client Component (Convert dates to strings/numbers if needed, but Firestore Timestamp usually needs conversion)
    // For simplicity, we pass as is, but if Timestamp causes issues, we convert.
    // However, in BlogPostContent we format `post.date.seconds`.
    // The data fetched in Server Component (plain getDoc) might return Timestamps. 
    // Client Components cannot accept complex objects like Timestamps from Server Components directly if passed as props? 
    // Actually they can if it's serializable. Firestore Timestamps are objects with methods, so they are NOT serializable.
    // We must convert dates.

    const serializedPost = {
        ...data.post,
        date: data.post.date?.seconds ? { seconds: data.post.date.seconds } : data.post.date // Strip methods
    };

    return <BlogPostContent post={serializedPost} relatedWine={data.relatedWine} postId={params.id} />;
}
