const API_KEY = "Your api key";
const searchBox = document.getElementById("search-box");
const city = document.getElementById("city");
const currTemp = document.getElementById("current-temprature");
const description = document.getElementById("weather-description");


searchBox.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        console.log('Enter key pressed')
        searchEvent();
      }
});

function searchEvent(){
    let cityName = searchBox.value;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
    
    if(cityName==undefined||cityName==null||cityName==="")
        return

    fetch(URL)
    .then((response) => {
        if(response.ok){
            response.json()
            .then((data)=>{
                render(data);
            })
        }
        else{
            alert("Wrong city name")
        }
    })
    .catch((error)=>console.log(error));
}

function render(data){
    city.innerHTML = data["name"];
    currTemp.innerHTML = data["main"]["temp"].toPrecision(3)+ "&#176c";
    iconCode = data["weather"][0]["icon"];
    icon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    description.innerHTML = data["weather"][0]["description"][0].toUpperCase()+data["weather"][0]["description"].substr(1);
}