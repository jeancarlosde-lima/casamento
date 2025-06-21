import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[100vh] flex items-center justify-center text-center text-white py-20 overflow-hidden bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://imgur.com/undefined')`,
        backgroundPosition: 'center 30%',
      }}
    >
      {/* Overlay escurecendo a imagem */}
      <div className="absolute inset-0 z-10 bg-black/60" />

      {/* Conteúdo acima da imagem */}
      <div className="relative z-20 p-4 animate-fade-in container">
        <p className="text-lg md:text-xl text-white/80 uppercase tracking-wider mb-4">
          Convite de casamento de:
        </p>
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl drop-shadow-lg leading-tight">
          Eloisa & Jean
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
