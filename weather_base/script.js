// https://openweathermap.org/
var apiKey = "b1c22f93361f5e5b596b5c6327a180dd";

document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault(); // previne o comportamento padrao do formulario, nao permitindo reload
    let input = document.querySelector('#searchInput').value;
    //console.log(input);
    if(input !== ""){
        showWarning("Buscando dados...");

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=${apiKey}&units=metric&lang=pt_br`;
        
        let results = await fetch(url);
        let json = await results.json();
        // console.log(json);
        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,

            })
        }else{
            clearInfo("Localidade não encontrada.");
        }
    }else{
        clearInfo("Digite o nome da localidade.")
    }
});

function showInfo(json){
    showWarning('');
    
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>°C</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

function clearInfo(msg){
    document.querySelector('.resultado').style.display = 'none';
    showWarning(msg);
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}
