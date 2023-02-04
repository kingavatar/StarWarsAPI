import {
  Button,
  Container,
  Grid,
  Input,
  Loading,
  Pagination,
  Radio,
  Row,
  Text,
} from "@nextui-org/react";
import { IconLayoutGrid, IconReload, IconList } from "@tabler/icons-react";
// import { useNavigate } from "raviger";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { fetchSwapi } from "../APIs/fetchSwapi";
import CharacterCard from "../Components/CharacterCard";
import CharacterTable from "../Components/CharacterTable";
import MoviesFilter from "../Components/MoviesFilter";
import SpeciesFilter from "../Components/SpeciesFilter";
import { StyledPaginatedContainer } from "./styles";

function Content() {
  const [page, setPage] = useState(1);
  const [useCard, setUseCard] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [selectedSpecies, setSelectedSpecies] = useState(undefined);
  const [startDate, setStartDate] = useState(undefined);
  const [startYear, setStartYear] = useState("BBY");
  const [endDate, setEndDate] = useState(undefined);
  const [endYear, setEndYear] = useState("BBY");
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [useFiltered, setUseFiltered] = useState(false);
  // Access the client
  const queryClient = useQueryClient();

  // eslint-disable-next-line no-unused-vars
  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(["characters", page], () => fetchSwapi("people", page), {
      keepPreviousData: true,
    });

  // Prefetch the next page!
  useEffect(() => {
    if (data?.next) {
      queryClient.prefetchQuery(["characters", page + 1], () =>
        fetchSwapi("people", page + 1)
      );
    }
  }, [data, page, queryClient]);
  useEffect(() => {
    async function getAllCharacters() {
      let result = [];
      const response = await fetchSwapi("people");
      const numberOfPagesLeft = Math.ceil(
        (response.count - 1) / response.results.length
      );
      result.push(...response.results);
      for (let i = 2; i <= numberOfPagesLeft; i++) {
        const res = await fetchSwapi("people", i);
        result.push(...res.results);
      }
      setCharacters(new Map(result.map((item) => [item.url, item])));
    }
    getAllCharacters();
  }, []);

  // This part performs all filters operations on the characters from the API
  useMemo(() => {
    let result = [];

    // This handles Movie Filtering
    if (selectedMovie) {
      const res = [];
      selectedMovie.characters.forEach((character) => {
        res.push(characters.get(character));
      });
      result = res;
    }

    // This handles Species Filtering
    if (selectedSpecies) {
      if (result.length !== 0) {
        const res = result.filter(
          (item) =>
            item.species && item.species.indexOf(selectedSpecies.url) > -1
        );
        result = res;
      } else {
        const res = [];
        selectedSpecies.people.forEach((character) => {
          res.push(characters.get(character));
        });
        result = res;
      }
    }

    // This handles Start Date Filtering
    if (startDate) {
      let res = [];
      if (result.length !== 0) {
        res = result;
      } else {
        res = Array.from(characters.values());
      }
      result = res.filter((item) => {
        if (item.birth_year === "unknown") return false;
        const year = item.birth_year.substr(-3);
        const yearNumber = item.birth_year.substring(
          0,
          item.birth_year.length - 3
        );
        if (year === "BBY") {
          if (startYear === "ABY") return false;
          else if (yearNumber < startDate) return false;
        } else {
          if (startYear === "BBY") return true;
          else if (yearNumber < startDate) return false;
        }
        return true;
      });
    }

    // This handles End Date Filtering
    if (endDate) {
      let res = [];
      if (result.length !== 0) {
        res = result;
      } else {
        res = Array.from(characters.values());
      }
      result = res.filter((item) => {
        if (item.birth_year === "unknown") return false;
        const year = item.birth_year.substr(-3);
        const yearNumber = item.birth_year.substring(
          0,
          item.birth_year.length - 3
        );
        if (year === "BBY") {
          if (endYear === "ABY") return true;
          else if (yearNumber > endDate) return false;
        } else {
          if (endYear === "BBY") return false;
          else if (yearNumber > endDate) return false;
        }
        return true;
      });
    }

    // Setting the Filtered Characters List
    setFilteredCharacters(result);

    // Use Filtered List only when input is given
    if (selectedMovie || selectedSpecies || startDate || endDate) {
      setUseFiltered(true);
    } else {
      setUseFiltered(false);
    }
    // Only when Inputs change we recalculate the Character List
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMovie, selectedSpecies, startDate, startYear, endDate, endYear]);

  // Early Return which displays Loading Screen when paginated Characters List is fetched
  if (isLoading)
    return (
      <Grid.Container
        css={{ h: "80vh" }}
        justify="center"
        alignItems="center"
        direction="column"
      >
        <Grid>
          <Loading
            size="xl"
            color="secondary"
            type="gradient"
            textColor="secondary"
          >
            Loading the Characters
          </Loading>
        </Grid>
      </Grid.Container>
    );

  // Early Return which displays Error Screen when paginated Characters List is fetched
  if (isError)
    return (
      <Grid.Container
        css={{ h: "85vh" }}
        justify="center"
        alignItems="center"
        direction="column"
      >
        <Text h2 color="error">
          An Error Occured. Try Refresh or Try again later.
        </Text>
        <Text h4 color="warning">
          {error && error.message}
        </Text>
        <Button
          iconRight={<IconReload />}
          shadow
          auto
          onClick={() => {
            window.location.reload();
          }}
        >
          Refresh
        </Button>
      </Grid.Container>
    );

  return (
    <>
      <Container css={{ position: "relative", zIndex: "$2", mt: "76px" }}>
        {/* Heading */}
        <Text css={{ textAlign: "center" }} h1>
          Characters List
        </Text>
        {/* All Inputs are defined Here */}
        <Row justify="space-between" align="center">
          <MoviesFilter setMovie={setSelectedMovie} />
          <SpeciesFilter setSpecies={setSelectedSpecies} />
          <Grid direction="row" css={{ display: "flex" }}>
            <Input
              width="120px"
              labelLeft="Start Date"
              value={startDate}
              onChange={(evt) => setStartDate(Number(evt.target.value))}
              type="number"
              css={{ mr: "$6" }}
            />
            <Radio.Group
              label="Year"
              value={startYear}
              css={{ mb: "$6" }}
              onChange={(val) => setStartYear(val)}
            >
              <Radio value="BBY" size="xs">
                BBY
              </Radio>
              <Radio value="ABY" size="xs">
                ABY
              </Radio>
            </Radio.Group>
          </Grid>
          <Grid direction="row" css={{ display: "flex" }}>
            <Input
              width="120px"
              labelLeft="End Date"
              type="number"
              value={endDate}
              onChange={(evt) => setEndDate(Number(evt.target.value))}
              css={{ mr: "$6" }}
            />
            <Radio.Group
              label="Year"
              value={endYear}
              css={{ mb: "$6" }}
              onChange={(val) => setEndYear(val)}
            >
              <Radio value="BBY" size="xs">
                BBY
              </Radio>
              <Radio value="ABY" size="xs">
                ABY
              </Radio>
            </Radio.Group>
          </Grid>
          <Button.Group color="gradient" ghost>
            <Button
              isHovered={useCard}
              onPress={() => {
                setUseCard(true);
              }}
            >
              <IconLayoutGrid />
            </Button>
            <Button
              isHovered={!useCard}
              onPress={() => {
                setUseCard(false);
              }}
            >
              <IconList />
            </Button>
          </Button.Group>
        </Row>
        {/* Displaying Card Layout or List Layout */}
        <Grid.Container gap={3} justify="center">
          {useCard &&
            data &&
            (useFiltered
              ? filteredCharacters.map((item, index) => (
                  <Grid key={index}>
                    <CharacterCard character={item} />
                  </Grid>
                ))
              : data.results.map((item, index) => (
                  <Grid key={index}>
                    <CharacterCard character={item} />
                  </Grid>
                )))}
          {!useCard && (
            <Grid css={{ w: "100%" }}>
              <CharacterTable
                data={useFiltered ? filteredCharacters : data?.results}
              />
            </Grid>
          )}
          {isFetching && (
            <Grid>
              <Loading>Fetching</Loading>
            </Grid>
          )}
        </Grid.Container>
      </Container>
      {filteredCharacters.length === 0 && (
        <StyledPaginatedContainer>
          <Row justify="center" css={{ p: "$12" }}>
            <Pagination
              initialPage={1}
              shadow
              total={9}
              onChange={(page) => {
                setPage(page);
              }}
            />
          </Row>
        </StyledPaginatedContainer>
      )}
    </>
  );
}

export default Content;
