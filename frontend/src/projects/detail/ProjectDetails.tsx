import { Badge, Drawer, Group, Stack, Title } from "@mantine/core";
import {
  IconAlignBoxCenterMiddle,
  IconFileDescription,
  IconUserBitcoin,
  IconUserCog,
} from "@tabler/icons-react";
import { getColorByStatus } from "../../shared/utility/helpers/helpers";
import UiDetailTile from "../../shared/components/UiDetailTile";
import { IProject } from "../../shared/utility/models/models";

interface IProjectDetailsProp {
  opened: boolean;
  onClose: () => void;
  projectDetails: IProject;
}

const ProjectDetails = ({
  opened,
  onClose,
  projectDetails,
}: IProjectDetailsProp) => {
  return (
    <Drawer
      position="right"
      opened={opened}
      onClose={() => onClose()}
      title={
        <Group position="apart" w={"100%"}>
          <Title order={4}>{projectDetails?.projectName}</Title>
          <Badge
            variant="filled"
            color={getColorByStatus(projectDetails?.status)}
          >
            {projectDetails?.status}
          </Badge>
        </Group>
      }
      padding="xl"
      size="xl"
    >
      <Stack spacing={"sm"} py={"lg"}>
        <UiDetailTile
          icon={<IconUserBitcoin size={16} />}
          label="Client Name"
          value={projectDetails?.clientName}
        />
        <UiDetailTile
          icon={<IconAlignBoxCenterMiddle size={16} />}
          label="Project Type"
          value={projectDetails?.projectType}
        />
        <UiDetailTile
          icon={<IconUserCog size={16} />}
          label="Reporting Manager"
          value={projectDetails?.reportingManager}
        />
        <UiDetailTile
          icon={<IconFileDescription size={16} />}
          label="Description"
          value={projectDetails?.description}
        />
      </Stack>
    </Drawer>
  );
};

export default ProjectDetails;
