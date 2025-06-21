# Eloisa & Jean - Convite de Casamento Digital

Este é o repositório do convite de casamento digital de Eloisa & Jean, desenvolvido com tecnologias web modernas para criar uma experiência elegante e interativa para os convidados.

## Tecnologias Utilizadas

O projeto foi construído utilizando um conjunto de ferramentas modernas e eficientes, focadas em performance e qualidade de desenvolvimento:

*   **Framework Principal:** **Next.js (App Router)** - Utilizamos a versão mais recente do Next.js com o App Router para uma arquitetura baseada em componentes de servidor (React Server Components), o que otimiza o carregamento da página e melhora a performance geral.
*   **Linguagem:** **TypeScript** - Para garantir um código mais robusto, seguro e de fácil manutenção.
*   **Biblioteca de UI:** **React** - A base para a construção de toda a interface de usuário interativa.
*   **Componentes de UI:** **shadcn/ui** - Uma coleção de componentes de alta qualidade, acessíveis e estilizados com Tailwind CSS, que serviram como base para os elementos visuais do site (botões, cards, etc.).
*   **Estilização:** **Tailwind CSS** - Para uma estilização rápida e consistente, utilizando uma abordagem "utility-first" que se integra perfeitamente com o Next.js e shadcn/ui. As cores e fontes do site foram configuradas no tema do Tailwind.
*   **Fontes:** **Google Fonts (`next/font`)** - As fontes `Playfair Display`, `Aboreto` e `Poppins` foram importadas e otimizadas através do sistema de fontes do Next.js para evitar requisições extras e melhorar a performance.
*   **Inteligência Artificial:** **Genkit** - O projeto está configurado para usar Genkit, o framework de IA do Google, para futuras funcionalidades como o "Assistente de Viagem".
*   **Hospedagem:** **Firebase App Hosting** - A aplicação está configurada para ser hospedada no Firebase App Hosting.

---

## Análise do Problema com a Imagem de Fundo

Durante o desenvolvimento, enfrentamos um desafio persistente para fazer a imagem de fundo da seção principal aparecer corretamente. A dificuldade ocorreu por uma combinação de fatores técnicos relacionados a como o Next.js lida com imagens:

1.  **Uso de Imagens Externas (Imgur):** A primeira tentativa foi usar um link de imagem hospedado no Imgur. Por padrão, o Next.js bloqueia imagens de domínios externos por razões de segurança. Para que funcionasse, seria necessário adicionar o domínio `i.imgur.com` ao arquivo de configuração `next.config.ts`. Essa configuração não foi feita corretamente no início, causando a falha.

2.  **Caminho de Imagens Locais:** Quando mudamos para uma imagem local, colocada na pasta `public`, houve confusão sobre o caminho correto a ser usado no código. No Next.js, arquivos dentro da pasta `public` são servidos a partir da raiz do site. Por exemplo, um arquivo em `public/image/fundo.jpg` deve ser referenciado no código como `/image/fundo.jpg`. Pequenos erros ou inconsistências nesse caminho impediram que a imagem fosse encontrada pelo servidor.

3.  **`next/image` vs. Fundo CSS:** Houve uma alternância entre usar o componente otimizado `<Image>` do Next.js e a propriedade CSS `background-image`. O componente `<Image>` é excelente para a maioria dos casos, mas para um fundo que precisa preencher toda a tela (`cover`), a abordagem com CSS é, muitas vezes, mais direta e menos suscetível a erros de configuração de layout.

**A solução final e mais robusta foi:**
*   Colocar a imagem no caminho correto dentro da pasta `public`.
*   Aplicá-la como um `background-image` via CSS, garantindo que ela preencha o contêiner corretamente sem ser cortada ou mal posicionada, e permitindo a fácil aplicação de uma camada de sobreposição escura para legibilidade do texto.