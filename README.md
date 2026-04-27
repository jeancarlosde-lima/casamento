# Digital Wedding Invitation Platform

Uma plataforma digital de convite de casamento de alto padrão, projetada para oferecer uma experiência de usuário excepcional (UX) através de um design moderno, performance otimizada e segurança de dados.

## 🏛 Arquitetura e Tecnologias

A aplicação foi construída sob uma arquitetura moderna baseada em componentes de servidor (Server-Side Rendering e React Server Components), garantindo tempo de carregamento otimizado e SEO aprimorado.

- **Core Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript (Strict Mode) para segurança de tipagem e manutenibilidade em escala.
- **Interface e Componentes:** 
  - React 18
  - `shadcn/ui` para componentes base acessíveis (WAI-ARIA compliant).
  - Estilização utilitária via Tailwind CSS, com suporte a temas e consistência de design system.
- **Integração de IA:** Google Genkit para fluxos automatizados e suporte ao "Assistente de Viagem".
- **Hospedagem e CI/CD:** Firebase App Hosting, permitindo integrações contínuas e deploys otimizados direto do repositório GitHub.

## 🛡️ Segurança e Privacidade

Seguindo as melhores práticas de Red Teaming e segurança de front-end:
- **Proteção de Dados Sensíveis:** Chaves transacionais (como chaves PIX e endereços de e-mail) não são expostas no HTML estático ou em código fonte legível.
- **Ofuscação Dinâmica:** Os dados de contato e doações são criptografados em tempo de compilação (Base64) e decodificados estritamente em tempo de execução via interação do usuário, prevenindo a extração automatizada por web scrapers e bots maliciosos.

## 🎨 Design System e Usabilidade

- **Tipografia:** Implementação das fontes *Playfair Display* e *Aboreto* via `next/font` para garantir layout contínuo (zero Cumulative Layout Shift - CLS).
- **Acessibilidade e Fitts's Law:** Áreas de toque aumentadas em dispositivos móveis, transições suaves de estado (hovers e focus) e suporte a navegação por teclado.
- **Composição Visual:** Adoção de grid orgânico e regra de paleta de cores (60-30-10) para criar um ambiente digital sofisticado e sem atrito.

## 🚀 Instalação e Execução Local

```bash
# Instalar as dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:9002`.

## 📦 Deploy

Este projeto está configurado via Firebase App Hosting.
O processo de CI/CD é acionado automaticamente a cada commit enviado para a branch `main`.

```bash
git add .
git commit -m "feat: sua mensagem descritiva"
git push origin main
```
