import {
  Box,
  Container,
  Grid,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import UiHeader from "../shared/components/UiHeader";
import UiNoTasks from "../shared/components/UiNoTasks";
import UiSkeleton from "../shared/components/UiSkeleton";
import UiWrapper from "../shared/components/UiWrapper";
import { getFilteredList } from "../shared/utility/helpers/helpers";
import { ITask } from "../shared/utility/models/models";
import { useGetTasksByUserIdQuery } from "../shared/utility/services/services";
import NewTaskBtn from "./components/NewTaskBtn";
import TaskCard from "./components/TaskCard";

const Tasks = () => {
  const theme = useMantineTheme();
  const { userId = "", projectId = "" } = useParams();
  
  // Fetch tasks based on userId and projectId
  const { data: tasks, isFetching, error } = useGetTasksByUserIdQuery({
    userId: Number(userId),
    projectId: Number(projectId),
  });

  // Filter tasks based on status
  const completedTasks = getFilteredList(tasks || [] as ITask[], "status", "completed");
  const activeTasks = getFilteredList(tasks || [] as ITask[], "status", "active");
  const newTasks = getFilteredList(tasks || [] as ITask[], "status", "new");

  return (
    <UiWrapper>
      <UiHeader pageTitle={"Tasks"}>
        <NewTaskBtn />
      </UiHeader>
      <Box
        p={"sm"}
        style={{ backgroundColor: theme.colors.gray[1], overflow: "hidden" }}
        h={"100%"}
      >
        <Container size={"xl"} my={"lg"} h={"100%"}>
          {isFetching ? (
            <UiSkeleton />
          ) : error ? (
            <UiNoTasks />
          ) : tasks?.length === 0 ? (
            <UiNoTasks  />
          ) : (
            <Grid gutter={"lg"} h={"100%"}>
              <Grid.Col md={4} h={"100%"}>
                <Stack h={"100%"}>
                  <Title order={5}>New Tasks</Title>
                  <Box h={"100%"} style={{ overflow: "auto" }} pr={8}>
                    <Stack>
                      {newTasks.length > 0 ? (
                        newTasks.map((task) => (
                          <TaskCard key={task.id} task={task} />
                        ))
                      ) : (
                        <UiNoTasks />
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </Grid.Col>
              <Grid.Col md={4} h={"100%"}>
                <Stack h={"100%"}>
                  <Title order={5}>Active Tasks</Title>
                  <Box h={"100%"} style={{ overflow: "auto" }} pr={8}>
                    <Stack>
                      {activeTasks.length > 0 ? (
                        activeTasks.map((task) => (
                          <TaskCard key={task.id} task={task} />
                        ))
                      ) : (
                        <UiNoTasks />
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </Grid.Col>
              <Grid.Col md={4} h={"100%"}>
                <Stack h={"100%"}>
                  <Title order={5}>Completed Tasks</Title>
                  <Box h={"100%"} style={{ overflow: "auto" }} pr={8}>
                    <Stack>
                      {completedTasks.length > 0 ? (
                        completedTasks.map((task) => (
                          <TaskCard key={task.id} task={task} />
                        ))
                      ) : (
                        <UiNoTasks />
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </Grid.Col>
            </Grid>
          )}
        </Container>
      </Box>
    </UiWrapper>
  );
};

export default Tasks;
