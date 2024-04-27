import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import CardPokemon from "../components/CardPokemon";
import Modals from "../components/Modals";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { Link } from "react-router-dom";

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [pokemones, setPokemones] = useState([]);
  const [allPokemones, setAllPokemones] = useState([]);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setlimit] = useState(30);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    getPokemones(offset);
    getAllPokemones();
  }, []);
  const getPokemones = async (o) => {
    const liga = "https://pokeapi.co/api/v2/pokemon?limit="+limit+"&offset="+o;
    axios.get(liga).then( async(response) => {
      const respuesta = response.data;
      setPokemones(respuesta.results);
      setList(respuesta.results);
      setTotal(respuesta.count);
    });
  }
  const getAllPokemones = async () => {
      const liga = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
      axios.get(liga).then( async(response) => {
        const respuesta = response.data;
        setAllPokemones(respuesta.results);
      });
  }
  const find = async(e) =>{
      if(filter.trim() != ""){
        setList([]);
        setTimeout(() =>{
          setList(allPokemones.filter(p => p.name.includes(filter)))
        },100)
      }
    if(filter.trim() == ""){
      setList([]);
      setTimeout(()=>{
        setList(pokemones);
      }, 100);
    }
  }

  const goPage = async(p) =>{
    setList([]);
    await getPokemones((p==1) ? 0 : ((p-1)*30));
    setOffset(p);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  return (<>
  <div className="center-div">
  <div className="container">
      <Link className="go-page-fav"
      style={{ textDecoration: "none", color: "inherit" }}
      to={"favoritos"}
      >
        Favoritos
      </Link>
      <input className="search"
        type="text"
        onChange={(e) => {setFilter(e.target.value)}}
        onKeyUpCapture={find}
        value={filter}
        placeholder="Buscar pokemon..."
      />
    <div className="container-pokemon">
      {list.map((pok,i)=>(
        <CardPokemon poke={pok} key={i} />
      ))}
    </div>
    <div className="pagination">
    <PaginationControl last={true} limit={limit} total={total} page={offset}
      changePage={page => goPage(page)} 
      />
    </div>
  </div>
  <Modals isOpen={isModalOpen} onClose={closeModal} />
  </div>
  </>);
}
export default HomePage;
