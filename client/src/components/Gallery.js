import React from "react";
import "../styles/Gallery.css";

const galleryItems = [
  {
    name: "For All The Dogs Cavalier King Charles Crewneck",
    front: "/Dogs_Front.png",
    back: "/Dogs_Back.png",
    blank: "H&M (Dark Gray)",
    price: "$100"
  },
  {
    name: "Frank Ocean Blonde Hoodie",
    front: "/Blonde_Front.png",
    back: "/Blonde_Back.png",
    blank: "H&M (Cream)",
    price: "$100"
  },
  {
    name: "Asap Rocky Rolling Loud 2023 Hoodie",
    front: "/Asap_Front.png",
    back: "/Asap_Back.png",
    blank: "Amazon (Green)",
    price: "$90"
  },
  {
    name: "Charles Leclerc F1 Helmet Hoodie",
    front: "/Leclerc_Front.png",
    back: "/Leclerc_Back.png",
    blank: "H&M (Cream)",
    price: "$85"
  },
  {
    name: "For All The Dogs Doberman Hoodie",
    front: "/Doberman_Front.png",
    back: "/Doberman_Back.png",
    blank: "Shaka Wear (Dark Gray)",
    price: "$100"
  },
  {
    name: "For All The Dogs Labrador Hoodie",
    front: "/Labrador_Front.png",
    back: "/Labrador_Back.png",
    blank: "Champion (Light Grey)",
    price: "$80"
  },
  {
    name: "Frank Ocean Nikes Zip Up Hoodie",
    front: "/Nikes_Front.png",
    back: "/Nikes_Back.png",
    blank: "H&M (White/Cream)",
    price: "$90"
  },
  {
    name: "Travis Scott Cactus Jack Crewneck",
    front: "/Cactus_Front.png",
    back: "/Cactus_Back.png",
    blank: "Nike (Black)",
    price: "$90"
  },
  {
    name: "Kairos T-Shirt",
    front: "/Kairos_Front.png",
    back: "/Kairos_Back.png",
    blank: "N/A",
    price: "$45"
  },
  {
    name: "Drake Take Care Hoodie",
    front: "/Drake_Front.png",
    back: "/Drake_Back.png",
    blank: "Obey",
    price: "$140"
  }
];

function Gallery() {
  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Gallery</h1>
      <p className="gallery-description">
        Each hoodie created by Kairos Customs is a one-of-a-kind design made for the person who ordered it. Use this gallery for inspiration or to see what our team can create.
      </p>
      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <div key={index} className="hoodie-container">
            <h3 className="hoodie-name">{item.name}</h3>
            <div className="hoodie-images">
              <img src={item.front} alt={`${item.name} Front`} className="hoodie-front" />
              <img src={item.back} alt={`${item.name} Back`} className="hoodie-back" />
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

