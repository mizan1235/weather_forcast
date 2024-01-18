import React from 'react'
import { useEffect,useState } from 'react'
import { useRecoilState } from 'recoil'
import latitudeAtom from '../Recoils/latitudeAtom'
import longitudeAtom from '../Recoils/longitudeAtom'
import weatherDataAtom from '../Recoils/weatherDataAtom'
const HomeCard = () => {
    const [latitude,setLatitude]=useRecoilState(latitudeAtom)
    const [longitude,setLogitude]=useRecoilState(longitudeAtom)
    const [data,setData]=useRecoilState(weatherDataAtom)
    const Months=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
    // const [city,setCity]=useState("Durgapur")

    

      useEffect(()=>{
    
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              // const { latitude1, longitude1 } = position.coords;
            //   setLocation({ latitude, longitude });
             setLatitude(position.coords.latitude)
            setLogitude(position.coords.longitude)
            console.log(position.coords.latitude)
            },
            (error) => {
              console.error('Error getting location:', error.message);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
       
       
       // fetch('https://api.weatherbit.io/v2.0/forecast/daily?lat='+latitude+'&lon='+ longitude+'&key=0bde9fba99d342278ead7d5cd99b54fd&include=minutely', {
//            fetch('https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=56.987&lon=25.321&appid=d6d1b492f6967f116eaf03d325283c4c', {
//                   //  fetch('https://api.weatherbit.io/v2.0/forecast/daily?city='+'Raleigh'+',NC&key=0bde9fba99d342278ead7d5cd99b54fd', {

//             method: "GET",
//                     headers: {
//                       'Content-Type': "application/json",
//                     }
                 
//           })
//           .then((response) => response.json())
//           .then((data) => {
//             // setProductDetails(data?.items)
//             console.log(data);
//  console.log(data);
        
         
//           })


//           .catch((error) => {
//             console.log(error);
//           });
    var i;
for( i=0;i<100000000;i++);

console.log("first",latitude)
console.log("first",longitude)
fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&appid=d6d1b492f6967f116eaf03d325283c4c')
.then(res=>res.json())
.then(json=>{console.log(json)
setData(json)
}
)
       
 
 },[])
  return (
    <div className='home'>
    <div className="container">
      <div className="item">
        <div className="element1">
           <div className='city-name'>Current Weather</div>
           <div className='city-name' style={{color:'aqua'}}> City : {data.city.name},{data.city.country}</div>
           <div className='temp'>{Math.round(data.list[0].main.temp-273)} &deg;c</div>
        </div>
        <div className="element">
           
           <div className="item-element" style={{textAlign:'center'}}>Wind
           <div className='ele' >
           {Math.round(data.list[0].wind.speed) }&nbsp; km/h
           
           </div>
           
           </div>
           <div className="item-element" style={{textAlign:'center'}}>Humidity
           <div className='ele' >
           {Math.round(data.list[0].main.humidity) }&nbsp;
           </div>
           </div>
           
           <div className="item-element" style={{textAlign:'center'}}>Feels like
           <div className='temp'>{Math.round(data.list[0].main.feels_like -273)} &deg;c</div>
           </div>
           <div className="item-element" style={{textAlign:'center'}}>Visibility
           <div className='ele' >
           {Math.round(data.list[0].visibility)/1000 }&nbsp; km
           </div>
           
           </div>
           
           <div className="item-element" style={{textAlign:'center'}}>Pressure
           <div className='temp'>{Math.round(data.list[0].main.pressure)} </div>
           </div>
           <div className="item-element" style={{textAlign:'center'}}>Sun Rise
           <div className='temp'>{(new Date(data.city.sunrise*1000)).getHours()}:{(new Date(data.city.sunrise*1000)).getMinutes()} AM </div>
           </div>
           <div className="item-element" style={{textAlign:'center'}}>Sunset
           <div className='temp'>{(new Date(data.city.sunset*1000)).getHours() -12}:{(new Date(data.city.sunset*1000)).getMinutes()} PM </div>
           </div>
           
        </div>
        
      </div>
      
    </div>
    <div className="container2">
      {
        data.list?.map((val,index)=>{
          return(
            <div>
              <div className="cont2-item">
              
                <div className="temp">{(new Date(val.dt*1000)).getDate()}{ " "+Months[(new Date(val.dt*1000)).getMonth()]}</div>
                <div className="temp">{(new Date(val.dt*1000)).getHours()>12?((new Date(val.dt*1000)).getHours()-12) +"PM":(new Date(val.dt*1000)).getHours()+"AM"}</div>
                <div className="temp">{Math.round(val.main.temp)-273}&deg;c</div>
          </div>
            </div>
          )
        })
        
      }
          

        </div>
    </div>
  )
}

export default HomeCard