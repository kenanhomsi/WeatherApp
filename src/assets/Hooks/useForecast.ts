import { useState,useEffect, ChangeEvent } from "react";
import { optionType,forecastType } from "../types";
const useForecast=()=>{
const [term,setTerm]=useState<string>('');
 const[city,setCity]=useState<optionType|null>(null);
 const [options,setOptions]=useState<[]>([]);
 const [forecast,setForcast]=useState<forecastType|null>();
 useEffect(()=>{
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=51.5073219&lon=-0.1276474&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
  .then((res)=>res.json())
  .then((data)=>
  {
    
    const forecastData={
      ...data.city,
      list: data.list.slice(0,20)
    }
    setForcast(forecastData)  
    
  }
  );
},[])
 const getSearchOption=(value:string)=>{
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${import.meta.env.VITE_API_KEY}`)
  .then((res)=>res.json())
  .then((data)=>setOptions(data))
 }
 const onInputChange=(e:ChangeEvent<HTMLInputElement>)=>{
  const value=e.target.value.trim()
  setTerm(value);
  if(value==='') return
  getSearchOption(value);
}
const onOptionSelect=(option: optionType)=>{
setCity(option);


}
const getForcast=(city:optionType)=>{
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
  .then((res)=>res.json())
  .then((data)=>
  {
    const forecastData={
      ...data.city,
      list: data.list.slice(0,16)
    }
    setForcast(forecastData)  
  }
  );
}
const onSearchClick=()=>{
if(!city) return
getForcast(city);
}
useEffect(()=>{
  if(city){
    setTerm(city.name);
    setOptions([])
  }
},[city])

return{
    term,options,forecast,onInputChange,onOptionSelect,onSearchClick
}
}
export default useForecast