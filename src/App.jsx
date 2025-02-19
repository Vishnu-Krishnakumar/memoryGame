import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [clicked, setClick] = useState([]);
  const [score,setScore] = useState(0);
  const [imageURL, setImage] = useState([]);
  let status = false;
  let randomPokeUrl = [];
  let pokeList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  const hit = (e) =>{
   status = false;
   setClick([...clicked,e.target.id])
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
  }
  
  function makePokeList(){
    if (pokeList.length === 8) return;
    while(pokeList.length !== 8){
      pokeList.push(getRandomInt(150));
      pokeList = pokeList.filter((value,index) => pokeList.indexOf(value)===index)
    }
  }

  function urlRandomizer(){
    setImage([]);
    for(let i = 0 ; i < 8 ; i++){
      fetch(apiUrl + pokeList[i])
      .then(response =>{
        if(!response.ok){
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data =>{
        const url = data.sprites.front_default;
        setImage(imageURL =>[...imageURL,url])
      })
      .catch(error =>{console.error(error)});
    }
  }

  function randomPokemon(){
    while(randomPokeUrl.length !==8){
      randomPokeUrl.push(getRandomInt(8)-1);
      randomPokeUrl = randomPokeUrl.filter((value,index) => randomPokeUrl.indexOf(value) === index);
    }
  }

  useEffect(()=>{
    let check = clicked[clicked.length-1];
    if(clicked.length === 1) {
      setScore(1);
    }
    else{
    for(let i = 0 ; i < clicked.length-1; i++){
      console.log(clicked[i]);
      if(clicked[i] === check){
        status = true;
        setScore(0);
        setClick([]);
      }
    }}
    if(status === false && clicked.length > 1){
      setScore(score + 1);
    }
  },[clicked])

  useEffect(()=>{
   if (score === 8){
    makePokeList();
    urlRandomizer();
    setScore(0);
   }
  },[score ,status])

  useEffect(()=>{
    makePokeList();
    urlRandomizer();
  },[])

  randomPokemon();
  return (
    <div>
    <div className = "images">
        <div className = "image"><img id = {randomPokeUrl[0]} onClick={hit} src={imageURL[randomPokeUrl[0]]}/></div>
        <div className = "image"><img id = {randomPokeUrl[1]} onClick={hit} src={imageURL[randomPokeUrl[1]]}/></div>
        <div className = "image"><img id = {randomPokeUrl[2]} onClick={hit} src={imageURL[randomPokeUrl[2]]}/></div>
        <div className = "image"><img id = {randomPokeUrl[3]} onClick={hit} src={imageURL[randomPokeUrl[3]]}/></div>
        <div className = "image"><img id = {randomPokeUrl[4]} onClick={hit} src={imageURL[randomPokeUrl[4]]}/></div>
        <div className = "image"><img id = {randomPokeUrl[5]} onClick={hit} src={imageURL[randomPokeUrl[5]]}/></div>
        <div className = "image"><img id = {randomPokeUrl[6]} onClick={hit} src={imageURL[randomPokeUrl[6]]}/></div>
        <div className = "image"><img id = {randomPokeUrl[7]} onClick={hit} src={imageURL[randomPokeUrl[7]]}/></div>
    </div>
    <div>
      Score: {score}
    </div>
    </div>
  )
}

export default App
