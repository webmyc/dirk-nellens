import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Education',
    description: 'Online Human Design courses and educational frameworks offered by Dirk Nellens.',
    openGraph: {
        title: 'Education | Dirk Nellens',
        description: 'Online Human Design courses and educational frameworks offered by Dirk Nellens.',
        images: [{ url: '/images/dirk-3.jpg' }],
    }
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
