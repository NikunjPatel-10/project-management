import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Menu,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IProjectFormValues } from "../utility/models/model";
import {
  IconDotsVertical,
  IconReportAnalytics,
  IconTemplate,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import Form from "../form/Form";
import DeleteProjectModal from "./DeleteProjectModal";
import { useDeleteProjectsByUserIdMutation } from "../utility/services/services";
import ProjectDetails from "../detail/ProjectDetails";
import { useHover } from "@mantine/hooks";
import { commonStyles } from "../../shared/utility/styles/commonStyles";
import { useNavigate } from "react-router-dom";
import { getColorByStatus } from "../../shared/utility/helpers/helpers";
import { IProject } from "../../shared/utility/models/models";

const ProjectCard = ({ project }: { project: IProject }) => {
  
  const isAdminRole = localStorage.getItem("isAdmin") === "true";
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isShowDetails, setIsShowDetails] = useState(false);
  const { hovered, ref } = useHover();
  const { classes } = commonStyles();
  const navigate = useNavigate();

  const [deleteProject, { isLoading: isDeleting }] =
    useDeleteProjectsByUserIdMutation();

  const handleDelete = async () => {
    deleteProject({ id: project.id })
      .unwrap()
      .then((res: IProjectFormValues) => {
        if (res) {
          setIsDelete(false);
        }
      });
  };

  return (
    <>
      <Card radius={"md"} withBorder h={"100%"}>
        <Stack>
          <Group position="apart">
            <Group>
              <ThemeIcon size="xl" variant="light">
                <IconReportAnalytics />
              </ThemeIcon>
              <Stack spacing={0}>
                <Text fz={"xs"} c={"dimmed"} truncate>
                  {project?.clientName}
                </Text>
                <Text
                  fw={"bold"}
                  fz={"sm"}
                  truncate
                  ref={ref}
                  color={hovered ? "blue" : "black"}
                  onClick={() => setIsShowDetails(true)}
                  className={classes.cursorPointer}
                >
                  {project?.projectName}
                </Text>
              </Stack>
            </Group>
            <Group>
              <Badge variant="filled" color={getColorByStatus(project?.status)}>
                {project?.status}
              </Badge>
              {isAdminRole && (
                <Menu
                  transition={"pop"}
                  loop
                  position={"left-start"}
                  withinPortal
                >
                  <Menu.Target>
                    <ActionIcon variant="subtle" size={20}>
                      <IconDotsVertical />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      icon={<IconTemplate size={18} />}
                      onClick={() => {
                        setIsEdit(true);
                      }}
                    >
                      Edit Project
                    </Menu.Item>

                    <Menu.Item
                      c={"red"}
                      icon={<IconTrash size={18} />}
                      onClick={() => {
                        setIsDelete(true);
                      }}
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
            </Group>
          </Group>
          <Text fz={"sm"} lineClamp={2} title={project?.description}>
            {project?.description}
          </Text>
          <Group position="apart">
            <Group>
              <Stack spacing={0}>
                <Text fz={"xs"} c={"dimmed"} fw={"bold"}>
                  Project Type
                </Text>
                <Text fz={"sm"}>{project?.projectType}</Text>
              </Stack>
              <Stack spacing={0}>
                <Text fz={"xs"} c={"dimmed"} fw={"bold"}>
                  Reporting Manager
                </Text>
                <Text fz={"sm"}>{project?.reportingManager}</Text>
              </Stack>
            </Group>
            <Button
              variant="outline"
              onClick={() => navigate(`${project.id}/tasks`)}
            >
              Tasks
            </Button>
          </Group>
        </Stack>
      </Card>
      {isEdit && (
        <Form
          opened={isEdit}
          onClose={() => setIsEdit(false)}
          title={"Edit Project"}
          editProjectDetails={project}
        />
      )}
      {isDelete && (
        <DeleteProjectModal
          opened={isDelete}
          onClose={() => setIsDelete(false)}
          handleDelete={handleDelete}
          isDeleting={isDeleting}
        />
      )}
      {isShowDetails && (
        <ProjectDetails
          opened={isShowDetails}
          onClose={() => setIsShowDetails(false)}
          projectDetails={project}
        />
      )}
    </>
  );
};

export default ProjectCard;
