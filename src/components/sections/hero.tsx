import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="sticky top-0 z-10 flex h-screen items-center justify-center bg-foreground/20 py-20 text-center text-white"
    >
      {/* Use a vertical image for mobile, and the horizontal one for desktop */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-hero-mobile md:bg-hero-desktop"
      />
      {/* Overlay escurecendo a imagem */}
      <div className="absolute inset-0 z-10 bg-foreground/40" />

      {/* Conteúdo acima da imagem */}
      <div className="relative z-20 p-4 animate-fade-in container">
        <p className="whitespace-nowrap text-lg md:text-xl text-white/80 uppercase tracking-wider mb-4">
          Convite de casamento de:
        </p>
        <h1 className="font-display text-[clamp(2.5rem,12vw,4rem)] sm:text-6xl md:text-8xl lg:text-9xl drop-shadow-lg leading-tight whitespace-nowrap">
          Eloisa &amp; Jean
        </h1>
        <p className="mt-8 text-xl md:text-2xl text-white/80 font-light italic">
          10 de outubro de 2026
        </p>
        <p className="mt-8 text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
          O amor conjugal é chamado a ser reflexo da perfeita unidade da Trindade: três Pessoas, um só Deus; dois corações, um só amor.
        </p>
        <div className="mt-10">
          <Button asChild size="lg" className="rounded-full shadow-lg hover:shadow-primary/40 transition-shadow">
            <a href="#rsvp">Mande sua mensagem aqui</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
