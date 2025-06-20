
export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[80vh] flex items-center justify-center text-center bg-gradient-to-br from-background to-card/50 py-20">
      <div className="relative z-10 p-4 animate-fade-in container">
        <p className="text-lg md:text-xl text-muted-foreground uppercase tracking-wider mb-4">
            Convite de casamento de:
        </p>
        <h1 className="relative font-bold text-6xl md:text-8xl lg:text-9xl drop-shadow-lg text-primary leading-none">
          Eloisa & Jean
          <span className="absolute text-7xl md:text-9xl lg:text-[12rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 -z-10">
            💍
          </span>
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-muted-foreground font-light italic">
          10 de outubro de 2026
        </p>
        <p className="mt-8 text-base md:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          O amor conjugal é chamado a ser reflexo da perfeita unidade da Trindade: três Pessoas, um só Deus; dois corações, um só amor.
        </p>
      </div>
    </section>
  );
}
