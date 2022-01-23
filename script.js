var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button= document.querySelector('.submit');

button.addEventListener('click', function(){
  fetch('http://api.openweathermap.org/geo/1.0/direct?q='+input.value+'&limit=5&appid=2db2aad8f9cf5856066bd821773ec276')
  .then(response => response.json())
  .then(data => {
    var latitude = data[0]['lat'];
    var longitude = data[0]['lon'];
    console.log(latitude);
    console.log(longitude);
    localStorage.setItem('lat', latitude);
    localStorage.setItem('lon', longitude);
  })
  .then (fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+localStorage.getItem('lat')+'&lon='+localStorage.getItem('lon')+'&exclude={part}&appid=2db2aad8f9cf5856066bd821773ec276')
  .then(response => response.json())
  .then(data => {
    // var tempValue = data['main']['temp'];
    // var nameValue = data['name'] +" " + Date();
    // var descValue = data['weather'][0]['description'];
  
    // main.innerHTML = nameValue;
    // desc.innerHTML = "Desc - "+descValue;
    // temp.innerHTML = "Temp - "+tempValue;
    // input.value ="";
  console.log(data);
  })
  
  .catch(err => alert("Wrong city name!")))
  })




console.log("fuck");
console.log(Date());