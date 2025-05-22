# Cine Blog

Este é um projeto de blog desenvolvido em Angular, focado em notícias e artigos sobre cinema, séries e entretenimento. As notícias são obtidas em tempo real da API do GNews.

## Funcionalidades

- Listagem de notícias recentes sobre entretenimento.
- Busca de artigos por palavra-chave.
- Filtragem de posts por categoria.
- Visualização detalhada de cada artigo.
- Sistema de comentários para cada post.
- Interface responsiva e moderna.

## Tecnologias Utilizadas

- [Angular](https://angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/) (para SSR e API)
- [GNews API](https://gnews.io/)
- CSS Flexbox e Media Queries para responsividade

## Como executar o projeto

1. Instale as dependências:
   ```sh
   npm install
   ```

2. Execute o servidor de desenvolvimento:
   ```sh
   npm run start
   ```

3. Acesse o projeto em [http://localhost:4200](http://localhost:4200)

## Estrutura de Pastas

- `src/app/components`: Componentes reutilizáveis (menu, cards, comentários, etc)
- `src/app/pages`: Páginas principais (home, categoria, busca, conteúdo)
- `src/app/services`: Serviços para integração com API e gerenciamento de dados

## Observações

- As notícias são atualizadas automaticamente a cada hora via integração com a GNews API.
- O sistema de comentários é local e não persiste após recarregar a página.

---

Desenvolvido por Werik da Silva Pires.