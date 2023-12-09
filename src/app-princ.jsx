import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Gallery, Gallery1 } from './App';

const App = () => {
  const [activeComponent, setActiveComponent] = useState("gallery");
  const [category, setCategory] = useState(""); // État pour la catégorie

  // Gère la recherche et met à jour l'état de la catégorie
  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchCategory = formData.get('category');
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
            <form onSubmit={handleSearch} className="d-flex">
              <input
                type="text"
                name="category"
                placeholder="Search for a category..."
                className="me-2"
              />
              <Button variant="outline-success" type="submit">Search</Button>
            </form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Affiche le composant actif selon l'état */}
      {activeComponent === "gallery" && <Gallery category={category} />}
      {activeComponent === "gallery1" && <Gallery1 category={category} />}
    </>
  );
};

export default App;