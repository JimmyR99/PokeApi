import axios from "axios";
import React from 'react';
function FavoritePage() {
  const keys = Object.keys(localStorage);
  const listFavorite = [];
  keys.forEach(namePoke => {
  const urlPoke = localStorage.getItem(namePoke);
  listFavorite.push({ namePoke,urlPoke });
  });
  console.log(listFavorite)
  return (
    <div className="center-div">
        <div className="container">
        <div className="container-pokemon">
        {listFavorite.map((pok,i)=>(
        <div className={"card"} key={i}>
          <img src={pok.urlPoke} alt="Avatar" />
          <div className="container-card">
            <p># {pok.namePoke.split("-", 1).join(" ")}</p>
          </div>
        </div>
        ))}
        </div>
    </div>
    </div>
  )
}

export default FavoritePage