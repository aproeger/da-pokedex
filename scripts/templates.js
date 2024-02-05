function pokemonCardTemplate(index, data) {
  return `
    <div class="card pokemon-card ${
      data["types"][0]["type"]["name"]
    } rounded-4 shadow-sm text-white" role="button" onclick="openInfo(${index})" data-pokemon-id="${data["id"]}">
      <div class="card-body fw-medium d-flex flex-column">
        <div class="number d-flex justify-content-end text-white text-opacity-50">#${String(data["id"]).padStart(3, 0)}</div>
        <h3 class="name mb-3 text-capitalize z-1">${data["name"]}</h3>
        <div class="d-flex flex-fill">
          <ul class="elements m-0 list-unstyled d-inline-flex gap-2 flex-column flex-grow-1">
            ${pokemonCardTypesTemplate(data["types"])}
          </ul>
          <div class="image">
            <img
              class="img-fluid"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data["id"]}.png"
              alt="Bulbasaur"
            />
          </div>
        </div>
      </div>
    </div>
  `;
}

function pokemonCardTypesTemplate(types) {
  let html = "";

  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    html += `<li class="py-1 px-3 bg-white bg-opacity-25 rounded-5 text-center">${type["type"]["name"]}</li>`;
  }

  return html;
}

function pokemonBigCardTemplate(index, data) {
  return `
    <div class="card pokemon-card big ${data["types"][0]["type"]["name"]} rounded-5 shadow-sm flex-fill z-3 h-100" onclick="event.stopPropagation();">
      <div class="card-header border-0 bg-transparent text-white p-3 py-5 p-sm-5">
        <div data-bs-theme="dark" class="d-flex justify-content-end">
          <button type="button" class="btn-close" aria-label="Close" onclick="closeInfo()"></button>
        </div>
        <div class="d-flex justify-content-between align-items-end">
          <h2 class="name mb-3 text-capitalize fs-1">${data["name"]}</h2>
          <div class="number text-white fw-medium fs-5">#${String(data["id"]).padStart(3, 0)}</div>
        </div>

        <ul class="elements m-0 list-unstyled d-flex gap-2">
          ${pokemonBigCardTypesTemplate(data["types"])}
        </ul>

        <div class="image d-flex justify-content-between align-items-center flex-fill">
          ${pokemonBigCardPrevButtonTemplate(index)}
          <img
            class="img-fluid"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data["id"]}.png"
            alt="Bulbasaur"
          />
          ${pokemonBigCardNextButtonTemplate(index)}
        </div>
      </div>
      <div class="card-body bg-white rounded-5 fw-medium d-flex flex-column p-3 py-5 p-sm-5 overflow-hidden">
        <ul class="nav nav-underline nav-fill flex-nowrap mb-4">
          <li class="nav-item">
            <a id="nav-about" class="nav-link" role="button" onclick="showTab('about')">About</a>
          </li>
          <li class="nav-item">
            <a id="nav-base-stats" class="nav-link" role="button"  onclick="showTab('base-stats')">Base Stats</a>
          </li>
          <li class="nav-item">
            <a id="nav-moves" class="nav-link" role="button"  onclick="showTab('moves')">Moves</a>
          </li>
        </ul>

        ${pokemonBigCardBaseAboutTemplate(data["id"], data["height"], data["weight"], data["name"], data["abilities"])}
        ${pokemonBigCardBaseStatsTemplate(data["stats"])}
        ${pokemonBigCardBaseMovesTemplate(data["moves"])}

      </div>
    </div>
  `;
}

function pokemonBigCardTypesTemplate(types) {
  let html = "";

  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    html += `<li class="py-1 px-3 bg-white bg-opacity-25 rounded-5 text-center">${type["type"]["name"]}</li>`;
  }

  return html;
}

function pokemonBigCardPrevButtonTemplate(index) {
  if (pokemons[index - 1]) {
    return `
    <span role="button" onclick="openInfo(${index - 1})">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
    </span>
  `;
  } else {
    return `<span></span>`;
  }
}

function pokemonBigCardNextButtonTemplate(index) {
  if (pokemons[index + 1]) {
    return `
    <span role="button" onclick="openInfo(${index + 1})">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </span>
  `;
  } else {
    return `<span></span>`;
  }
}

function pokemonBigCardTypesTemplate(types) {
  let html = "";

  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    html += `<li class="py-1 px-3 bg-white bg-opacity-25 rounded-5 text-center">${type["type"]["name"]}</li>`;
  }

  return html;
}

function pokemonBigCardBaseStatsTemplate(stats) {
  let html = `<div id="base-stats" class="d-none">`;

  for (let i = 0; i < stats.length; i++) {
    const stat = stats[i];

    html += `
      <div class="d-flex align-items-center gap-4">
        <div class="text-secondary small text-uppercase" style="width: 120px">${stat["stat"]["name"]}</div>
        <div>${stat["base_stat"]}</div>
        <div class="flex-grow-1">
          <div class="progress" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="height: 5px">
            <div class="progress-bar bg-success" style="width: ${stat["base_stat"]}%"></div>
          </div>
        </div>
      </div>
    `;
  }

  html += `</div>`;
  return html;
}

function pokemonBigCardBaseAboutTemplate(id, height, weight, name, abilities) {
  abilities = abilities.map((item) => item["ability"]["name"]);

  return `
    <div id="about" class="d-none">
      <div class="d-flex gap-4 align-items-start">
        <div class="text-secondary w-25 text-capitalized">Number</div>
      <div class="text-capitalize">${id}</div>
    </div>
    <div class="d-flex gap-4 align-items-start">
        <div class="text-secondary w-25 text-capitalized">Name</div>
        <div class="text-capitalize">${name}</div>
      </div>
      <div class="d-flex gap-4 align-items-start">
        <div class="text-secondary w-25 text-capitalized">Height</div>
        <div>${height * 10} cm</div>
      </div>
      <div class="d-flex gap-4 align-items-start">
        <div class="text-secondary w-25 text-capitalized">Weight</div>
        <div class="text-capitalize">${weight / 10} kg</div>
      </div>
      <div class="d-flex gap-4 align-items-start">
        <div class="text-secondary w-25 text-capitalized">Abilities</div>
        <div class="text-capitalize">${abilities.join(", ")}</div>
      </div>
    </div>
    `;
}

function pokemonBigCardBaseMovesTemplate(moves) {
  let html = `<div id="moves" class="d-none overflow-y-scroll d-inline-flex gap-2 flex-wrap flex-shrink-1">`;

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];

    html += `
      <div class="py-1 px-3 small bg-secondary bg-opacity-25 rounded-5 text-center">${move["move"]["name"]}</div>
    `;
  }

  html += `</div>`;
  return html;
}
