import Sunrise from "../Icons/Sunrise"
import Sunset from "../Icons/Sunset"
import { getHumidityValue, getPop, getSunTime, getVisibilityValue, getWindDirection } from "../function/func"
import { forecastType } from "../types"
import Tile from "./Tile"
type Props={
    forecast:forecastType ,
}

const Degree=({temp}:{temp:number}):JSX.Element=>{
    return(
        <span>
            {Math.round(temp)} <sup>o</sup>
        </span>
    )
}
const Forecast = ({forecast}:Props):JSX.Element => {
    const tody=forecast.list[0];
  return (
    <div className="w-full py-5   
md:py-4 md:px-10 lg:px-24 h-full  bg-white
bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
        <div className="mx-auto  my-5">
            <section className="flex justify-between text-center">
                <h2 className="text-2xl font-black font-20">
                    {forecast.name} ,<span className="font-thin">{forecast.country}</span>
                </h2>
                <h1 className="text-4xl font-extrabold">{<Degree temp={tody.main.temp} />}</h1>
                <div className="flex flex-col">
                <p className="text-sm">{tody.weather[0].main}  {tody.weather[0].description}</p>
                <p className="text-sm">H:{<Degree temp={Math.ceil(tody.main.temp_max)}/>}
                    L:{<Degree temp={Math.floor(tody.main.temp_min)} />}
                </p>  
                </div>  
            </section>
            <section className="flex  overflow-x-scroll   mt-4 mb-5 pb-5">
                {forecast.list.map((item , index)=>(
                    <div  key={index} className=" inline-block text-center w-[50px] flex-shrink-0" >
                        <p className="text-sm">{index === 0?'new': new Date(item.dt* 1000).getHours() }</p>
                        <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={`weather-icon-${item.weather[0].description}`} />
                        <p className="text-sm font-bold">{<Degree temp={item.main.temp} />}</p>
                    </div>
                ))}
            </section>
            <section className="flex flex-wrap justify-between text-zinc-700">
                <div className=" w-[140px] text-sm
                font-bold flex flex-col items-center bg-white/20
                backdrop-blur-lg rounded drop-shadow-lg
                py-4 mb-5
                ">
                    <Sunrise /> <span className="mt-2">{getSunTime(forecast.sunrise)}</span>
                </div>
                <div className=" w-[140px] text-sm
                font-bold flex flex-col items-center bg-white/20
                backdrop-blur-lg rounded drop-shadow-lg
                py-4 mb-5
                ">
                    <Sunset/><span className="mt-2">{getSunTime(forecast.sunset)}</span>
                </div>
                { <Tile icon="wind" 
                title="wind"
                 info={`${Math.round(tody.wind.speed)} km/h`} 
                 description={`${getWindDirection(tody.wind.deg)}, gusts ${tody.wind.gust.toFixed(1)} km/h`}/>
                }
                {<Tile icon="feels" 
                title="feels like"
                 info={<Degree temp={tody.main.feels_like} />} 
                description={`Feels ${Math.round(tody.main.feels_like) < Math.round(tody.main.temp)
                   ? 'colder':'warmer'}`} />}
            
                {<Tile icon="humidity" 
                title="Humidity"
                 info={`${tody.main.humidity}`} 
                description={ `${getHumidityValue(tody.main.humidity)}`}/>}
                {<Tile icon="pop" 
                title="Precipitation"
                 info={`${Math.round(tody.pop *1000)}%`} 
                description={ `${getPop(tody.pop)}, clouds at ${tody.clouds.all} %`}/>}

                {<Tile icon="pressure" 
                title="pressure"
                 info={`${tody.main.pressure}hPa`} 
                description={ `${Math.round(tody.main.pressure) < 1013 ? 'Lower':'Higher'} Than Standerd`}
                />}
                 {<Tile icon="visibility" 
                title="visibility"
                 info={`${(tody.visibility /1000).toFixed()}km`} 
                description={ getVisibilityValue(tody.visibility)}
                />}
                
                
            </section>
        </div>
    </div>
  )
}

export default Forecast