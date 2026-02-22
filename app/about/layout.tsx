import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Dirk',
    description: 'Learn about Dirk Nellens, a Social Anthropologist and Human Design Analyst.',
    openGraph: {
        title: 'About Dirk | Dirk Nellens',
        description: 'Learn about Dirk Nellens, a Social Anthropologist and Human Design Analyst.',
        images: [{ url: '/images/dirk-3.jpg' }],
    }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
