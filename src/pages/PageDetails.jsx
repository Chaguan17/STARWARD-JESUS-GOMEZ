import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api.js";
import Details from "../components/Details.jsx";



const DetailPage = () => {
  const { category, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getDetail(category, id)
      .then(detail => {
        setData(detail);
      })
      .catch(err => {
        console.error("Error cargando detalle:", err);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [category, id]);

  if (loading) return <p>Cargando...</p>;
  if (!data) return <p>No se encontró información</p>;


  return (
    <div className="container mt-3">
      <Link to="/" className="btn btn-secondary mb-3">⬅ Volver</Link>
        <Details data={data} category={category} id={id} />
      </div>
  );
};

export default DetailPage;