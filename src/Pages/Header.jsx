import React from 'react'
import { useRecoilState } from 'recoil'
import latitudeAtom from '../Recoils/latitudeAtom'
import longitudeAtom from '../Recoils/longitudeAtom'
import weatherDataAtom from '../Recoils/weatherDataAtom'

const Header = () => {

  const [latitude,setLatitude]=useRecoilState(latitudeAtom)
  const [longitude,setLogitude]=useRecoilState(longitudeAtom)
  const [data,setData]=useRecoilState(weatherDataAtom)
  
   const autocompleteCity=(e)=> {
    e.preventDefault()
    const input = document.getElementById('locationInput');
    const suggestionsList = document.getElementById('suggestions');

    // Get predictions as the user types
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${input.value}&key=6cf6d898ec7f4901ba2bed3880d15928`
    )
      .then((response) => response.json())
      .then((data) => {
        const predictions = data.results;

        // Clear previous suggestions
        suggestionsList.innerHTML = '';

        // Display new suggestions
        predictions.forEach((prediction) => {
          const suggestionItem = document.createElement('li');
          suggestionItem.textContent = prediction.formatted;
          const latitude = prediction.geometry.lat;
          const longitude = prediction.geometry.lng;
          suggestionItem.onclick = () => {
            input.value = prediction.formatted;
            suggestionsList.innerHTML = ''; // Clear suggestions after selection
            console.log(latitude,longitude)
            setLatitude(latitude)
            setLogitude(longitude)
            fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&appid=d6d1b492f6967f116eaf03d325283c4c')
          .then(res=>res.json())
          .then(json=>{console.log(json)
          setData(json)
          }
          )
          };
          suggestionsList.appendChild(suggestionItem);
          
        });
      })
      .catch((error) => {
        console.error('Error fetching data from OpenCage:', error);
      });
 
  }
  return (
    <div>
    <nav class="container">
  
       <div className="item13">Weather</div>
       <div className="item13">
       <input class="form-control me-2" type="search"  id="locationInput"
      placeholder="Enter city name" aria-label="Search" onInput={autocompleteCity}/>
       </div>
      
   
  
</nav>
   <div className="sugg">
   <ul id="suggestions"></ul>
   </div>
    </div>
  )
}

export default Header