// Busca jogos na RAWG via GET /search?q=... e renderiza os resultados

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

searchBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (!query) return;

    searchResults.innerHTML = "<p>Buscando...</p>";

    try {
        const res = await fetch(`/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();

        searchResults.innerHTML = "";

        // A RAWG retorna os jogos dentro de data.results
        data.results.forEach(game => {
            const card = document.createElement("div");
            card.classList.add("search-card");

            card.innerHTML = `
                <img src="${game.background_image || ''}" alt="${game.name}" />
                <div>
                    <h3>${game.name}</h3>
                    <!-- Formulário de adição — POST /add -->
                    <form action="/add" method="POST">
                        <input type="hidden" name="rawg_id" value="${game.id}" />
                        <input type="hidden" name="nome"    value="${game.name}" />
                        <input type="hidden" name="capa"    value="${game.background_image || ''}" />
                        <select type="hidden" name="status">
                        <option value="Quero jogar"></option>
                        <option value="Andamento"></option>
                        <option value="Concluído"></option>
                        </select>
                        <input type="hidden" name="avaliacao" value="" />
                        <input type="hidden" name="notas"     value="" />

                        <button type="submit">+ Adicionar</button>
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
