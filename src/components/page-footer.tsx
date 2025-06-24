export default function PageFooter() {
  return (
    <footer className="py-16 px-8 bg-foreground text-background text-center">
      <div className="container flex flex-col items-center justify-center gap-4">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light">Com amor, Eloisa & Jean</h2>
        <div className="w-full pt-8 border-t border-background/20">
            <p className="text-sm opacity-60 font-light">
                Criado e desenvolvido por Jean Lima, todos os direitos reservados. © 2026
            </p>
        </div>
      </div>
    </footer>
  );
}
