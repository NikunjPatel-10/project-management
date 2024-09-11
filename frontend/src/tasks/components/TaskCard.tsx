import { ActionIcon, Card, Group, Menu, Stack, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconDotsVertical, IconTemplate, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { getColorByStatus } from "../../shared/utility/helpers/helpers";
import { commonStyles } from "../../shared/utility/styles/commonStyles";
import Form from "../form/Form";
import { useDeleteTaskMutation } from "../utility/services/services";
import DeleteTaskModal from "./DeleteTaskModal";
import TaskDetails from "./TaskDetails";
import { ITask } from "../../shared/utility/models/models";

const TaskCard = ({ task }: { task: ITask }) => {
  console.log(task);
  
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isShowDetails, setIsShowDetails] = useState(false);
  const { hovered, ref } = useHover();
  const { classes } = commonStyles();

  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const handleDelete = async () => {
    deleteTask({ id: task.id  })
      .unwrap()
      .then((res: ITask) => {
        if (res) {
          setIsDelete(false);
        }
      });
  };

  return (
    <>
      <Card
        radius={"md"}
        withBorder
        h={"100%"}
        style={{ borderTop: `3px solid ${getColorByStatus(task.status)}` }}
      >
        <Stack>
          <Group position="apart">
            <Stack spacing={0}>
              <Text
                fw={"bold"}
                fz={"sm"}
                truncate
                ref={ref}
                color={hovered ? "blue" : "black"}
                onClick={() => setIsShowDetails(true)}
                className={classes.cursorPointer}
              >
                {task?.name}
              </Text>
              <Text fz={"sm"} lineClamp={2} title={task?.description}>
                {task?.description}
              </Text>
            </Stack>
            <Group>
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
                    Edit
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
            </Group>
          </Group>
          <Group position="apart">
            <Group>
              <Stack spacing={0}>
                <Text fz={"xs"} c={"dimmed"} fw={"bold"}>
                  Category
                </Text>
                <Text fz={"sm"}>{task?.category}</Text>
              </Stack>
              <Stack spacing={0}>
                <Text fz={"xs"} c={"dimmed"} fw={"bold"}>
                  billing Type
                </Text>
                <Text fz={"sm"}>{task.billingType}</Text>
              </Stack>
            </Group>
          </Group>
        </Stack>
      </Card>
      {isEdit && (
        <Form
          opened={isEdit}
          onClose={() => setIsEdit(false)}
          title={"Edit Task"}
          editTaskDetails={task}
        />
      )}
      {isDelete && (
        <DeleteTaskModal
          opened={isDelete}
          onClose={() => setIsDelete(false)}
          handleDelete={handleDelete}
          isDeleting={isDeleting}
        />
      )}
      {isShowDetails && (
        <TaskDetails
          opened={isShowDetails}
          onClose={() => setIsShowDetails(false)}
          taskDetails={task}
        />
      )}
    </>
  );
};

export default TaskCard;
