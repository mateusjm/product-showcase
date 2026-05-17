# Pokédex

## Contexto

Este projeto foi desenvolvido no âmbito de um **desafio técnico front-end**, com o objetivo de construir uma aplicação web completa: consumo de API externa, navegação entre telas, tipagem em TypeScript, interface responsiva e recursos adicionais de usabilidade.

O escopo previa uma **Pokédex online** — catálogo da primeira geração (151 Pokémon) — integrada à [PokéAPI](https://pokeapi.co/), servindo como vitrine de produto (*product showcase*) e demonstração de boas práticas em React.

O código-fonte está em `ProductShowcase/`.

---

## Problema

O desafio impunha restrições que, na prática, espelham limitações comuns em integrações com APIs de terceiros:

**Antes / sem a solução estruturada:**

- Dados de listagem **sem imagens** — apenas nome e URL de detalhe
- Risco de acoplamento entre UI e chamadas HTTP
- Ausência de tipagem consistente nas respostas da API
- Necessidade de múltiplas telas (listagem, detalhe, favoritos) com estado compartilhado
- Experiência prejudicada sem feedback de carregamento e sem persistência de preferências do usuário
- Dificuldade de evoluir o código sem separação clara de responsabilidades

---

## Solução

Foi desenvolvida uma **Single Page Application (SPA)** responsiva, organizada em camadas e integrada à PokéAPI.

**Ao utilizar a aplicação:**

- A listagem dos 151 Pokémon é carregada via `GET /pokemon?limit=151`
- Cada card exibe **nome e imagem oficial**, mesmo quando a API de listagem não fornece o sprite
- O clique em um card abre a ficha completa em `/pokemon/:id`, com nova requisição de detalhes
- O usuário pode **filtrar por nome** em tempo real, sem novas chamadas à API
- É possível montar um **time de até 6 favoritos**, com persistência entre sessões
- Estados de carregamento, listas vazias e feedback visual orientam o uso da interface

**Deploy para avaliação:** [https://product-showcase-kappa-lake.vercel.app/](https://product-showcase-kappa-lake.vercel.app/)

---

## Integração com a PokéAPI

A aplicação consome a API pública da PokéAPI (REST, sem autenticação). O acesso HTTP é centralizado em um cliente Axios configurável por variáveis de ambiente.

**Base da API:**

```
https://pokeapi.co/api/v2/pokemon
```

**Endpoints utilizados:**

| Operação | Endpoint | Finalidade |
|----------|----------|------------|
| Listagem | `GET /pokemon?limit=151` | Grid na página inicial |
| Detalhe | `GET /pokemon/{id ou nome}` | Nome, tipos, altura e peso |

**Tratamento de imagens**

O endpoint de listagem retorna apenas `name` e `url`. Para garantir consistência visual:

1. O **id** numérico é extraído do campo `url` da resposta;
2. A imagem oficial é montada a partir de `VITE_IMAGE_URL` + `/{id}.png`, utilizando o repositório de sprites da PokéAPI no GitHub.

Com isso:

- Todos os cards exibem arte oficial padronizada
- Não é necessária uma requisição extra por Pokémon apenas para obter a miniatura na listagem
- A solução permanece desacoplada da estrutura interna da URL de detalhe da API

**Normalização de medidas**

A API retorna altura em decímetros e peso em hectogramas. Na interface, os valores são convertidos para **metros** e **quilogramas**, facilitando a leitura pelo usuário final.

**Tipagem**

Interfaces TypeScript (`PokemonList`, `PokemonItem`) documentam o contrato com a API e evitam o uso de `any` no fluxo principal de dados.

---

## Arquitetura

A estrutura de pastas foi definida para facilitar manutenção, reduzir acoplamento e permitir evolução incremental:

```
src/
├── components/   # Elementos de interface reutilizáveis
├── contexts/     # Estado global (favoritos, notificações)
├── pages/        # Composição das rotas
├── services/     # Comunicação com a API
├── types/        # Contratos TypeScript
└── utils/        # Regras auxiliares (imagem, tipos, formatação)
```

**Maior dificuldade enfrentada**

Garantir que os favoritos permanecessem consistentes após recarregar a página e ao navegar entre rotas. A abordagem adotada combina **Context API** (estado reativo na interface) com **localStorage** (persistência local), sincronizando ambos a cada inclusão ou remoção.

---

## Funcionalidades

| Rota | Descrição |
|------|-----------|
| `/` | Listagem em grid responsivo, busca por nome e indicador de carregamento |
| `/pokemon/:id` | Ficha com imagem oficial, tipos coloridos, altura e peso |
| `/favoritos` | Time de até 6 Pokémon salvos pelo usuário |

**Recursos adicionais (bônus do desafio):**

- Filtro client-side por nome, com contagem de resultados
- Sistema de favoritos via Context API, com limite de 6 e página dedicada
- Persistência dos favoritos em `localStorage`
- Notificações de feedback ao favoritar ou remover
- Hospedagem estática na Vercel

---

## Tecnologias

- React 19 e TypeScript
- Vite
- Axios
- React Router DOM
- Tailwind CSS
- PokéAPI
- localStorage (persistência de favoritos)
- Vercel (deploy)

---

## Como executar

### Variáveis de ambiente

Crie o arquivo `ProductShowcase/.env`:

```env
VITE_API_URL=https://pokeapi.co/api/v2/pokemon
VITE_IMAGE_URL=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork
```

### Comandos

```bash
cd ProductShowcase
npm install
npm run dev
```

Build de produção: `npm run build`  
Pré-visualização do build: `npm run preview`

---

## Resultados

- Aplicação funcional com **listagem, detalhes e favoritos** em rotas distintas
- Integração estável com API externa, com serviço HTTP isolado e dados tipados
- Interface responsiva, com estados de carregamento e mensagens para busca vazia
- Time de favoritos persistido entre sessões, sem perda ao recarregar a página
- Solução publicada e acessível para avaliação sem necessidade de ambiente local

---

## Evoluções previstas

Com mais tempo de desenvolvimento, as próximas melhorias seriam:

- Cache das respostas da API e opção de atualização manual da listagem
- Skeletons de carregamento e refinamento de animações
- Tratamento explícito de erros (API indisponível, recurso inexistente)
- Filtros avançados por tipo, peso e altura
- Testes automatizados nos serviços e utilitários

---

## Observação

Este repositório documenta uma solução desenvolvida no contexto de um **desafio técnico front-end**, com foco no problema proposto, na abordagem de integração com API externa, nas decisões de arquitetura e no resultado entregue — incluindo deploy público para demonstração.
