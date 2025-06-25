import PageFooter from '@/components/page-footer';
import { EventDetailsSection } from '@/components/sections/event-details';
import { GallerySection } from '@/components/sections/gallery';
import { HeroSection } from '@/components/sections/hero';
import { OurStorySection } from '@/components/sections/our-story';
import { QuoteSection } from '@/components/sections/quote';
import { RsvpSection } from '@/components/sections/rsvp';
import { AnimatedSection } from '@/components/animated-section';
import { GiftRegistrySection } from '@/components/sections/gift-registry';
import { SideNav } from '@/components/side-nav';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SideNav />
      <main className="flex-1">
        <HeroSection />
        <div className="relative z-20 bg-card">
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
          <AnimatedSection id="quote" className="py-16 md:py-24 bg-card">
            <QuoteSection />
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
        </div>
      </main>
      <PageFooter />
    </div>
  );
}
