'use client';
import Image from 'next/image';

const galleryItems = [
    { text: "Nosso primeiro encontro", hint: "couple date" },
    { text: "O pedido de casamento", hint: "marriage proposal" },
    { text: "Momentos especiais", hint: "special moments" },
    { text: "Nossa jornada juntos", hint: "couple journey" },
    { text: "Preparativos do casamento", hint: "wedding planning" },
    { text: "Família e amigos", hint: "family friends" },
];

const galleryItems2 = [
    { text: "Conteúdo que ressoa com nossa frequência", hint: "abstract love" },
    { text: "Valor para vocês, não de vocês", hint: "friends celebration" },
    { text: "Uma celebração de empoderamento", hint: "empowerment" },
    { text: "Compartilhando nossa história", hint: "sharing story" },
    { text: "Criando memórias juntos", hint: "making memories" },
    { text: "O poder que exercemos", hint: "couple power" },
]

function GalleryRow({ items, reverse = false }: { items: { text: string, hint: string }[], reverse?: boolean }) {
    const allItems = [...items, ...items];

    return (
        <div className={`flex gap-4 md:gap-8 animate-scroll-horizontal ${reverse ? 'flex-row-reverse' : ''}`}>
            {allItems.map((item, index) => (
                <div key={index} className="relative flex-shrink-0 w-[250px] h-[320px] md:w-[300px] md:h-[400px] rounded-2xl overflow-hidden group transition-transform duration-300 hover:scale-105">
                    <Image
                        src={`https://placehold.co/400x500.png`}
                        alt={item.text}
                        data-ai-hint={item.hint}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-white text-lg font-medium text-center p-4">{item.text}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function GallerySection() {
    return (
        <section id="gallery" className="py-16 md:py-24 bg-card overflow-hidden">
            <div className="space-y-8 group">
                <GalleryRow items={galleryItems} />
                <GalleryRow items={galleryItems2} reverse />
            </div>
        </section>
    );
}
