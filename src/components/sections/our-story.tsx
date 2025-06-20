import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export function OurStorySection() {
  return (
    <section id="our-story" className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl">Our Story</h2>
          <p className="mt-4 text-muted-foreground">A journey of love, laughter, and a lifetime to come.</p>
        </div>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-8 md:p-12 order-2 md:order-1">
                <h3 className="font-headline text-2xl mb-4">How We Met</h3>
                <p className="text-muted-foreground mb-4">
                  Our story began on a sunny afternoon, not with a dramatic movie scene, but with a simple, shared laugh over a spilled coffee. That small moment of connection sparked a conversation that lasted for hours, and we both knew we had found something special.
                </p>
                <h3 className="font-headline text-2xl mt-8 mb-4">The Proposal</h3>
                <p className="text-muted-foreground">
                  Years of adventures, dreams, and unwavering support led to a quiet evening under a sky full of stars. On the same spot where we had our first real date, one of us got down on one knee, and with a heart full of joy, the other said "yes." It was a perfect, personal moment that marked the beginning of our forever.
                </p>
              </div>
              <div className="relative h-64 md:h-full w-full order-1 md:order-2">
                 <Image
                  src="https://placehold.co/600x800.png"
                  alt="Eloisa and Jean"
                  data-ai-hint="happy couple"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
