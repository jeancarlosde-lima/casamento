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
    <div className="container">
      <div className="mx-auto max-w-2xl text-center mb-12 stagger-item" style={{'--delay': '0ms'} as React.CSSProperties}>
        <h2 className="font-display text-4xl md:text-5xl">A Fonte de Nossa Alegria</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto font-poppins">
          {/* Item 1 */}
          <div className="md:col-span-2 rounded-2xl bg-card p-8 stagger-item" style={{'--delay': '150ms'} as React.CSSProperties}>
              <h3 className="text-2xl mb-3 font-semibold text-primary/90 font-display">{storyParts[0].title}</h3>
              <p className="text-muted-foreground leading-relaxed font-normal">
                  {storyParts[0].text}
              </p>
          </div>
          {/* Item 2 */}
          <div className="rounded-2xl bg-card p-8 stagger-item" style={{'--delay': '300ms'} as React.CSSProperties}>
              <h3 className="text-2xl mb-3 font-semibold text-primary/90 font-display">{storyParts[1].title}</h3>
              <p className="text-muted-foreground leading-relaxed font-normal">
                  {storyParts[1].text}
              </p>
          </div>
           {/* Item 3 */}
          <div className="rounded-2xl bg-card p-8 stagger-item" style={{'--delay': '450ms'} as React.CSSProperties}>
              <h3 className="text-2xl mb-3 font-semibold text-primary/90 font-display">{storyParts[2].title}</h3>
              <p className="text-muted-foreground leading-relaxed font-normal">
                  {storyParts[2].text}
              </p>
          </div>
           {/* Item 4 */}
          <div className="md:col-span-2 rounded-2xl bg-card p-8 stagger-item" style={{'--delay': '600ms'} as React.CSSProperties}>
              <h3 className="text-2xl mb-3 font-semibold text-primary/90 font-display">{storyParts[3].title}</h3>
              <p className="text-muted-foreground leading-relaxed font-normal">
                  {storyParts[3].text}
              </p>
          </div>
      </div>
    </div>
  );
}
