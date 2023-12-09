
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const BASE_URL = 'https://api.pexels.com/v1/search';

const BASE_URL1 = 'https://api.pexels.com/videos/search';

export const Gallery = ({ category }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (category) {
      const fetchImages = async () => {
        try {
          const response = await fetch(`${BASE_URL}?query=${category}&per_page=15`, {
            headers: {
              Authorization: API_KEY,
            },
          });
          const data = await response.json();
          setImages(data.photos);
        } catch (error) {
          console.error('Error while fetching images:', error);
        }
      };

      fetchImages();
    }
  }, [category]);

  return (
    <div className="d-flex justify-content-around flex-wrap">
      {images.map((image) => (
        <Card key={image.id} style={{ width: '18rem', margin: '10px' }}>
          <Card.Img variant="top" src={image.src.medium} alt={`Photo by ${image.photographer}`} />
          <Card.Body>
            <Card.Title>{image.photographer}</Card.Title>
            <Card.Text>ID: {image.id}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};


export const Gallery1 = ({ category }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (category) {
      const fetchVideos = async () => {
        try {
          const response = await fetch(`${BASE_URL1}?query=${category}&per_page=10`, {
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
  }, [category]);

  return (
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
  );
};
