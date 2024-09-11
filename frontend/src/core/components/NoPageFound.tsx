import { Button, Center, Group, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";

const NoPageFound = () => {
  return (
    <Center h={"100%"}>
      <Stack justify="center">
        <Title order={3}>404</Title>
        <Title order={5}>You have found a secret place.</Title>
        <Text c="dimmed" size="lg">
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </Text>
        <Group>
          <Button
            to={"/"}
            component={Link}
            variant="outline"
            size="md"
            color={"indigo"}
          >
            Back
          </Button>
        </Group>
      </Stack>
    </Center>
  );
};

export default NoPageFound;
