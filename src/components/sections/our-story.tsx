
const storyParts = [
    {
        title: "O Início: Uma Amizade em Deus",
        text: "Nossa caminhada começou com o mais belo dos alicerces: uma amizade sincera. Acreditamos que não foi o acaso que nos uniu, mas a suave Providência Divina que, em Seu tempo perfeito, entrelaçou nossos caminhos para que, juntos, pudéssemos florescer."
    },
    {
        title: "A Gratidão como Oração",
        text: "Elevamos nossos corações em um cântico de gratidão ao Pai. Cada sorriso e cada passo é um eco de Sua infinita bondade. Reconhecemos que o amor que hoje nos une é um dom imerecido, um presente precioso que nos foi confiado para cuidarmos e honrarmos."
    },
    {
        title: "Refletindo o Amor Trinitário",
        text: "Contemplamos na Santíssima Trindade o modelo perfeito de comunhão. Um Deus que é Amor, relação e doação mútua. É este o mistério que aspiramos viver: um amor que não se fecha, mas que transborda em vida e graça, onde um se doa inteiramente ao outro."
    },
    {
        title: "Nossa Missão a Dois",
        text: "Firmamos nosso \"sim\" um ao outro, e também a Deus. Nosso compromisso é construir um lar que seja um santuário de oração, um refúgio de paz e um farol de esperança para o mundo. Com a graça divina, desejamos ser um testemunho vivo do amor de Cristo."
    }
]

export function OurStorySection() {
  return (
    <section id="our-story" className="py-16 md:py-24 bg-card/50">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="font-bold text-4xl md:text-5xl">A Fonte de Nossa Alegria</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl mx-auto">
            {storyParts.map((part) => (
                <div key={part.title} className="text-left">
                    <h3 className="text-2xl font-semibold mb-3 text-primary/90">{part.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        {part.text}
                    </p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
