import { Grid, Text } from "@nextui-org/react";
import { useMemo } from "react";

export default function NotFound(props) {
  const css = useMemo(() => {
    return `.next-error-h1 {
                ${
                  props.darkMode.value
                    ? "border-right: 1px solid rgba(255, 255, 255, .3)"
                    : "border-right: 1px solid rgba(0, 0, 0, .3);"
                }    
                  }
                `;
  }, [props.darkMode]);
  return (
    <Grid.Container
      css={{ h: "85vh" }}
      justify="center"
      alignItems="center"
      direction="row"
    >
      <style>{css}</style>
      <Text
        h1
        className="next-error-h1"
        css={{
          display: "inline-block",
          margin: 0,
          marginRight: "20px",
          padding: "0 23px 0 0",
          fontSize: "24px",
          fontWeight: 500,
          verticalAlign: "top",
          lineHeight: "49px",
        }}
      >
        404
      </Text>
      <div
        style={{
          display: "inline-block",
          textAlign: "left",
          lineHeight: "49px",
          height: "49px",
          verticalAlign: "middle",
        }}
      >
        <Text
          h2
          css={{
            fontSize: "14px",
            fontWeight: "normal",
            lineHeight: "49px",
            margin: 0,
            padding: 0,
          }}
        >
          This page could not be found.
        </Text>
      </div>
    </Grid.Container>
  );
}
