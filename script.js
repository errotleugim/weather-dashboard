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

//Function gets latitude and longitude from input.
async function getlatlon () {
  
  return new Promise( (resolve) => {
    fetch('https://api.openweathermap.org/geo/1.0/direct?q='+inpuut.value+'&limit=5&appid='+API_KEY)
    .then(response => response.json())
    .then(data => {
      latitude = data[0]['lat'];
      longitude = data[0]['lon'];

      return resolve({
        latitude, 
        longitude,
        city : inpuut.value
      })

  
  
    })
  })
  
//Takes the lat&lon and uses the One Call API to retrieve the weather info for the day
}
function today ( lat, lon) {

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
//Takes the lat&lon to generate the extended forecast.
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


  //Renders extended forecast on the DOM
          fivedays.innerHTML = 
         `
          <div class="col-2 day1"><h4>Tomorrow</h4>
          <p>Temperature: ` + data['daily'][0]['temp'].day + `C°</p>
          <p>Wind: `+ data['daily'][0]['wind_speed']+ ` KM/H</p>
          <p>Humidity: ` + data['daily'][0]['humidity'] + `% </p>
        </div>
        <div class="col-2 day2"><h4>Day After</h4>
          <p>Temperature: ` + data['daily'][1]['temp'].day + `C°</p>
          <p>Wind: `+ data['daily'][1]['wind_speed']+ ` KM/H</p>
          <p>Humidity</p>
        </div>
        <div class="col-2 day3"><h4>3 days from now</h4>
          <p>Temperature: ` + data['daily'][2]['temp'].day + `C°</p>
          <p>Wind: `+ data['daily'][2]['wind_speed']+ ` KM/H</p>
          <p>Humidity: ` + data['daily'][0]['humidity'] + `% </p>
        </div>
        <div class="col-2 day4"><h4>4 days from now</h4>
          <p>Temperature: ` + data['daily'][3]['temp'].day + `C°</p>
          <p>Wind: `+ data['daily'][3]['wind_speed']+ ` KM/H</p>
          <p>Humidity: ` + data['daily'][0]['humidity'] + `% </p>
        </div>
        <div class="col-2 day5"><h4>5 days from now</h4>
          <p>Temperature: ` + data['daily'][4]['temp'].day + `C°</p>
          <p>Wind: `+ data['daily'][4]['wind_speed']+ ` KM/H</p>
          <p>Humidity: ` + data['daily'][0]['humidity'] + `% </p>
        </div>
           `  
  })

}
//submit button
button.addEventListener('click', async function(){

  let results = await getlatlon(); 
  today (results.latitude, results.longitude);
  
  fivedaysweather(results.latitude, results.longitude);
  uvcolor();
})

//Clears UV Index background before rendering the new one
function uvcolorclear() {
  let element = document.getElementById("uvindex");
  element.classList.remove("low","high","veryhigh", "medium");
}

//This function gives the UV Index div a background color to depict its danger level
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

