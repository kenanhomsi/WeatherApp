import { ChangeEvent } from "react"
import { optionType } from "../types"
type props={
    term:string,
    options:[],
    onInputChange:(e:ChangeEvent<HTMLInputElement>)=>void,
    onOptionSelect:(option:optionType)=>void,
    onSearchClick:()=>void
}
function Search({term,options,onInputChange,onOptionSelect,onSearchClick}:props) :JSX.Element{
  return (
  <main className='flex justify-center items-center  w-full '>
      
        <div className='flex   p-4 items-center justify-center text-center bg-white mb-1 mt-10 md:mt-4 relative bg-opacity-30  md:px-10 backdrop-blur-ls drop-shadow-lg rounded text-zinc-700'>
        <input type="text" value={term} onChange={onInputChange}  className='px-2
                py-1 rounded-1-md border-2 border-white' />
                
                <ul className='absolute top-9 bg-white ml-1 rounded-b-md'>
                {options.map((option:optionType,index:number)=>(
                <li key={option.name+'-'+index}>
                  <button className='text-left text-sm w-[100%] hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer'
                  onClick={()=>onOptionSelect(option)}>
                    {option.name},{option.country}
                  </button>
                </li>
                ))}
                </ul>
                <button className=' rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer'
                onClick={onSearchClick}>
                      Search
                </button >
        </div>
  </main>
  )
}

export default Search
