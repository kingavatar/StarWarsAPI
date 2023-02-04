import { Dropdown } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { fetchSwapi } from "../APIs/fetchSwapi";

export default function MoviesFilter(props) {
  const [selectedMovie, setSelectedMovie] = useState(new Set(["All Movies"]));

  const moviesQuery = useQuery(["films", "films"], () => fetchSwapi("films"));

  const selectedMovieValue = useMemo(
    () => Array.from(selectedMovie).join(", "),
    [selectedMovie]
  );

  const handleMovie = props.setMovie;
  useMemo(() => {
    const movie = moviesQuery.data?.results.find(
      (item) => item.title === selectedMovieValue
    );
    handleMovie(movie);
  }, [moviesQuery.data, selectedMovieValue, handleMovie]);

  return (
    <Dropdown>
      <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
        {selectedMovieValue}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Single selection actions for Movies"
        color="secondary"
        disallowEmptySelection
        selectionMode="single"
        containerCss={{ mt: "-60px" }}
        selectedKeys={selectedMovie}
        onSelectionChange={setSelectedMovie}
      >
        {moviesQuery.isLoading ? (
          <Dropdown.Section title="Loading">
            <Dropdown.Item
              color="secondary"
              key="loading"
              description="Loading the Movies"
            >
              Loading
            </Dropdown.Item>
          </Dropdown.Section>
        ) : moviesQuery.isError ? (
          <Dropdown.Section title="Error">
            <Dropdown.Item
              color="error"
              key="error"
              description="Error has occured when loading the Movies"
            >
              Error Occured
            </Dropdown.Item>
          </Dropdown.Section>
        ) : (
          moviesQuery.data && [
            <Dropdown.Section title="Movies">
              {moviesQuery.data.results.map((item) => (
                <Dropdown.Item key={item.title}>{item.title}</Dropdown.Item>
              ))}
            </Dropdown.Section>,
            <Dropdown.Section title="Select All">
              <Dropdown.Item key="All Movies">"All Movies"</Dropdown.Item>
            </Dropdown.Section>,
          ]
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
