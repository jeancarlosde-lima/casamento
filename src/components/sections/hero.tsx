import Image from 'next/image';

export function HeroSection() {
  return (
    <section id="hero" className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Romantic wedding background"
        data-ai-hint="romantic flowers"
        layout="fill"
        objectFit="cover"
        className="brightness-50"
      />
      <div className="relative z-10 p-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl drop-shadow-lg">
          Eloisa & Jean
        </h1>
        <p className="mt-4 text-lg md:text-xl font-body drop-shadow-md">
          We're getting married!
        </p>
      </div>
    </section>
  );
}
