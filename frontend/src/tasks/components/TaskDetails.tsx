import { Badge, Drawer, Group, Stack, Title } from "@mantine/core";
import {
  IconAlignBoxCenterMiddle,
  IconFileDescription,
  IconUserBitcoin,
} from "@tabler/icons-react";
import UiDetailTile from "../../shared/components/UiDetailTile";
import { getColorByStatus } from "../../shared/utility/helpers/helpers";
import { ITask } from "../../shared/utility/models/models";

interface ITaskDetailsProp {
  opened: boolean;
  onClose: () => void;
  taskDetails: ITask;
}

const TaskDetails = ({ opened, onClose, taskDetails }: ITaskDetailsProp) => {
  return (
    <Drawer
      position="right"
      opened={opened}
      onClose={() => onClose()}
      title={
        <Group position="apart" w={"100%"}>
          <Title order={4}>{taskDetails?.name}</Title>
          <Badge variant="filled" color={getColorByStatus(taskDetails?.status)}>
            {taskDetails?.status}
          </Badge>
        </Group>
      }
      padding="xl"
      size="xl"
    >
      <Stack spacing={"sm"} py={"lg"}>
        <UiDetailTile
          icon={<IconUserBitcoin size={16} />}
          label="Task Category"
          value={taskDetails?.category}
        />
        <UiDetailTile
          icon={<IconAlignBoxCenterMiddle size={16} />}
          label="Billing Type"
          value={taskDetails?.billingType}
        />

        <UiDetailTile
          icon={<IconFileDescription size={16} />}
          label="Description"
          value={taskDetails?.description}
        />
      </Stack>
    </Drawer>
  );
};

export default TaskDetails;
