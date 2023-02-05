export const fetchSwapi = async (item = "people", page = 1) => {
  const res = await fetch(`https://swapi.py4e.com/api/${item}/?page=${page}`);
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
};

export const fetchSingleSwapi = async (typ = "people", item = 1) => {
  const res = await fetch(`https://swapi.py4e.com/api/${typ}/${item}`);
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
};

export const fetchURL = async (url) => {
  const res = await fetch(url);
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
};
