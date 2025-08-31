const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}" data-number="${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;

    pokemons.forEach((pokemon) => {
      const card = document.querySelector(
        `.pokemon[data-number='${pokemon.number}']`
      );
      if (card) {
        card.addEventListener("click", () => {
          showModal(pokemon);
        });
      }
    });
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

function showModal(pokemon) {
  const modal = document.getElementById("pokemonModal");
  const modalBody = document.getElementById("modalBody");

  modalBody.innerHTML = `
        <h2>${pokemon.name} (#${pokemon.number})</h2>
        <img src="${pokemon.photo}" alt="${
    pokemon.name
  }" style="width: 120px; height: 120px;">
        <p><strong>Tipo(s):</strong> ${pokemon.types.join(", ")}</p>
    `;

  modal.classList.add("show"); 
}

function closeModal() {
  document.getElementById("pokemonModal").classList.remove("show"); 
}

document.querySelector(".close-button").addEventListener("click", closeModal);
window.addEventListener("click", (event) => {
  const modal = document.getElementById("pokemonModal");
  if (event.target === modal) {
    closeModal();
  }
});