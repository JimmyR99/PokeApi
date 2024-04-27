import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function CardPokemon(params) {
  const [pokemon,setPokemon] = useState([]);
  const [imagen,setImagen] = useState('');
  const [cardClass,setCardClass] = useState("d-none");
  useEffect(()=>{
    getPokemon()
  },[])
  const getPokemon = async() =>{
    const liga = params.poke.url;
    axios.get(liga).then( async(response)=>{
      const respuesta = response.data;
      setPokemon(respuesta);
      if(respuesta.sprites.other.dream_world.front_default != null){
        setImagen(respuesta.sprites.other.dream_world.front_default);
      }
      else{
        setImagen(respuesta.sprites.other['official-artwork'].front_default);
      }
      setCardClass("")
    })
  }

  return (
    <>
    <div>
      {cardClass &&<div className={"card-load"}>
        <img className="load" src="./src/img/Loading.gif" alt="Avatar" />
       </div>}
      {!cardClass && <div className={"card"}>
        <img src={imagen} alt="Avatar" />
        <div className="container-card">
          <p># {pokemon.id} {pokemon.name.split("-", 1).join(" ")}</p>
            <Link to={"/pokemon/"+pokemon.name} className="button-page">
             Detalles
            </Link>
        </div>
      </div>}
    </div>
</>);
}

export default CardPokemon;
