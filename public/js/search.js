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
                <div class="card-img-wrap">
                <img src="${game.background_image || ''}" alt="${game.name}" />
                </div>
                <div class="card-body">
                <p class="card-title">${game.name}</p>
                <form action="/add" method="POST">
                    <input type="hidden" name="rawg_id" value="${game.id}" />
                    <input type="hidden" name="nome" value="${game.name}" />
                    <input type="hidden" name="capa" value="${game.background_image || ''}" />
                    <input type="hidden" name="status" value="quero jogar" />
                    <input type="hidden" name="avaliacao" value="0" />
                    <input type="hidden" name="notas" value="" />
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
