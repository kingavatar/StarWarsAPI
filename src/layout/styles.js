import {  styled } from "@nextui-org/react";
import { keyframes } from "@nextui-org/react";

export const StyledHeaderMainContainer = styled("nav", {
  top: 0,
  padding: "24px",
  width: "100%",
  position: "fixed",
  background: "transparent",
  zIndex: "$max",
});

export const StyledPaginatedContainer = styled("div", {
  bottom: 0,
  width: "100%",
  position: "fixed",
  background: "transparent",
  zIndex: "$max",
});

export const StyledHeaderContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  size: "100%",
  variants: {
    showBlur: {
      true: {
        background: "$background",
        "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))":
          {
            background: "$headerBackground",
          },
      },
    },
    isDetached: {
      true: {
        backdropFilter: "saturate(180%) blur(10px)",
        boxShadow: "0px 5px 20px -5px rgba(2, 1, 1, 0.1)",
      },
      false: {
        backdropFilter: "none",
        boxShadow: "none",
        background: "transparent",
      },
    },
  },
});

export const StyledImg = styled("img", {});

export const appears = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});
