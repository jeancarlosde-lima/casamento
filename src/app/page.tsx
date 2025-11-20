import PageFooter from '@/components/page-footer';
import { EventDetailsSection } from '@/components/sections/event-details';
import { GallerySection } from '@/components/sections/gallery';
import { HeroSection } from '@/components/sections/hero';
import { OurStorySection } from '@/components/sections/our-story';
import { RsvpSection } from '@/components/sections/rsvp';
import { AnimatedSection } from '@/components/animated-section';
import { GiftRegistrySection } from '@/components/sections/gift-registry';
import { SideNav } from '@/components/side-nav';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SideNav />
      <main className="flex-1">
        <HeroSection />
        <div className="relative z-20 bg-background">
          <AnimatedSection className="py-16 md:py-32 text-center">
            <div className="container">
              <h2 className="font-display text-4xl md:text-6xl max-w-4xl mx-auto text-foreground">
                Um jardim digital para <span className="text-primary">nosso amor</span>
              </h2>
            </div>
          </AnimatedSection>
          <AnimatedSection id="gallery" className="py-16 md:py-24 bg-card">
            <GallerySection />
          </AnimatedSection>
          <AnimatedSection id="event-details" className="py-16 md:py-24 bg-background use-stagger">
            <EventDetailsSection />
          </AnimatedSection>
          <AnimatedSection id="our-story" className="py-16 md:py-24 bg-card use-stagger">
            <OurStorySection />
          </AnimatedSection>
          <AnimatedSection id="rsvp" className="py-16 md:py-24 bg-background use-stagger">
            <RsvpSection />
          </AnimatedSection>
          <AnimatedSection id="gift-registry" className="py-16 md:py-24 bg-card use-stagger">
            <GiftRegistrySection />
          </AnimatedSection>
           <AnimatedSection id="guestbook-cta" className="py-16 md:py-24 bg-background">
              <div className="container text-center max-w-2xl">
                  <h2 className="font-display text-4xl md:text-5xl text-foreground">Nosso Livro de Visitas</h2>
                  <p className="mt-4 text-muted-foreground text-lg">
                      Deixamos um espaço especial para que você possa ler as mensagens que recebemos. Clique no botão abaixo para ver nosso livro de visitas.
                  </p>
                  <Button asChild size="lg" className="mt-8 rounded-full">
                      <Link href="/guestbook">
                          <BookOpen className="mr-2 h-5 w-5" />
                          Acessar Livro de Visitas
                      </Link>
                  </Button>
              </div>
          </AnimatedSection>
        </div>
      </main>
      <PageFooter />
    </div>
  );
}
