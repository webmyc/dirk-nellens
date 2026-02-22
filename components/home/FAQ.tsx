import { FadeUp, FadeUpStaggerGroup } from '@/components/ui/FadeUp';
import Script from 'next/script';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
    {
        question: "What is Human Design?",
        answer: "Human Design is a logical system that provides a visual map of your unique energetic architecture. It synthesizes ancient wisdom traditions (Astrology, the I Ching, the Chakras, the Kabbalah) with modern science (Quantum Physics, Genetics) to offer an actionable manual on how you are built to make decisions, interact with others, and navigate life authentically."
    },
    {
        question: "How is a Human Design reading different from therapy?",
        answer: "A Human Design analysis provides the 'map' of your energetic mechanics—showing how you naturally function when healthy versus when pulled off track by conditioning. Therapy provides the ongoing, compassionate 'container' to actually do the emotional work of deconditioning, integrating those insights, and healing the wounds that keep you trapped in unhelpful patterns. They work beautifully together."
    },
    {
        question: "Do I need to know my chart before a session?",
        answer: "For a Personal Chart Analysis, you do not need prior knowledge. For a Connection Analysis (Couples), it is highly recommended that both individuals already have a solid foundational understanding of their own individual designs before exploring how the two charts interact."
    },
    {
        question: "Where do the sessions take place?",
        answer: "All sessions are conducted entirely online via Zoom, allowing for a comfortable and focused environment regardless of your location. Every session is recorded so you can revisit the insights whenever you wish."
    },
    {
        question: "What exact birth details are required?",
        answer: "To generate an accurate Human Design chart, I need your exact Date of Birth, Time of Birth (as precise as possible), and the City and Country of your birth."
    }
];

export function FAQ() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    };

    return (
        <section className="py-24 md:py-32 bg-[#F7F4EF] border-t border-[#2B2218]/5">
            {/* JSON-LD Schema */}
            <Script
                id="faq-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <FadeUp delay={0.1} className="text-center mb-16">
                    <h2 className="font-serif text-[42px] md:text-[56px] text-[#2B2218] tracking-[-0.01em]">
                        Common Questions
                    </h2>
                </FadeUp>

                <FadeUp delay={0.2}>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border border-[#2B2218]/10 bg-white rounded-[24px] px-6 md:px-8 py-2 data-[state=open]:bg-[#F0EBE3] transition-colors"
                            >
                                <AccordionTrigger className="font-serif text-[20px] md:text-[24px] text-[#2B2218] hover:no-underline text-left py-6">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="font-sans text-[16px] md:text-[18px] text-[#2B2218]/70 leading-[1.7] pb-8">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </FadeUp>
            </div>
        </section>
    );
}
