import { Container, Row, Switch, Text } from "@nextui-org/react";
import { IconMoonStars, IconSunFilled } from "@tabler/icons-react";
import { StyledHeaderContainer, StyledHeaderMainContainer } from "./styles";

function Header(props) {
  return (
    <StyledHeaderMainContainer id="header-container">
      <StyledHeaderContainer isDetached={false} showBlur={true}>
        <Container responsive>
          <Row justify="space-between">
            <Text h3 weight="normal">
              Arintra - FE Assigment
            </Text>
            <div>
              <Row gap={1} align="items-center" justify="space-between">
                {props.darkMode.value ? (
                  <IconMoonStars style={{ marginTop: "4px" }} />
                ) : (
                  <IconSunFilled style={{ marginTop: "4px" }} />
                )}
                <Switch
                  shadow
                  checked={props.darkMode.value}
                  onChange={() => props.darkMode.toggle()}
                />
              </Row>
            </div>
          </Row>
        </Container>
      </StyledHeaderContainer>
    </StyledHeaderMainContainer>
  );
}

export default Header;
