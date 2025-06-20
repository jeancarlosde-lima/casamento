import PageFooter from '@/components/page-footer';
import { HeroSection } from '@/components/sections/hero';
import { OurStorySection } from '@/components/sections/our-story';
import { EventDetailsSection } from '@/components/sections/event-details';
import { RsvpSection } from '@/components/sections/rsvp';
import { QuoteSection } from '@/components/sections/quote';
import { GallerySection } from '@/components/sections/gallery';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
       <div className="trinity-bg">
        <div className="trinity-symbol">✝</div>
        <div className="trinity-symbol">☩</div>
        <div className="trinity-symbol">✠</div>
        <div className="trinity-symbol">♱</div>
        <div className="trinity-symbol">✟</div>
    </div>
      <main className="flex-1">
        <HeroSection />
        <section className="py-16 md:py-32 text-center bg-card">
          <div className="container">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold leading-tight max-w-4xl mx-auto text-foreground">
              Um jardim digital para <span className="text-primary">nosso amor</span>
            </h2>
          </div>
        </section>
        <GallerySection />
        <QuoteSection />
        <EventDetailsSection />
        <OurStorySection />
        <RsvpSection />
      </main>
      <PageFooter />
    </div>
  );
}
