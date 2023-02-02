import React from "react";
import { Link } from "react-router-dom"

const Header = ({whichPage="home"}) => { // propa defaul verebiliriz
    // her sayfaya farkli komut verebiliriz artik (mesela farkli renk):
    var headerBg = "bg-dark" // bootstrap ozellikleri kullaniyorum
    
    if(whichPage === "add-student"){
        headerBg = "bg-success"
    }
    if(whichPage === "edit-student"){
        headerBg = "bg-danger"
    }

    return (
        <nav className={`navbar navbar-expand-md navbar-dark ${headerBg}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">Students' Registration form</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to={"/"}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="#">About us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="#">Contact</Link>
                        </li>                 
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header