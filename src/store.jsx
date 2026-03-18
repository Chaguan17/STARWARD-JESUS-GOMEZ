
import React, { createContext, useReducer, useContext } from "react";
import { api } from "./services/api.js";

export const Context = createContext(null);

const initialStore = {
  people: [],
  planets: [],
  vehicles: [],
  favorites: [],
  loading: false,
  error: null,
};

const storeReducer = (store, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...store, [action.payload.type]: action.payload.data };
    case "ADD_FAVORITE":
      if (store.favorites.includes(action.payload)) return store;
      return { ...store, favorites: [...store.favorites, action.payload] };
    case "REMOVE_FAVORITE":
      return { ...store, favorites: store.favorites.filter(f => f !== action.payload) };
    case "SET_LOADING":
      return { ...store, loading: action.payload };
    case "SET_ERROR":
      return { ...store, error: action.payload };
    default:
      return store;
  }
};


export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, initialStore);
  return <Context.Provider value={{ store, dispatch }}>{children}</Context.Provider>;
};


export const useGlobalReducer = () => {
  const { store, dispatch } = useContext(Context);

  const actions = {
    loadData: () => {
      dispatch({ type: "SET_LOADING", payload: true });
      api.getAll()
        .then(data => {
          Object.entries(data).forEach(([type, items]) => {
            dispatch({ type: "SET_DATA", payload: { type, data: items } });
          });
        })
        .catch(() => {
          dispatch({ type: "SET_ERROR", payload: "Error cargando datos" });
        })
        .finally(() => dispatch({ type: "SET_LOADING", payload: false }));
    },
    addFavorite: name => dispatch({ type: "ADD_FAVORITE", payload: name }),
    removeFavorite: name => dispatch({ type: "REMOVE_FAVORITE", payload: name }),
  };

  return { store, actions };
};