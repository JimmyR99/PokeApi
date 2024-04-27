import React from "react";
import { Link } from "react-router-dom";
import Modals from './Modals'
import { useState } from "react";
function Navigation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function closeModal() {
    setIsModalOpen(false);
  }
  return (
    <div className="navbar">
      <Link
        className="buttonball"
        style={{ textDecoration: "none", color: "inherit" }}
        to="/"
        onClick={() => setMenu("HomePage") + closeModal}
      >
        Pokedex
      </Link>
      <Modals onClose={closeModal} />
    </div>
  );
}

export default Navigation;
