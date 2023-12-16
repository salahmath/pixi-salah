
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const BASE_URL = 'https://api.pexels.com/v1/search';

export const Gallery = ({ category }) => {
  const [images, setImages] = useState([]);
  const [num, setNum] = useState(10);
  const [nHeart, setnHeart] = useState(0);

  const addMoreImages = () => {
    setNum(oldNum => oldNum + 10);
  };

   const toggleHeart = (imageId) => {
    setImages(currentImages => {
      // Créez une variable pour suivre le nombre de cœurs aimés.
      let likedHearts = 0;
  
      // Mappez sur les images pour basculer l'état du cœur si l'ID correspond.
      // Comptez également le nombre total de cœurs aimés en même temps.
      const updatedImages = currentImages.map(image => {
        if (image.id === imageId) {
          // Basculez l'état du cœur.
          const updatedHeart = !image.heart;
          // Mettez à jour le compteur de cœurs aimés selon le nouvel état.
          likedHearts += updatedHeart ? 1 : 0;
          return { ...image, heart: updatedHeart };
        }
        // Comptez les cœurs déjà aimés.
        likedHearts += image.heart ? 1 : 0;
        return image;
      });
  
      // Mettez à jour le nombre de cœurs aimés après avoir traité toutes les images.
      setnHeart(likedHearts);
  
      return updatedImages;
    });
  };
  
 
  useEffect(() => {
    if (category) {
      const fetchImages = async () => {
        try {
          const response = await fetch(`${BASE_URL}?query=${category}&per_page=${num}`, {
            headers: {
              Authorization: API_KEY,
            },
          });
          const data = await response.json();
          const imagesWithHearts = data.photos.map(photo => ({ ...photo, heart: false }));
          setImages(imagesWithHearts);
        } catch (error) {
          console.error('Error while fetching images:', error);
        }
      };

      fetchImages();
    }
  }, [category, num]);

  return (
    <><div>Hearts Count: {nHeart}</div>
      <div className="d-flex justify-content-around flex-wrap">
        {images.map((image) => (
          <Card key={image.id} style={{ width: '18rem', margin: '10px' }}>
            <a href={image.src.original} target="_blank" rel="noopener noreferrer">
              <Card.Img variant="top" src={image.src.medium} alt={`Photo by ${image.photographer}`} />
            </a>
            <Card.Body>
              <Card.Title>{image.photographer}</Card.Title>
              <div onClick={() => toggleHeart(image.id)} style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
                {/* Assuming here you will insert an icon or an image for heart */}
                {image.heart ? (
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-balloon-heart-fill" viewBox="0 0 16 16">
                 <path fillRule="evenodd" d="M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2.376 2.376 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.140-.386Z"/>
               </svg> 
                 
                ) : (
                  <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-balloon-heart" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063.045.041.089.084.132.129.043-.045.087-.088.132-.129 3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3.177 3.177 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398Z"/>
                    </svg>
                    </div>
                )}
              </div>
              <Card.Text>
                {image.alt}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Button onClick={addMoreImages}>Add 10</Button>
        
      </div>
    </>
  );
};

export const Gallery1 = ({ category }) => {
  const [videos, setVideos] = useState([]);
  const [ved, setved] = useState(10);
  const addv=()=>{
    
    setved(ved+10);
    
      };
  useEffect(() => {
    if (category) {
      const fetchVideos = async () => {
        try {
          const response = await fetch(`${BASE_URL1}?query=${category}&per_page=${ved}`, {
            headers: {
              Authorization: API_KEY,
            },
          });
          const data = await response.json();
          setVideos(data.videos);
        } catch (error) {
          console.error('Error while fetching videos:', error);
        }
      };

      fetchVideos();
    }
  }, [category,ved]);

  return (
    <>
    <div className="d-flex justify-content-around flex-wrap">
      {videos.map((video) => (
        <Card key={video.id} style={{ width: '18rem', margin: '10px' }}>
          <video controls width="250" style={{ maxWidth: '100%' }} key={video.id}>
            <source src={video.video_files[0].link} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.Sorry, your browser doesn't support embedded videos.
            
          </video>
          <Card.Body>
            <Card.Title>{video.user.name}</Card.Title>
            <Card.Text>ID: {video.id}</Card.Text>
          </Card.Body>
        </Card>

      ))}
      
    </div>
    <div className="d-flex justify-content-center align-items-center" >
    <Button onClick={addv} >add10</Button>
    </div></>
  );
};
