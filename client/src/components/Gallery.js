import React from "react";
import "../styles/Gallery.css";

const galleryItems = [
  { name: "For All The Dogs Cavalier King Charles Crewneck", front: "/Dogs_Front.png", back: "/Dogs_Back.png", blank: "Dark Gray - H&M", price: "$100" },
  { name: "Frank Ocean Blonde Hoodie", front: "/Blonde_Front.png", back: "/Blonde_Back.png", blank: "Cream - H&M", price: "$100" },
  { name: "Asap Rocky Rolling Loud 2023 Hoodie", front: "/Asap_Front.png", back: "/Asap_Back.png", blank: "Green - Amazon", price: "$90" },
  { name: "Charles Leclerc F1 Helmet Hoodie", front: "/Leclerc_Front.png", back: "/Leclerc_Back.png", blank: "Cream - H&M", price: "$85" },
  { name: "For All The Dogs Doberman Hoodie", front: "/Doberman_Front.png", back: "/Doberman_Back.png", blank: "Dark Gray - Shaka Wear", price: "$100" },
  { name: "For All The Dogs Labrador Hoodie", front: "/Labrador_Front.png", back: "/Labrador_Back.png", blank: "Light Gray - Champion", price: "$80" },
  { name: "Frank Ocean Nikes Zip Up Hoodie", front: "/Nikes_Front.png", back: "/Nikes_Back.png", blank: "White/Cream - H&M", price: "$90" },
  { name: "Travis Scott Cactus Jack Crewneck", front: "/Cactus_Front.png", back: "/Cactus_Back.png", blank: "Black - Nike", price: "$90" },
  { name: "Kairos T-Shirt", front: "/Kairos_Front.png", back: "/Kairos_Back.png", blank: "N/A", price: "$45" },
  { name: "Drake Take Care Hoodie", front: "/Drake_Front.png", back: "/Drake_Back.png", blank: "Black - Nike", price: "$140" }
];

function Gallery() {
  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Gallery</h1>
      <p className="gallery-description">
        Each hoodie created by Kairos Customs is a unique design made specifically for the customer who ordered it.
        Use this gallery for inspiration or to see what our team can create.
      </p>
      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <div key={index} className="hoodie-container">
            <h3 className="hoodie-name">{item.name}</h3>
            <div className="hoodie-images">
              <img src={item.front} alt={`${item.name} Front`} className="hoodie-image" />
              <img src={item.back} alt={`${item.name} Back`} className="hoodie-image" />
            </div>
            <div className="hoodie-description">
              <p><strong>Blank:</strong> {item.blank}</p>
              <p><strong>Price:</strong> {item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;

