const AMOUNT_TO_FETCH = 24;
const TABS = ["about", "base-stats", "moves"];
let pokemons = [];

function init() {
  fetchPokemons();
}

async function fetchPokemons() {
  let pokemonListContainer = document.getElementById("pokemon-list");
  let loadedPokemon = pokemons.length + AMOUNT_TO_FETCH;

  startLoading();

  for (let i = pokemons.length + 1; i <= loadedPokemon; i++) {
    let pokemonData = await fetchPokemon(i);
    pokemons.push(pokemonData);
    pokemonListContainer.insertAdjacentHTML("beforeend", pokemonCardTemplate(i - 1, pokemonData));
  }

  endLoading();
}

async function fetchPokemon(num) {
  let url = `https://pokeapi.co/api/v2/pokemon/${num}`;
  let response = await fetch(url);
  let responseAsJson = await response.json();
  return responseAsJson;
}

function openDialog() {
  let dialogContainer = document.getElementById("dialog");
  dialogContainer.classList.remove("d-none");
  document.body.classList.add("overflow-hidden");
}

function closeDialog() {
  let dialogContainer = document.getElementById("dialog");
  dialogContainer.classList.add("d-none");
  document.body.classList.remove("overflow-hidden");
}

function openInfo(index) {
  let dialogContainer = document.getElementById("dialog");
  openDialog();
  dialogContainer.innerHTML = pokemonBigCardTemplate(index, pokemons[index]);
  showTab("about");
}

function closeInfo() {
  let dialogContainer = document.getElementById("dialog");
  closeDialog();
  dialogContainer.innerHTML = "";
}

function startLoading() {
  let loadMoreButton = document.getElementById("load-more-button");
  let loadingDialogContainer = document.getElementById("loading");
  loadMoreButton.disabled = true;

  loadingDialogContainer.classList.remove("d-none");
  document.body.classList.add("overflow-hidden");
}

function endLoading() {
  let loadMoreButton = document.getElementById("load-more-button");
  let loadingDialogContainer = document.getElementById("loading");
  loadMoreButton.disabled = false;

  loadingDialogContainer.classList.add("d-none");
  document.body.classList.remove("overflow-hidden");
}

function showTab(name) {
  for (let i = 0; i < TABS.length; i++) {
    const tab = TABS[i];

    if (tab == name) {
      document.getElementById(tab).classList.remove("d-none");
      document.getElementById(`nav-${tab}`).classList.add("active");
    } else {
      document.getElementById(tab).classList.add("d-none");
      document.getElementById(`nav-${tab}`).classList.remove("active");
    }
  }
}

function search(event) {
  event.preventDefault();
  let term = document.getElementById("search-term").value;
  const results = pokemons.filter((pokemon) => pokemon["name"].includes(term));
  const resultIds = results.map((pokemon) => pokemon["id"]);
  filterPokemon(resultIds);
}

function filterPokemon(resultIds) {
  let cards = document.querySelectorAll(`[data-pokemon-id]`);
  let loadMoreButton = document.getElementById("load-more-button");
  resultIds.length == pokemons.length ? (loadMoreButton.disabled = false) : (loadMoreButton.disabled = true);

  for (let i = 0; i < cards.length; i++) {
    const element = cards[i];
    const id = Number(element.getAttribute("data-pokemon-id"));
    !resultIds.includes(id) ? element.classList.add("d-none") : element.classList.remove("d-none");
  }
}
