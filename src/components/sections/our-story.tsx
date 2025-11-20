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
        <h2 className="font-display text-4xl md:text-5xl">Nossa História</h2>
         <p className="mt-4 text-muted-foreground text-lg">
            “Deus é comunhão de amor: o Pai dá tudo ao Filho, o Filho retribui tudo ao Pai, e esse dom recíproco é o Espírito Santo. Assim deve ser o amor entre os esposos.” — São João Paulo II
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto font-poppins">
          {storyParts.map((part, index) => (
               <div key={index} className="rounded-2xl bg-background p-8 stagger-item" style={{'--delay': `${(index + 1) * 150}ms`} as React.CSSProperties}>
                  <h3 className="text-2xl mb-3 font-semibold text-primary/90 font-display">{part.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-normal">
                      {part.text}
                  </p>
              </div>
          ))}
      </div>
    </div>
  );
}
