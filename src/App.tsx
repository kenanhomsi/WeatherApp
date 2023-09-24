import useForecast from './assets/Hooks/useForecast';
import Forecast from './assets/components/Forecast';
import Search from './assets/components/Search';
function App() :JSX.Element{
 const{term,options,forecast,onInputChange,onOptionSelect,onSearchClick}=useForecast();
 
  return (
  <main className={`flex justify-center items-center bg-cover bg-center  bg-[url("./assets/photos/pexels-aleksejs-bergmanis-681391.jpg")] lg:h-[100vh] sm:h-full  w-full  py-5`}>
    <div className='container w-[80%] h-[90%] flex flex-col'>
          <Search term={term} options={options} onInputChange={onInputChange} onOptionSelect={onOptionSelect} onSearchClick={onSearchClick} />
          {!forecast?<h2 className='font-black mt-40 font-45 text-center'>...loading </h2>:forecast&& <Forecast forecast={forecast} />}
    </div>
  </main>
  )
}

export default App
