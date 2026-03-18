import React from "react";



const Details = ({ data, category, id }) => {
  if (!data) return <p className="text-center mt-5">Cargando...</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">

        <div className="row align-items-center">
          <div className="col-md-5 text-center mb-3">
          </div>
          <div className="col-md-7">
            <h2 className="mb-3">{data.name}</h2>

            <p className="text-muted">
              Información detallada del {category}
            </p>

            <hr />
            <div className="row">
              {Object.entries(data).slice(0, 4).map(([key, value]) => (
                <div className="col-6 mb-2" key={key}>
                  <strong>{key.replace(/_/g, " ")}:</strong>
                  <br />
                  <span>{value || "-"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>


        <hr className="my-4" />

        <div className="row text-center">

          {Object.entries(data).slice(4).map(([key, value]) => (
            <div className="col-6 col-md-4 col-lg-3 mb-3" key={key}>
              <div className="border rounded p-2 h-100 shadow-sm">
                <small className="text-muted d-block">
                  {key.replace(/_/g, " ")}
                </small>
                <strong>{value || "-"}</strong>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Details;