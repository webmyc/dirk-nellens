import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Community',
    description: 'Join the premium Substack community for live monthly calls, human design archive access, and ongoing therapeutic support.',
    openGraph: {
        title: 'Community | Dirk Nellens',
        description: 'Join the premium Substack community for live monthly calls, human design archive access, and ongoing therapeutic support.',
        images: [{ url: '/images/dirk-2.jpg' }],
    }
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
