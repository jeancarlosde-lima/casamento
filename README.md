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

Durante o desenvolvimento, enfrentamos um desafio persistente para fazer a imagem de fundo da seção principal aparecer corretamente. A dificuldade ocorreu por uma combinação de fatores técnicos relacionados a como o Next.js e o CSS interagem.

1.  **Imagens Locais vs. Externas:** As tentativas iniciais envolveram tanto imagens locais (dentro da pasta `public`) quanto links externos (hospedados no Imgur). Houve desafios em ambos os casos:
    *   **Imagens Locais:** Ocorreram inconsistências na referência ao caminho do arquivo. No Next.js, um arquivo em `public/image/fundo.jpg` deve ser referenciado como `/image/fundo.jpg`, e qualquer erro nesse caminho impede a imagem de carregar.
    *   **Imagens Externas com `next/image`:** Ao tentar usar o componente otimizado `<Image>` do Next.js com um link do Imgur, o site não exibia a imagem. Isso ocorria porque o Next.js exige que domínios externos sejam explicitamente autorizados no arquivo de configuração `next.config.ts` por razões de segurança, um passo que foi omitido inicialmente.

2.  **Componente `next/image` vs. Fundo CSS (`background-image`):** A tentativa de usar o componente `<Image>` para um fundo de tela cheia mostrou-se complexa. O componente é ideal para imagens de conteúdo, mas para um fundo decorativo que precisa preencher todo o espaço (`cover`) e ter uma sobreposição de cor, a propriedade `background-image` do CSS é uma solução mais direta e menos propensa a erros de layout.

**A solução final e mais robusta foi:**
*   Utilizar o link da imagem hospedada no Imgur.
*   Aplicá-la diretamente como um `background-image` via CSS na seção principal. Esta abordagem contorna as complexidades de configuração do Next.js para imagens externas, pois o navegador carrega a imagem diretamente via CSS, sem a intervenção do framework. Isso garantiu que a imagem preenchesse o contêiner corretamente e permitiu a fácil aplicação de uma camada de sobreposição escura para a legibilidade do texto.
