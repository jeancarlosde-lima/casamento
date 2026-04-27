# Eloisa & Jean - Convite de Casamento Digital

Este é o repositório do convite de casamento digital de Eloisa & Jean, desenvolvido com tecnologias web modernas para criar uma experiência elegante e interativa para os convidados.

## Tecnologias Utilizadas

O projeto foi construído utilizando um conjunto de ferramentas modernas e eficientes, focadas em performance e qualidade de desenvolvimento:

*   **Framework Principal:** **Next.js (App Router)** - Utilizamos a versão mais recente do Next.js com o App Router para uma arquitetura baseada em componentes de servidor (React Server Components).
*   **Linguagem:** **TypeScript** - Para garantir um código robusto, seguro e de fácil manutenção.
*   **Biblioteca de UI:** **React** - A base para a construção de toda a interface de usuário interativa.
*   **Componentes de UI:** **shadcn/ui** - Uma coleção de componentes de alta qualidade, acessíveis e estilizados com Tailwind CSS.
*   **Estilização:** **Tailwind CSS** - Para estilização rápida e consistente.
*   **Fontes:** **Google Fonts (`next/font`)** - As fontes `Playfair Display`, `Aboreto` e `Poppins` foram importadas e otimizadas.
*   **Inteligência Artificial:** **Genkit** - Configurado para uso de IA do Google para funcionalidades como o "Assistente de Viagem".
*   **Hospedagem:** **Firebase App Hosting** - A aplicação está configurada para deploy automático no Firebase App Hosting ao realizar push para a branch principal no GitHub.

---

## Segurança e Privacidade

Durante a última atualização, implementamos melhorias críticas de segurança:
*   **Ofuscação de Dados:** A Chave PIX e o endereço de E-mail de contato foram ofuscados utilizando criptografia Base64. Eles não ficam mais visíveis no código-fonte, prevenindo o acesso por bots ou *scrapers* e evitando potenciais golpes ou spam.
*   **Interação Segura:** Os dados só são decodificados em tempo de execução quando o usuário final interage diretamente com os botões da interface para copiá-los.

---

## Deploy

O projeto é hospedado via **Firebase App Hosting**. Para atualizar o site em produção (`casamentoeloisaejean.com.br`), basta enviar o código atualizado para o GitHub:

```bash
git add .
git commit -m "sua mensagem"
git push origin master
```
O Firebase detectará a mudança no repositório `jeancarlosde-lima/casamento` e fará o build e o deploy automaticamente.
