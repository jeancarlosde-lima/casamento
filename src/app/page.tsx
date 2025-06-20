import PageHeader from '@/components/page-header';
import PageFooter from '@/components/page-footer';
import { HeroSection } from '@/components/sections/hero';
import { OurStorySection } from '@/components/sections/our-story';
import { EventDetailsSection } from '@/components/sections/event-details';
import { RsvpSection } from '@/components/sections/rsvp';
import { GiftRegistrySection } from '@/components/sections/gift-registry';
import { TravelAssistantSection } from '@/components/sections/travel-assistant';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader />
      <main className="flex-1 animate-fade-in">
        <HeroSection />
        <OurStorySection />
        <EventDetailsSection />
        <RsvpSection />
        <GiftRegistrySection />
        <TravelAssistantSection />
      </main>
      <PageFooter />
    </div>
  );
}
