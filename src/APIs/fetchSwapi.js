export const fetchSwapi = async (item = "people", page = 1) => {
  const res = await fetch(`https://swapi.py4e.com/api/${item}/?page=${page}`);
  return res.json();
};

export const fetchSingleSwapi = async (typ = "people", item = 1) => {
  const res = await fetch(`https://swapi.py4e.com/api/${typ}/${item}`);
  return res.json();
};


export const fetchURL = async (url) => {
  const res = await fetch(url);
  return res.json();
};
