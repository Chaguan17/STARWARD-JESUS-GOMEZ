// src/pages/Home.jsx
import React, { useEffect } from "react";
import { useGlobalReducer } from "../store.jsx";
import Card from "../components/Card.jsx";

const Home = () => {
  const { store, actions } = useGlobalReducer();

  useEffect(() => { actions.loadData(); }, []);

  if (store.loading) return <p>Cargando...</p>;
  if (store.error) return <p>{store.error}</p>;

  const categories = ["people", "planets", "vehicles"];

  return (
    <div className="container">
      {categories.map(cat => (
        <div key={cat}>
          <h2>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h2>
          <div className="d-flex overflow-auto">
            {store[cat]?.map(item => (
              <Card key={item.uid} item={item} category={cat} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;