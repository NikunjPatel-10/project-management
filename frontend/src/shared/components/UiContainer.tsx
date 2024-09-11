import { Box, Container, useMantineTheme } from "@mantine/core";
import { ReactNode } from "react";

const UiContainer = ({ children }: { children: ReactNode }) => {
  const theme = useMantineTheme();
  return (
    <Box
      style={{ overflow: "auto", backgroundColor: theme.colors.gray[1] }}
      h={"100%"}
    >
      <Container size={"xl"} my={"lg"}>
        {children}
      </Container>
    </Box>
  );
};

export default UiContainer;
