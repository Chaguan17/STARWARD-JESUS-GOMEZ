
import React from "react";
import { useGlobalReducer } from "../store.jsx";

const Navbar = () => {
  const { store, actions } = useGlobalReducer();

  return (
    <nav className="navbar navbar-light bg-light px-3">
      <span className="navbar-brand">Star Wars</span>
      <div className="dropdown">
        <button className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
          Favoritos ({store.favorites.length})
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          {store.favorites.length === 0 ? (
            <li className="dropdown-item">No favorites</li>
          ) : (
            store.favorites.map((fav, i) => (
              <li key={i} className="dropdown-item d-flex justify-content-between">
                {fav}
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();       
                    actions.removeFavorite(fav);
                  }}
                >
                  X
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;


