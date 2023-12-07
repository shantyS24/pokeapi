const listaPokemon = document.querySelector(".lista_pokemon");
let URL = "https://pokeapi.co/api/v2/pokemon/";
let max = 1000;
let i = 0;
try{
    while(i<=2){
        i++;
        fetch(URL + Math.floor(Math.random()*max))
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                const tipos = data.types.map(type => type.type.name);
                    mostrarPokemon(data);
                }
            )}
    }
catch{
    e => console.error(new Error(e))
}

//llamamos un funcion donde se crea el array de los datos a traer para la tarjeta 
function mostrarPokemon(pokemon) {
    const { sprites, name, types, abilities, base_experience, stats, weight, height, species } = pokemon;
    const hiddenAbility = abilities[1] ? abilities[1].ability.name : 'N/A';

    //se crea la tarjeta donde se visualizan los datos del pokemon
    const card = document.createElement("div");
    card.classList.add("cards_pokemon");
    card.innerHTML = `
      <label>
        <input type="checkbox">
        <div class="card">
          <div class="front">
            <p><img src="${sprites.front_default}" alt="${name}"></p>
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
listaPokemon.append(card);//aca se guarda el la tarjeta en el div llamado "lista_pokemon"
}