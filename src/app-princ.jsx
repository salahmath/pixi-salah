import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Gallery, Gallery1 } from "./App";

const App = () => {
  const [activeComponent, setActiveComponent] = useState("gallery");
  const [category, setCategory] = useState("nature"); // État pour la catégorie

  // Gère la recherche et met à jour l'état de la catégorie
  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchCategory = formData.get("category");
    setCategory(searchCategory);
  };

  // Fonctions pour changer le composant actif
  const displayGallery = () => setActiveComponent("gallery");
  const displayGallery1 = () => setActiveComponent("gallery1");

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={displayGallery}>Image</Nav.Link>
              <Nav.Link onClick={displayGallery1}>Vidéo</Nav.Link>
            </Nav>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="16"
              fill="currentColor"
              class="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
              />
            </svg>
            
            <form onSubmit={handleSearch} className="d-flex">
              <input
                type="text"
                name="category"
                placeholder="Search for a category..."
                className="me-2"
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {activeComponent === "gallery" && <Gallery category={category} />}
      {activeComponent === "gallery1" && <Gallery1 category={category} />}
    </>
  );
};

export default App;
