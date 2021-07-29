const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
}




function capitalize(str){
    return str[0].toUpperCase() + str.slice(1);
}

async function main(withIP = true){
    let ville;

    if(withIP){

    // 1. Choper l'adresse ip du pc qui ouvre la page: https://api.ipify.org?format=json

   const ip = await fetch('https://api.ipify.org?format=json')
        .then(resultat => resultat.json())
        .then(json => json.ip);           

            // choper la ville grace a l'ip

   ville = await fetch('http://ip-api.com/json/' + ip)
        .then (resultat => resultat.json())
        .then(json => json.city);
    } else {
        ville = document.querySelector('#ville').textContent;
    }                                                 
            // call meteo de la ville 

    const meteo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=575b16d0a8d1db8376e938b6b0733ed5&lang=fr&units=metric`)
        .then(resultat => resultat.json())
        .then(json => json)
console.log(meteo);        
    // afficher les infos sur la page

    displayWeatherInfos(meteo)
}             

function displayWeatherInfos(data){
    const name = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;

    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#conditions').textContent = capitalize(description);
    document.querySelector('i.wi').className = weatherIcons[conditions];

    document.body.className = conditions.toLowerCase();
}

const ville = document.querySelector('#ville');

ville.addEventListener('click', () => {
    ville.contentEditable = true;
});

ville.addEventListener('keydown', (e) => {
    if(e.keyCode === 13){
        e.preventDefault();
        ville.contentEditable = false;
        main(false);
    }
})
      
main();

