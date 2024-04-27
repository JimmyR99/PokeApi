import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function PokemonPage() {
  const {id} = useParams();
  const [pokemon, setPokemon] = useState([]);
  const [type, setType] = useState([]);
  const [species, setSpecies] = useState([]);
  const [description, setDescription] = useState([]);
  const [image, setImage] = useState([]);
  const [cardClass,setCardClass] = ("d-none");
  useEffect(() => {
    getPokemon();
  }, []);
  const getPokemon = async() =>{
    const liga = "https://pokeapi.co/api/v2/pokemon/"+id;
    axios.get(liga).then(async(response) => {
      const respuesta = response.data;
      setPokemon(respuesta);
      if(respuesta.sprites.other.dream_world.front_default != null){
        setImage(respuesta.sprites.other.dream_world.front_default);
      }
      else{
        setImage(respuesta.sprites.other['official-artwork'].front_default);
      }
      await getType(respuesta.types);
      await getSpecies(respuesta.species.name);
      setCardClass("")
    })
  }

  const getType = async(typ) => {
    let listType = [];
    typ.forEach( (t) =>{
      axios.get(t.type.url).then( async(response) =>{
        listType.push(response.data.names[5].name);
        setType(listType);
      })
    })
  }

  const getSpecies = async(spe) =>{
    const liga = "https://pokeapi.co/api/v2/pokemon-species/"+spe;
    axios.get(liga).then(async(response) =>{
      const respuesta = response.data;
      setSpecies(respuesta);
      await getDescription(respuesta.flavor_text_entries);
    })
  }

  const getDescription = async(desc) =>{
    let text = "";
    desc.forEach((d) =>{
      if(d.language.name == "es"){
        text = d.flavor_text;
      }
      if(text == "" && desc.length > 0){
        text = desc[0].flavor_text
      }
    })
    setDescription(text);
  }
  return (<>
  <div className="center-div">
    
    <div className="container-page">
       <div className="poke-page">
      <img src={image} />
      
      </div>
      <button className="boton-poke-page" onClick={() => localStorage.setItem(pokemon.id+" "+pokemon.name,image)}>Like</button>
      <div className="poke-inf">
      <h1>#{pokemon.id} {pokemon.name}</h1>
      <p>{description}</p>
      <p>Tipo:</p>
      { type.map((typ,i)=>(
        <h2 className="poke-type" key={i}>{typ}</h2>
      ))}
      <p>Peso(WT): <b>{(pokemon.height)/10}kg</b></p>
      <p>Altura(HT): <b>{(pokemon.weight)/10}m</b></p>
      </div>
      
    </div>
    
  </div>
  </>
);
}

export default PokemonPage;
