'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const galleryItems = [
    { text: "Nosso primeiro encontro", hint: "couple date" },
    { text: "O pedido de casamento", hint: "marriage proposal" },
    { text: "Momentos especiais", hint: "special moments" },
    { text: "Nossa jornada juntos", hint: "couple journey" },
    { text: "Preparativos do casamento", hint: "wedding planning" },
    { text: "Família e amigos", hint: "family friends" },
    { text: "Conteúdo que ressoa com nossa frequência", hint: "abstract love" },
    { text: "Valor para vocês, não de vocês", hint: "friends celebration" },
    { text: "Uma celebração de empoderamento", hint: "empowerment" },
    { text: "Compartilhando nossa história", hint: "sharing story" },
    { text: "Criando memórias juntos", hint: "making memories" },
    { text: "O poder que exercemos", hint: "couple power" },
];

export function GallerySection() {
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; hint: string } | null>(null);

    return (
        <div className="container">
             <div className="mx-auto max-w-2xl text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl text-foreground">Galeria</h2>
                <p className="mt-4 text-muted-foreground text-lg">
                    Clique em uma imagem para ver mais.
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {galleryItems.map((item, index) => {
                    const src = `https://placehold.co/400x500.png`;
                    return (
                        <button
                            key={index}
                            onClick={() => setSelectedImage({ src, alt: item.text, hint: item.hint })}
                            className="relative block aspect-[4/5] w-full rounded-2xl overflow-hidden group transition-shadow duration-300 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-4 focus:ring-offset-card"
                        >
                            <Image
                                src={src}
                                alt={item.text}
                                data-ai-hint={item.hint}
                                fill
                                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 p-4">
                                <p className="text-white text-base font-medium text-left">{item.text}</p>
                            </div>
                        </button>
                    )
                })}
            </div>

            <Dialog open={!!selectedImage} onOpenChange={(isOpen) => { if (!isOpen) setSelectedImage(null); }}>
                <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none shadow-none">
                    {selectedImage && (
                        <div className="relative aspect-square md:aspect-video w-full">
                             <Image
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                data-ai-hint={selectedImage.hint}
                                fill
                                className="object-contain rounded-lg"
                            />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
