var inpuut = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var uvi = document.querySelector('.uvi');
var clouds = document.querySelector('.clouds');
var button= document.querySelector('.submit');
var wind = document.querySelector('.wind');
var hum = document.querySelector('.hum');
var fivedays = document.querySelector('.fivedays');
var API_KEY = '2db2aad8f9cf5856066bd821773ec276'
data = '';

function getlatlon () {
  fetch('http://api.openweathermap.org/geo/1.0/direct?q='+inpuut.value+'&limit=5&appid='+API_KEY)
  .then(response => response.json())
  .then(data => {
    var latitude = data[0]['lat'];
    var longitude = data[0]['lon'];
    console.log(latitude);
    console.log(longitude);
    localStorage.setItem('lat', latitude);
    localStorage.setItem('lon', longitude);
    localStorage.setItem('City1', inpuut.value);

  })
}
function today () {
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+localStorage.getItem('lat')+'&lon='+localStorage.getItem('lon')+'&exclude={part}&appid='+API_KEY)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    var uvivalue = data['current']['uvi']
    var windvalue = data['current']['wind_speed']
    var tempvalue = data['current']['temp']
    var humvalue = data['current']['humidity']
    wind.innerHTML = "Wind speed: " + windvalue;
    temp.innerHTML = "Temperature: " + tempvalue;
    uvi.innerHTML = "UV Index: "+uvivalue;
    hum.innerHTML = "Humidity: "+humvalue;
    inpuut.value ="";
  })
}
function fivedaysweather () {
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+localStorage.getItem('lat')+'&lon='+localStorage.getItem('lon')+'&exclude={part}&appid='+API_KEY)
  .then(response => response.json())
  .then(data => {
    console.log(data);
     
})}
button.addEventListener('click', function(){
  getlatlon(); 
  today ();
  fivedaysweather();
})


  // .then(data => {
  //   var uvivalue = data['current']['uvi']
  //   var windvalue = data['current']['wind_speed']
  //   var tempvalue = data['current']['temp']
  //   
  //   // var daily0 = {data['daily'][0]['temp']['day']}, {data['daily'][0]['wind_speed']}, {data['daily'][0]['humidity']};
  //   var daily1 = data['daily'][1]
  //   var daily2 = data['daily'][2]
  //   var daily3 = data['daily'][3]
  //   var daily4 = data['daily'][4]
  //   wind.innerHTML = "Wind speed: " + windvalue;
  //   temp.innerHTML = "Temperature: " + tempvalue;
  //   uvi.innerHTML = "UV Index: "+uvivalue;
  //   hum.innerHTML = "Humidity: "+humvalue;
  //   inpuut.value ="";
//     console.log(data)
//   })

//   .catch(err => alert("Something might be broken")))
//   })
// function showWeatherData (data){
//   let {temp, humidity , wind_speed} = data['daily'][0-4];

//   fivedays.innerHTML = 
//   `<div class="weather-item">
//       <div>Humidity</div>
//       <div>${temp}%</div>
//   </div>
//   <div class="weather-item">
//       <div>Pressure</div>
//       <div>${humidity}</div>
//   </div>
//   <div class="weather-item">
//       <div>Wind Speed</div>
//       <div>${wind_speed}</div>
//   </div>`

// }