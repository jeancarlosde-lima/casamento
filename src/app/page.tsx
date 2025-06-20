import PageFooter from '@/components/page-footer';
import PageHeader from '@/components/page-header';
import { EventDetailsSection } from '@/components/sections/event-details';
import { GallerySection } from '@/components/sections/gallery';
import { HeroSection } from '@/components/sections/hero';
import { OurStorySection } from '@/components/sections/our-story';
import { QuoteSection } from '@/components/sections/quote';
import { RsvpSection } from '@/components/sections/rsvp';
import { AnimatedSection } from '@/components/animated-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHeader />
      <div className="trinity-bg">
        <div className="trinity-symbol">✝</div>
        <div className="trinity-symbol">☩</div>
        <div className="trinity-symbol">✠</div>
        <div className="trinity-symbol">♱</div>
        <div className="trinity-symbol">✟</div>
      </div>
      <main className="flex-1">
        <HeroSection />
        <AnimatedSection className="py-16 md:py-32 text-center bg-card">
          <div className="container">
            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-semibold leading-tight max-w-4xl mx-auto text-foreground">
              Um jardim digital para <span className="text-primary">nosso amor</span>
            </h2>
          </div>
        </AnimatedSection>
        <AnimatedSection id="gallery" className="py-16 md:py-24 bg-card overflow-hidden">
          <GallerySection />
        </AnimatedSection>
        <AnimatedSection id="quote" className="py-16 md:py-24 bg-card">
          <QuoteSection />
        </AnimatedSection>
        <AnimatedSection id="event-details" className="py-16 md:py-24 bg-background">
          <EventDetailsSection />
        </AnimatedSection>
        <AnimatedSection id="our-story" className="py-16 md:py-24 bg-card">
          <OurStorySection />
        </AnimatedSection>
        <AnimatedSection id="rsvp" className="py-16 md:py-24 bg-card">
          <RsvpSection />
        </AnimatedSection>
      </main>
      <PageFooter />
    </div>
  );
}
