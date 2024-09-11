import { Box, Card, Group, Progress, Stack, Text, Title } from "@mantine/core";
import { getPercentage } from "../../shared/utility/helpers/helpers";

interface IStatesCardProps {
  cardTitle: string;
  total: number;
  completedStatus: number;
  activeStatus: number;
  newStatus: number;
}

const StatesCard = ({
  cardTitle,
  total,
  completedStatus,
  activeStatus,
  newStatus,
}: IStatesCardProps) => {
  return (
    <Card radius={"md"} withBorder h={"100%"}>
      <Card.Section withBorder p={"sm"}>
        <Group spacing={4}>
          <Title order={5}>{cardTitle}</Title>
          <Title order={5} c={"dimmed"}>{`(${total})`}</Title>
        </Group>
      </Card.Section>
      <Stack py={"sm"}>
        <Group position="apart">
          <Box w={"50%"}>
            <Progress color="violet" value={getPercentage(total, newStatus)} />
          </Box>
          <Group spacing={4}>
            <Text fz={"xs"} fw={"bold"}>
              New
            </Text>
            <Text fz={"xs"}>{`(${getPercentage(total, newStatus)}%)`}</Text>
          </Group>
        </Group>
        <Group position="apart">
          <Box w={"50%"}>
            <Progress color="blue" value={getPercentage(total, activeStatus)} />
          </Box>
          <Group spacing={4}>
            <Text fz={"xs"} fw={"bold"}>
              Active
            </Text>
            <Text fz={"xs"}>{`(${getPercentage(total, activeStatus)}%)`}</Text>
          </Group>
        </Group>
        <Group position="apart">
          <Box w={"50%"}>
            <Progress
              color="green"
              value={getPercentage(total, completedStatus)}
            />
          </Box>
          <Group spacing={4}>
            <Text fz={"xs"} fw={"bold"}>
              Completed
            </Text>
            <Text fz={"xs"}>
              {`(${getPercentage(total, completedStatus)}%)`}
            </Text>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};

export default StatesCard;
