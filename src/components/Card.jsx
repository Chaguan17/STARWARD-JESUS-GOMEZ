// src/components/Card.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store.jsx";

const Card = ({ item, category }) => {
  const { store, actions } = useGlobalReducer();
  const navigate = useNavigate();
  const isFavorite = store.favorites.includes(item.name);

  const getMainProperties = (item, category) => {
    switch (category) {
      case "people":
        return [
          { label: "Gender", value: item.gender },
          { label: "Birth Year", value: item.birth_year },
          { label: "Eye Color", value: item.eye_color },
          { label: "Hair Color", value: item.hair_color },
        ];
      case "planets":
        return [
          { label: "Climate", value: item.climate },
          { label: "Gravity", value: item.gravity },
          { label: "Orbital Period", value: item.orbital_period },
        ];
      case "vehicles":
        return [
          { label: "Manufacturer", value: item.manufacturer },
          { label: "Model", value: item.model },
          { label: "Passengers", value: item.passengers },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="card m-2" style={{ minWidth: "18rem" }}>
      <div className="card-body">
        <h5>{item.name}</h5>
        {getMainProperties(item, category).map(p => (
          <p key={p.label}>{p.label}: {p.value || "–"}</p>
        ))}
        <div className="d-flex justify-content-between">
        <button
          className="btn btn-info m-1"
          onClick={() => navigate(`/details/${category}/${item.uid}`)}
        >
          Learn More
        </button>
        <button
          className="btn btn-warning m-1"
          onClick={() => isFavorite ? actions.removeFavorite(item.name) : actions.addFavorite(item.name)}
        >
          {isFavorite ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
        </button>

        </div>
        
      </div>
    </div>
  );
};

export default Card;