// Referências aos elementos do DOM
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
 
// Dispara a busca ao clicar no botão
searchBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (!query) return; // Ignora se o campo estiver vazio
 
    searchResults.innerHTML = "<p>Buscando...</p>";
 
    try {
        // Chama o backend que repassa a busca para a RAWG API
        const res = await fetch(`/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
 
        searchResults.innerHTML = "";
 
        // A RAWG retorna os jogos dentro de data.results
        data.results.forEach(game => {
            const card = document.createElement("div");
            card.classList.add("search-card");
 
            // Monta o card com a capa, nome e formulário de adição
            card.innerHTML = `
                <div class="card-img-wrap">
                    <img src="${game.background_image || ''}" alt="${game.name}" />
                </div>
                <div class="card-body">
                    <p class="card-title">${game.name}</p>
                    <form action="/add" method="POST">
                        <!-- Dados da API enviados como campos ocultos -->
                        <input type="hidden" name="rawg_id" value="${game.id}" />
                        <input type="hidden" name="nome"    value="${game.name}" />
                        <input type="hidden" name="capa"    value="${game.background_image || ''}" />
 
                        <!-- Status padrão ao adicionar — pode ser editado depois -->
                        <input type="hidden" name="status"    value="quero jogar" />
                        <input type="hidden" name="avaliacao" value="0" />
                        <input type="hidden" name="notas"     value="" />
 
                        <button type="submit" class="card-btn">+ Adicionar</button>
                    </form>
                </div>
            `;
 
            searchResults.appendChild(card);
        });
 
    } catch (err) {
        searchResults.innerHTML = "<p>Erro ao buscar jogos.</p>";
        console.error(err);
    }
});