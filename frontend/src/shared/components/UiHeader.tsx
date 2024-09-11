import { Container, Group, Paper, Title } from "@mantine/core";
import { ReactNode } from "react";

interface IHeaderProps {
  children?: ReactNode;
  pageTitle: string;
}

const UiHeader = ({ children, pageTitle }: IHeaderProps) => {
  return (
    <Paper
      radius={0}
      withBorder
      style={{ borderLeft: "0", borderRight: "0", borderTop: "0" }}
      py={"md"}
    >
      <Container size={"xl"}>
        <Group position="apart">
          <Title order={3}>{pageTitle}</Title>
          {children}
        </Group>
      </Container>
    </Paper>
  );
};

export default UiHeader;
