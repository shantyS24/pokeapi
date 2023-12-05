function getPokemonData(){
    const randomPokemonId = Math.floor(Math.random()* 120)+ 1; // selecciona un pokemoin random 
    const apiURL= `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`;//llamamos la API Y CREAMOS LA VARIABLE PARA EL ID DEL POKEMON 
    
    return fetch(apiURL)//retorna el llamado de la url para que funcione el random (osea primero 
                        //llama a uno y lo guarda, despues el otro y asi sucesivamente)
    .then(response => response.json())// toma la respuesta obtenida de la url y la guarda en un json
    .catch(e => console.error(new Error(e)));//posible error
}
document.addEventListener('DOMContentLoaded', () =>{//'DOMContentLoaded' hace que se cargue todo a lo ultimno de la pagina es como un evento load 
    const pokemonCards = document.querySelectorAll('.pokemon-card');//se crea la constante para traer los resultados de la url de un pokemon 

    Promise.all([getPokemonData(), getPokemonData(), getPokemonData()])// la promesa para traer el dato especifico del pokemon que se quiere sumar de la url 
        .then((results) => {
            results.forEach((result, index) => {
                const card = pokemonCards[index];
                const nameElement = card.querySelector(`#pokemon-${index + 1}-name`);
                const attackElement = card.querySelector(`#pokemon-${index + 1}-attack`);

                nameElement.textContent = result.name;
                attackElement.textContent = result.stats[1].base_stat;
            });

            const totalAttack = results.reduce((total, result) => total + result.stats[1].base_stat, 0);
            const totalAttackValue = document.getElementById('total-attack-value');
            totalAttackValue.textContent = totalAttack;
        })
        .catch(e => console.error(new Error(e)));
});