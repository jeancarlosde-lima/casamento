import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="sticky top-0 z-10 flex h-screen justify-center bg-foreground/20 text-center text-white"
    >
      {/* Use a vertical image for mobile, and the horizontal one for desktop */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-hero-desktop bg-hero-mobile"
      />
      {/* Overlay escurecendo a imagem */}
      <div className="absolute inset-0 z-10 bg-foreground/40" />

      {/* Conteúdo acima da imagem */}
      <div className="relative z-20 p-4 animate-fade-in container flex h-full flex-col justify-center items-center">
        <div className="flex flex-col items-center text-center">
            <p className="text-lg md:text-xl text-white/80 uppercase tracking-wider">
              Convite de casamento de:
            </p>
            <h1 className="mt-2 font-display text-[clamp(2.5rem,10vw,4rem)] sm:text-6xl md:text-8xl lg:text-9xl drop-shadow-lg leading-tight whitespace-nowrap">
              Eloisa &amp; Jean
            </h1>
            <p className="mt-2 text-xl md:text-2xl text-white/80 font-light italic">
              10 de outubro de 2026
            </p>
            <p className="mt-4 text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              O amor conjugal é chamado a ser reflexo da perfeita unidade da Trindade: três Pessoas, um só Deus; dois corações, um só amor.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="rounded-full shadow-lg hover:shadow-primary/40 transition-shadow">
                <a href="#rsvp">Mande sua mensagem aqui</a>
              </Button>
            </div>
        </div>
      </div>
    </section>
  );
}
