const pokemonsList = document.getElementById('pokemonsList')
const paginationID = document.getElementById('paginationID')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 20
let offset = 0

function renderPokemonTypes(types) {
  return types.map((type) => `<li class="type ${type}">${type}</li>`).join('')
}

function renderPokemon(pokemon) {
  return `
      <li class="pokemon ${pokemon.mainType}">
      <div class="header">
        <span class="name">${pokemon.name}</span>
        <span class="number">#${formatNumber(pokemon.id)}</span>
      </div>

      <div class="detail">
        <ol class="types">
          ${renderPokemonTypes(pokemon.types)}
        </ol>

        <img
          src="${pokemon.image}"
          alt="${pokemon.name} sprite"
        />
      </div>
    </li>
  `
}

function formatNumber(value, padding = 3) {
  const zeroes = new Array(padding + 1).join('0')
  return (zeroes + value).slice(-padding)
}

function loadPokemons(offset, limit) {
  // eslint-disable-next-line no-undef
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonsList.innerHTML += pokemons
      .map((pokemon) => renderPokemon(pokemon))
      .join('')
  })
}

loadPokemons(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit

  const qtdRecordNextPage = offset + limit

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemons(offset, newLimit)

    paginationID.parentElement.removeChild(paginationID)
  } else {
    loadPokemons(offset, limit)
  }
})
