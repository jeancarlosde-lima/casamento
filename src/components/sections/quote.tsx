export function QuoteSection() {
  return (
    <div className="container">
      <div className="max-w-3xl mx-auto bg-background p-8 md:p-12 rounded-2xl border-l-4 border-primary shadow-lg">
        <blockquote className="text-center font-poppins">
          <p className="text-xl md:text-2xl italic text-foreground/80 leading-relaxed">
            "Deus é comunhão de amor: o Pai dá tudo ao Filho, o Filho retribui tudo ao Pai, e esse dom recíproco é o Espírito Santo. Assim deve ser o amor entre os esposos."
          </p>
          <footer className="mt-6 text-lg font-semibold text-foreground">
            — São João Paulo II
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
