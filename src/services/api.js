// src/services/api.js
const BASE_URL = "https://www.swapi.tech/api";

const fetchDetail = (category, id) => {
  return fetch(`${BASE_URL}/${category}/${id}`)
    .then(Response => Response.ok ? Response.json() : Promise.reject(`Error ${Response.status}`))
    .then(data => data.result?.properties || null)
    .catch(err => {
      console.error(`Error fetchDetail ${category}/${id}:`, err);
      return null;
    });
};

const fetchListWithDetails = (category) => {
  return fetch(`${BASE_URL}/${category}`)
    .then(Response => Response.ok ? Response.json() : Promise.reject(`Error ${Response.status}`))
    .then(data => {
      const results = data.results || [];
      const promises = results.map(item =>
        fetchDetail(category, item.uid).then(detail => ({ ...item, ...detail }))
      );
      return Promise.all(promises);
    })
    .catch(err => {
      console.error(`Error fetchListWithDetails ${category}:`, err);
      return [];
    });
};

export const api = {
  getAll: () => {
    return Promise.all([
      fetchListWithDetails("people"),
      fetchListWithDetails("planets"),
      fetchListWithDetails("vehicles")
    ]).then(([people, planets, vehicles]) => ({ people, planets, vehicles }))
    .catch(err => {
      console.error("Error en getAll:", err);
      return { people: [], planets: [], vehicles: [] };
    });
  },
  getDetail: fetchDetail
};