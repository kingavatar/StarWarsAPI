// Importing NextUIProvider Component to setup NextUI at root of the Application
import { NextUIProvider } from '@nextui-org/react';
// Importing createTheme and useDarkMode to switch themes of the Application
import useDarkMode from '@fisch0920/use-dark-mode';
import Header from './layout/Header';
import { darkTheme, lightTheme } from './theme/shared';
import { appears, StyledImg } from './layout/styles';
import Content from './layout/Content';
import { useRoutes } from "raviger";
import CharacterDetails from "./layout/CharacterDetails";
import { useEffect, useState } from "react";
import { fetchSwapi } from "./APIs/fetchSwapi";
import NotFound from "./layout/NotFound";

const routes = {
  "/": ({ vehicles, starships, species }) => <Content />,
  "/character/:charId": ({ charId, vehicles, starships, species }) => (
    <CharacterDetails
      charId={charId}
      vehicles={vehicles}
      starships={starships}
      species={species}
    />
  ),
  "/*": ({ darkMode }) => <NotFound darkMode={darkMode} />,
};

function App() {
  const [vehicles, setVehicles] = useState(new Map());
  const [starships, setStarships] = useState(new Map());
  const [species, setSpecies] = useState(new Map());

  // Apply light or dark theme depending on useDarkMode value
  const darkMode = useDarkMode(false);

  let route = useRoutes(routes, {
    routeProps: {
      vehicles: vehicles,
      starships: starships,
      species: species,
      darkMode: darkMode,
    },
    basePath: "/StarWarsAPI",
  });
  useEffect(() => {
    async function getAllAPIS(typ, setFunction) {
      let result = [];
      const response = await fetchSwapi(typ);
      const numberOfPagesLeft = Math.ceil(
        (response.count - 1) / response.results.length
      );
      result.push(...response.results);
      for (let i = 2; i <= numberOfPagesLeft; i++) {
        const res = await fetchSwapi(typ, i);
        result.push(...res.results);
      }
      setFunction(new Map(result.map((item) => [item.url, item])));
    }
    // Get All the resoucres from paginated backend
    getAllAPIS("vehicles", setVehicles);
    getAllAPIS("starships", setStarships);
    getAllAPIS("species", setSpecies);
  }, []);

  return (
    <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
      <Header darkMode={darkMode} />
      {route}
      <StyledImg
        alt="gradient blue background"
        className="content__gradient-blue"
        css={{
          display: "none",
          opacity: 0,
          position: "fixed",
          zIndex: "$1",
          bottom: "-50%",
          left: "-10%",
          right: "-50%",
          animation: `${appears} 200ms 100ms ease forwards`,
          [`.${darkTheme} &`]: {
            display: "block",
          },
        }}
        src="/StarWarsAPI/gradient-left-dark.svg"
      />
      <StyledImg
        alt="gradient violet background"
        className="content__gradient-violet"
        css={{
          display: "none",
          top: 0,
          opacity: 0,
          position: "fixed",
          animation: `${appears} 200ms 100ms ease forwards`,
          "@lg": {
            top: "-50%",
            right: "-50%",
          },
          "@mdMax": {
            top: "-35%",
            right: "-45%",
          },
          [`.${darkTheme} &`]: {
            display: "block",
          },
        }}
        src="/StarWarsAPI/gradient-right-dark.svg"
      />
    </NextUIProvider>
  );
}

export default App;
