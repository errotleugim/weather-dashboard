var inpuut = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var uvi = document.querySelector('.uvi');
var clouds = document.querySelector('.clouds');
var button= document.querySelector('.submit');
var wind = document.querySelector('.wind');
var hum = document.querySelector('.hum');
var fivedays = document.querySelector('#fivedays');
var fecha = document.querySelector('#fecha');
var API_KEY = '2db2aad8f9cf5856066bd821773ec276';
var latitude;
var longitude;
lastsearch();

function lastsearch () {
  let cityone = document.getElementById("city1")
  cityone.innerHTML = localStorage.getItem('City1')
}

async function getlatlon () {
  
  return new Promise( (resolve) => {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+inpuut.value+'&limit=5&appid='+API_KEY)
    .then(response => response.json())
    .then(data => {
      latitude = data[0]['lat'];
      longitude = data[0]['lon'];

      return resolve({
        latitude, 
        longitude,
        city : inpuut.value
      })

      // console.log(latitude);
      // console.log(longitude);
      // localStorage.setItem('lat', latitude);
      // localStorage.setItem('lon', longitude);
      // localStorage.setItem('City1', inpuut.value);
  
    })
  })
  

}
function today ( lat, lon) {
  console.log(lat, lon);

  fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude={part}&units=metric&appid='+API_KEY)
  .then(response => response.json())
  .then(data => {
    var uvivalue = data['current']['uvi']
    var windvalue = data['current']['wind_speed']
    var tempvalue = data['current']['temp']
    var humvalue = data['current']['humidity']
    const date = moment().format('YYYY-MM-DD');
    
    fecha.innerHTML = date;
    main.innerHTML = inpuut.value ;
    wind.innerHTML = "Wind speed: " + windvalue + " KM/H";
    temp.innerHTML = "Temperature: " + tempvalue + " C°";
    uvi.innerHTML = "UV Index: "+uvivalue;
    hum.innerHTML = "Humidity: "+humvalue + "%";
    

  uvi.classList.value = ''
  uvi.classList.value = uvcolor(uvivalue);
   
  })
}
function fivedaysweather (lat, lon) {
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ lon +'&exclude={part}&units=metric&appid='+API_KEY)
    .then(response => response.json())
  .then(data => {
  console.log(data['daily'][0]['wind_speed'])
  var killme = {
    temperature: data['daily'][0]['temp'].day,
    wind: data['daily'][0]['wind_speed'],
    humidity: data['daily'][0]['humidity']
  }; 
  console.log(killme);
  //Loop it or type it in manually
  //Maybe try to make an array or object with the first five elements
  //and only the elements i need.

  
          fivedays.innerHTML = 
         `
          <div class="col-2 day1"><h4>Tomorrow</h4>
          <p>Temperature: ` + data['daily'][0]['temp'].day + `</p>
          <p>Wind: `+ data['daily'][0]['wind_speed']+ ` KM/H</p>
          <p>Humidity: ` + data['daily'][0]['humidity'] + `% </p>
        </div>
        <div class="col-2 day2"><h4>Day After</h4>
          <p>Temperature: ` + data['daily'][1]['temp'].day + `</p>
          <p>Wind: `+ data['daily'][1]['wind_speed']+ ` KM/H</p>
          <p>Humidity</p>
        </div>
        <div class="col-2 day3"><h4>3 days from now</h4>
          <p>Temperature: ` + data['daily'][2]['temp'].day + `</p>
          <p>Wind: `+ data['daily'][2]['wind_speed']+ ` KM/H</p>
          <p>Humidity: ` + data['daily'][0]['humidity'] + `% </p>
        </div>
        <div class="col-2 day4"><h4>4 days from now</h4>
          <p>Temperature: ` + data['daily'][3]['temp'].day + `</p>
          <p>Wind: `+ data['daily'][3]['wind_speed']+ ` KM/H</p>
          <p>Humidity: ` + data['daily'][0]['humidity'] + `% </p>
        </div>
        <div class="col-2 day5"><h4>5 days from now</h4>
          <p>Temperature: ` + data['daily'][4]['temp'].day + `</p>
          <p>Wind: `+ data['daily'][4]['wind_speed']+ ` KM/H</p>
          <p>Humidity: ` + data['daily'][0]['humidity'] + `% </p>
        </div>
           `  
  })
  //Ideally this would clear the local storage and fix the need to click submit twice
  //Doesn't work. Maybe call this function some other way? Maybe use session storage?
  //Rather, find a way to pass the coordinates without using storage.
  // localStorage.removeItem('lat');
  // localStorage.removeItem('lon');
}

button.addEventListener('click', async function(){
  // uvcolorclear();
  let results = await getlatlon(); 
  today (results.latitude, results.longitude);
  
  fivedaysweather(results.latitude, results.longitude);
  uvcolor();
})

function uvcolorclear() {
  let element = document.getElementById("uvindex");
  element.classList.remove("low","high","veryhigh", "medium");
}
function uvcolor(uvivalue) {
  if ( uvivalue >= 0 && uvivalue < 2 ) {
    return "low"
  }
  else if ( uvivalue > 2 && uvivalue < 5 ) {
    return "medium"
  }
  else if ( uvivalue > 5 && uvivalue < 7 ) {
    return "high"
    }
  else if (uvivalue > 10) {
  return "veryhigh";
   };
  
  } ;


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