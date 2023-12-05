async function getPokemonData(type = "water", limit = 3) {
  const URL = `https://pokeapi.co/api/v2/type/${type}`;
  //constante donde guardara los datos traidos de la url de la api
  const response = await fetch(URL);
  const { pokemon } = await response.json();

  //creamos un map para traer los datos del pokemon segun el tipo (fire)
  const pokemonPromises = pokemon.slice(0, limit).map(async (entry) => {
    const response = await fetch(entry.pokemon.url);
    return response.json();
  });

  return Promise.all(pokemonPromises);
}

//llamamos un funcion donde se crea el array de los datos a traer para la tarjeta 
function createPokemonCard(pokemon) {
  const { sprites, name, types, abilities, base_experience, stats, weight, height, species } = pokemon;
  const hiddenAbility = abilities[1] ? abilities[1].ability.name : 'N/A';

  //se crea la tarjeta donde se visualizan los datos del pokemon
  const card = document.createElement("div");
  card.classList.add("team1");
  card.innerHTML = `
      <label>
        <input type="checkbox">
        <div class="card">
          <div class="front">
            <p><img src="${sprites.front_default}" ></p>
            <p>${name}</p>
          </div>
          <div class="back">
            <p>Tipo: ${types[0].type.name}</p>
            <p>Habilidad: ${abilities[0].ability.name}</p>
            <p>Habilidad Oculta: ${hiddenAbility}</p>
            <p>Experiencia Base: ${base_experience}</p>
            <p>HP: ${stats[0].base_stat}</p>
            <p>Peso: ${weight}</p>
            <p>Altura: ${height}</p>
            <p>Especie: ${species.name}</p>
          </div>
        </div>
      </label>
    `;
    const card2 = document.createElement("div");
    card2.classList.add("team2");
    card2.innerHTML = `
        <label>
          <input type="checkbox">
          <div class="card">
            <div class="front">
              <p><img src="${sprites.front_default}" ></p>
              <p>${name}</p>
            </div>
            <div class="back">
              <p>Tipo: ${types[0].type.name}</p>
              <p>Habilidad: ${abilities[0].ability.name}</p>
              <p>Habilidad Oculta: ${hiddenAbility}</p>
              <p>Experiencia Base: ${base_experience}</p>
              <p>HP: ${stats[0].base_stat}</p>
              <p>Peso: ${weight}</p>
              <p>Altura: ${height}</p>
              <p>Especie: ${species.name}</p>
            </div>
          </div>
        </label>
      `;

  document.querySelector(".lista_pokemon").appendChild(card);//aca se guarda el la tarjeta en el div llamado "lista_pokemon"
  document.querySelector(".lista2_pokemon").appendChild(card2);//aca se guarda el la tarjeta en el div llamado "lista_pokemon"

}


//hacemos que todos los datos traidos de la api se muestre en una trajeta diferente para cada pokemon
async function loadWaterPokemon() {
  const waterPokemonData = await getPokemonData("water");
  waterPokemonData.forEach(createPokemonCard);
}

//Pa' que funcione el boton
document.getElementById("water").addEventListener("click", async () => {
  document.querySelector(".lista_pokemon").innerHTML = "";
  const waterPokemonData = await getPokemonData("water");
  waterPokemonData.forEach(createPokemonCard);
});
window.addEventListener("load", loadWaterPokemon);



//######################################################################################

///algun intento pero no se como ponerlo en el codigo 
async function getPokemonData(){
  const randomPokemon1 = Math.floor(Math.random()* 898)+ 1; //Genera un random (eso creo)
  const randomPokemon2 = Math.floor(Math.random()* 898)+ 1;

  const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon1}`);
  const data1 = await response1.json();

  const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon2}`);
  const data2 = await response2.json();

  return [data1, data2];
}

function sumAttackValue(pokemon1, pokemon2){
  const attack1 = pokemon1.stats[4].base_stat;
  const attack2 = pokemon2.stats[4].base_stat;

  return attack1 + attack2;
}

const resultElement = document.getElementById("result");

async function updateResult(){
  const [pokemon1, pokemon2]= await getPokemonData();
  const totalAttack = sumAttackValues(pokemon1, pokemon2);
  resultElement.textContent = `La suma de los ataques es: ${totalAttack}`;
}

updateResult();
window.addEventListener("load", updateResult);