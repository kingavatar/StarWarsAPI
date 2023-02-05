import { Card, Row, Text } from "@nextui-org/react";
import {
  IconBan,
  IconCar,
  IconGenderFemale,
  IconGenderGenderless,
  IconGenderHermaphrodite,
  IconGenderMale,
  IconMovie,
  IconRocket,
} from "@tabler/icons-react";
import { navigate } from "raviger";

function CharacterCard(props) {
  const genders = new Map();
  genders.set("male", <IconGenderMale />);
  genders.set("female", <IconGenderFemale />);
  genders.set("unknown", <IconGenderGenderless />);
  genders.set("n/a", <IconBan />);
  genders.set("none", <IconBan />);
  genders.set("hermaphrodite", <IconGenderHermaphrodite />);
  
  return (
    <Card
      isHoverable
      isPressable
      css={{ p: "$sm", h: "260px", w: "220px" }}
      onPress={() => {
        const getCharId =
          props.character.url.slice(-1) === "/"
            ? props.character.url.split("/").at(-2)
            : props.character.url.split("/").at(-1);
        navigate(`/StarWarsAPI/character/${getCharId}`, {
          state: { character: props.character },
        });
      }}
    >
      <Card.Header css={{ justifyContent: "center" }}>
        <Text h4 css={{ mb: 0 }}>
          {props.character.name}
        </Text>
      </Card.Header>
      <Card.Body>
        <Row justify="space-evenly" align="center">
          <Text align="content-center">{props.character.gender}</Text>
          {genders.get(props.character.gender)}
        </Row>
        <Row justify="space-evenly" align="center">
          <Text align="content-center">Height</Text>
          {props.character.height}
        </Row>
        <Row justify="space-evenly" align="center">
          <Text align="content-center">Mass</Text>
          {props.character.mass}
        </Row>
      </Card.Body>
      <Card.Footer isBlurred>
        <Row align="center" gap={1}>
          <IconMovie />
          <Text>{props.character.films.length}</Text>
        </Row>
        <Row align="center" gap={1}>
          <IconCar />
          <Text>{props.character.vehicles.length}</Text>
        </Row>
        <Row align="center" gap={1}>
          <IconRocket />
          <Text>{props.character.starships.length}</Text>
        </Row>
      </Card.Footer>
    </Card>
  );
}

export default CharacterCard;
