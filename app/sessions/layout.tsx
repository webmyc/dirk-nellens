import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Private Sessions',
    description: 'Book a private 1-on-1 session, connection chart analysis, or ongoing guidance with Dirk Nellens.',
    openGraph: {
        title: 'Private Sessions | Dirk Nellens',
        description: 'Book a private 1-on-1 session, connection chart analysis, or ongoing guidance with Dirk Nellens.',
        images: [{ url: '/images/collage-ajna.png' }],
    }
};

export default function SessionsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
