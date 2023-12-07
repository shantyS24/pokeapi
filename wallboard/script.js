let URL = "https://pokeapi.co/api/v2/pokemon/";
const apiButton = document.querySelectorAll('.apiButton');
const name = document.getElementById('name');
const img = document.getElementById('img');
const type = document.getElementById('type');
const ability = document.getElementById('ability');
const hiddenAbility = document.getElementById('hiddenAbility');
const base_experience = document.getElementById('base_experience');
const hp = document.getElementById('hp');
const color = document.getElementById('color');
const weigth = document.getElementById('weigth');
const height = document.getElementById('height');
const species = document.getElementById('species');


for (let i = 1; i <= 10; i++) {
    fetch(URL + i)
        .then(resp => resp.json())
        .then(data => {
            img.innerHTML = `<img src= "${data.sprites.other.home.front_default}">`;
            name.innerText = `Nombre: ${JSON.stringify(data.name)}`;
            type.innerText = `Tipo: ${JSON.stringify(data.types[0].type.name)}`;
            ability.innerText = `Habilidad: ${JSON.stringify(data.abilities[0].ability.name)}`;
            hiddenAbility.innerText = `Habilidad Oculta: ${JSON.stringify(data.abilities[1].ability.name)}`;
            base_experience.innerText = `Experiencia Base: ${JSON.stringify(data.base_experience)}`;
            hp.innerText = `HP: ${JSON.stringify(data.stats[0].base_stat)}`;
            //weigth.innerText = `Peso: ${JSON.stringify(data.weight)}`;
            //height.innerText = `Altura: ${JSON.stringify(data.height)}`;
            color.innerText = `Color: ${JSON.stringify(data.color.name)}`;
            species.innerText = `Especie: ${JSON.stringify(data.egg_groups[1].name)}`;
        })
        .catch(e => console.error(new Error(e)));
}

apiButton.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 10; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                const tipos = data.types.map(type => type.type.name);
                if (tipos.some(tipo => tipo.includes(botonId))) {
                    mostrarPokemon(data);
                }
            })
    }
}))