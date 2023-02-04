import { Button, Container, Row, Table, Text } from "@nextui-org/react";
import { IconArrowLeft } from "@tabler/icons-react";
import { navigate, useHistory } from "raviger";
import { useQuery } from "react-query";
import { fetchSingleSwapi, fetchSwapi } from "../APIs/fetchSwapi";

export default function CharacterDetails(props) {
  const state = useHistory();
  const characterQuery = useQuery(
    ["peopleDetails", props.charId],
    () => fetchSingleSwapi("people", props.charId),
    {
      initialData: () => {
        if (state.state.character) return state.state.character;
      },
    }
  );
  const moviesQuery = useQuery(["films", "films"], () => fetchSwapi("films"));
  if (characterQuery.isLoading) {
    return <></>;
  }
  if (characterQuery.isError) {
    return <></>;
  }
  return (
    <Container css={{ position: "relative", zIndex: "$2", mt: "76px" }}>
      <Row align="center">
        <Button
          light
          auto
          onPress={() => {
            navigate("/");
          }}
        >
          <IconArrowLeft size={36} />
        </Button>
        <Text h1>Characters Details</Text>
      </Row>

      <Table>
        <Table.Header>
          <Table.Column>Info</Table.Column>
          <Table.Column>Details</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row key={1}>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>{characterQuery.data.name}</Table.Cell>
          </Table.Row>
          <Table.Row key={2}>
            <Table.Cell>Species</Table.Cell>
            <Table.Cell>
              {props.species &&
                characterQuery.data.species.map((spec, index) => {
                  const title = props.species.get(spec)?.name;
                  return (
                    title +
                    (index + 1 === characterQuery.data.species.length
                      ? ""
                      : ", ")
                  );
                })}
            </Table.Cell>
          </Table.Row>
          <Table.Row key={3}>
            <Table.Cell>Movies</Table.Cell>
            <Table.Cell>
              <Text>
                {moviesQuery.status === "success" &&
                  characterQuery.data.films.map((film, index) => {
                    const title = moviesQuery.data?.results.find(
                      (x) => x.url === film
                    ).title;
                    return (
                      title +
                      (index + 1 === characterQuery.data.films.length
                        ? ""
                        : ", ")
                    );
                  })}
              </Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row key={4}>
            <Table.Cell>Star Ships</Table.Cell>
            <Table.Cell>
              <Text>
                {props.starships &&
                  characterQuery.data.starships.map((starship, index) => {
                    const title = props.starships.get(starship)?.name;
                    return (
                      title +
                      (index + 1 === characterQuery.data.starships.length
                        ? ""
                        : ", ")
                    );
                  })}
              </Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row key={5}>
            <Table.Cell>Vehicles</Table.Cell>
            <Table.Cell>
              <Text>
                {props.vehicles &&
                  characterQuery.data.vehicles.map((vehicle, index) => {
                    const title = props.vehicles.get(vehicle)?.name;
                    return (
                      title +
                      (index + 1 === characterQuery.data.starships.length
                        ? ""
                        : ", ")
                    );
                  })}
              </Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row key={6}>
            <Table.Cell>Height</Table.Cell>
            <Table.Cell>{characterQuery.data.height}</Table.Cell>
          </Table.Row>
          <Table.Row key={7}>
            <Table.Cell>Mass</Table.Cell>
            <Table.Cell>{characterQuery.data.mass}</Table.Cell>
          </Table.Row>
          <Table.Row key={8}>
            <Table.Cell>Hair Color</Table.Cell>
            <Table.Cell>{characterQuery.data.hair_color}</Table.Cell>
          </Table.Row>
          <Table.Row key={9}>
            <Table.Cell>Skin Color</Table.Cell>
            <Table.Cell>{characterQuery.data.skin_color}</Table.Cell>
          </Table.Row>
          <Table.Row key={10}>
            <Table.Cell>Eye Color</Table.Cell>
            <Table.Cell>{characterQuery.data.eye_color}</Table.Cell>
          </Table.Row>
          <Table.Row key={11}>
            <Table.Cell>Birth Year</Table.Cell>
            <Table.Cell>{characterQuery.data.birth_year}</Table.Cell>
          </Table.Row>
          <Table.Row key={12}>
            <Table.Cell>Gender</Table.Cell>
            <Table.Cell>{characterQuery.data.gender}</Table.Cell>
          </Table.Row>
          {/* <Table.Row key={13}>
            <Table.Cell>HomeWorld</Table.Cell>
            <Table.Cell>{characterQuery.data.homeworld}</Table.Cell>
          </Table.Row> */}
          <Table.Row key={13}>
            <Table.Cell>Created At</Table.Cell>
            <Table.Cell>{characterQuery.data.created}</Table.Cell>
          </Table.Row>
          <Table.Row key={14}>
            <Table.Cell>Updated At</Table.Cell>
            <Table.Cell>{characterQuery.data.edited}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
}
