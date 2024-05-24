import { useState } from 'react'
import './App.css'
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

function App() {
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState('')

  const passwordGenrator = useCallback(() => {
     let pass = '';
     let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
     if(number) str += '1234567890';
     if(character) str += '!@#$;%&*{,.:"|?><|}';

     for(let i=0; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
     }
     setPassword(pass)
  }, [number, character, length, setPassword])


  useEffect(() => {
     passwordGenrator();
  }, [number, character, length, passwordGenrator])

  const refernce = useRef();

  const copiedText = useCallback(()=>{
    refernce.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-green-500">
      <h1 className='text-white text-2xl text-center my-3 pb-3'>Password Generator</h1>    
       <div className="flex shadow rounded-lg overflow-hidden mb-4">

         <input 
           type="text" 
           readOnly
           className="outline-none w-full py-1 px-3 font-bold bg-gray-300 text-blue-900"
           placeholder="Password"
           value={password}
           ref={refernce}
         />

         <button className='outline-none bg-blue-900 text-white px-3 py-0.5 shrink-0 hover:bg-blue-700'
          onClick={copiedText}
         >
           Copy
         </button>
       </div>

      <div className='text-xl text-start pt-0 mt-0 pb-3 pl-0'>
        <button className='bg-slate-900 rounded-xl p-2'
         onClick={passwordGenrator}
        >
          Generate Password 
        </button>
      </div>

       <div  className='flex text-sm gap-x-2'>
       <div className='flex items-center gap-x-1'>
        <label htmlFor="range">Length: {length}</label>
         <input 
          type="range" 
          min={5}
          max={50}
          value={length}
          onChange={(e) => setLength(e.target.value)}
         />

         <input 
          type="checkbox" 
          value={password}
          defaultChecked={number}
          onChange={()=> {
             setNumber((prev) => !prev)
          }}
          />
          <label htmlFor="number">Number</label>

         <input 
          type="checkbox" 
          value={character}
          defaultChecked={number}
          onChange={()=> {
            setCharacter((prev) => !prev)
          }}
          />
          <label htmlFor="character">Character</label>
       </div>
    </div>
  </div>
  )
}

export default App
