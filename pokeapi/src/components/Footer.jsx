import React from 'react'
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer">
        <Link className="footer-button" 
        style={{ textDecoration: "none", color: "inherit" }}
        to="/"
        onClick={() => setMenu("HomePage")}>
            Cerrar
        </Link>
    </div>
  )
}

export default Footer