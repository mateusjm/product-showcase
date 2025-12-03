<h2>Seção 1: Instruções para rodar</h2>

<b>Variáveis de ambiente necessárias:</b><br/>
VITE_API_URL=https://pokeapi.co/api/v2/pokemon <br/>
VITE_IMAGE_URL=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork

<b>Instalar dependências:</b><br/>
npm install

<b>Rodar o projeto:</b><br/>
npm run dev


<h2>Seção 2: Decisões de Design</h2>

<b>Por que essa estrutura de pastas?</b><br/>
A arquitetura foi organizada para facilitar manutenção, evitar acoplamento e permitir escalabilidade. A separação por componentes, serviços, contextos e tipagens deixa o código mais limpo, previsível e simples de evoluir.

<b>Maior dificuldade e como foi superada:</b><br/>
A maior dificuldade foi manter os Pokémon favoritos persistidos após recarregar a página. Resolvi isso usando Context API junto ao localStorage, garantindo consistência entre o estado global e o armazenamento local.

<b>O que não deu tempo de fazer e como faria:</b><br/>
Com mais tempo, eu refinaria o visual, principalmente animações e pequenos ajustes de responsividade. Também adicionaria skeletons de carregamento e detalhes de UI para tornar a experiência mais fluida e agradável.


<h2>Seção 3: Link para Deploy (Bônus)</h2>

Projeto hospedado:<br/>
https://product-showcase-kappa-lake.vercel.app/


<b>Explicação dos Bônus Implementados:</b><br/>
• <b>Deploy:</b> O projeto foi hospedado para demonstração rápida, garantindo fácil acesso ao avaliador sem necessidade de rodar localmente.<br/>
• <b>Filtro:</b> Adicionei um campo de pesquisa que filtra os Pokémon pelo nome diretamente no cliente, mantendo a busca leve e instantânea.<br/>
• <b>Contexto (Favoritos):</b> Implementei um sistema de favoritos usando Context API, permitindo salvar até 6 Pokémon e exibindo visualmente o estado de favoritado.<br/>
• <b>Cache:</b> Usei localStorage para persistir tanto a lista de favoritos quanto parte dos dados carregados, reduzindo chamadas desnecessárias e acelerando o carregamento.<br/>
• <b>Atualização:</b> A lógica de favoritos e dados permanece sincronizada entre UI e cache, permitindo atualização consistente entre sessões.<br/>


<h2>Seção Final: Recomendações</h2>

Eu melhoraria a busca adicionando filtros como tipo, peso e altura para torná-la mais completa. Também ajustaria o layout para oferecer maior conforto em telas menores e implementaria mensagens de erro mais claras caso a API falhe.
