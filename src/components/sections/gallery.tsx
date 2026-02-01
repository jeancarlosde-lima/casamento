'use client';
import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import galleryItems from '@/lib/placeholder-images.json';


export function GallerySection() {
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; hint: string; width: number; height: number; } | null>(null);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [
        Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true }),
    ]);
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl text-foreground">Galeria</h2>
                <p className="mt-4 text-muted-foreground text-lg">
                    Alguns momentos de nossa história.
                </p>
            </div>
            {galleryItems.gallery.length > 0 ? (
                <div className="embla group/gallery">
                    <div className="embla__viewport" ref={emblaRef}>
                        <div className="embla__container">
                            {galleryItems.gallery.map((item, index) => {
                                const src = `https://picsum.photos/seed/${item.seed}/${item.width}/${item.height}`;
                                return (
                                    <div className="embla__slide" key={index}>
                                        <button
                                            onClick={() => setSelectedImage({ src, alt: item.text, hint: item.hint, width: item.width, height: item.height })}
                                            className="relative block aspect-[4/5] w-full rounded-2xl overflow-hidden group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-4 focus:ring-offset-card transition-transform duration-300 ease-in-out hover:!scale-105 hover:-translate-y-1"
                                        >
                                            <Image
                                                src={src}
                                                alt={item.text}
                                                data-ai-hint={item.hint}
                                                width={item.width}
                                                height={item.height}
                                                className="object-cover w-full h-full"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300" />
                                            <div className="absolute bottom-0 left-0 p-4">
                                                <p className="text-white text-base font-medium text-left">{item.text}</p>
                                            </div>
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <Button
                        onClick={scrollPrev}
                        className="embla__button embla__button--prev"
                        disabled={prevBtnDisabled}
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                        onClick={scrollNext}
                        className="embla__button embla__button--next"
                        disabled={nextBtnDisabled}
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-muted-foreground">Em breve, compartilharemos nossas fotos aqui.</p>
                </div>
            )}


            <Dialog open={!!selectedImage} onOpenChange={(isOpen) => { if (!isOpen) setSelectedImage(null); }}>
                <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none shadow-none">
                    {selectedImage && (
                        <>
                           <DialogHeader className="sr-only">
                                <DialogTitle>{selectedImage.alt}</DialogTitle>
                                <DialogDescription>Imagem ampliada de {selectedImage.alt}.</DialogDescription>
                            </DialogHeader>
                            <div className="relative" style={{ aspectRatio: `${selectedImage.width} / ${selectedImage.height}`}}>
                                <Image
                                    src={selectedImage.src}
                                    alt={selectedImage.alt}
                                    data-ai-hint={selectedImage.hint}
                                    fill
                                    className="object-contain rounded-lg"
                                 />
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
