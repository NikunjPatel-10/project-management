import { Grid } from "@mantine/core";
import { useParams } from "react-router-dom";
import UiContainer from "../shared/components/UiContainer";
import UiHeader from "../shared/components/UiHeader";
import UiWrapper from "../shared/components/UiWrapper";
import { getStatesDetails } from "../shared/utility/helpers/helpers";
import { IProject, ITask } from "../shared/utility/models/models";
import {
  useGetProjectsByUserIdQuery,
  useGetTasksByUserIdQuery,
} from "../shared/utility/services/services";
import StatesCard from "./components/StatesCard";
import UiSkeleton from "../shared/components/UiSkeleton";

const Dashboard = () => {
  const { userId  } = useParams();

  const { data: tasks, isFetching: isTasksFetching } = useGetTasksByUserIdQuery(
   {
    userId: Number(userId)
   }
  );
  
  const {
    total: totalTasks,
    completedStatus: completedTasks,
    activeStatus: activeTasks,
    newStatus: newTasks,
  } = getStatesDetails(tasks as any);

  const { data: projects, isFetching: isProjectsFetching } =
    useGetProjectsByUserIdQuery({
      userId: Number(userId),
    });

  const {
    total: totalProjects,
    completedStatus: completedProjects,
    activeStatus: activeProjects,
    newStatus: newProjects,
  } = getStatesDetails(projects as IProject[]);

  return (
    <UiWrapper>
      <UiHeader pageTitle={"Dashboard"}></UiHeader>
      <UiContainer>
        <Grid gutter={"lg"}>
          <Grid.Col xs={12} md={6}>
            {isProjectsFetching ? (
              <UiSkeleton />
            ) : (
              <StatesCard
                cardTitle={"Projects"}
                total={totalProjects}
                completedStatus={completedProjects}
                activeStatus={activeProjects}
                newStatus={newProjects}
              />
            )}
          </Grid.Col>
          <Grid.Col xs={12} md={6}>
            {isTasksFetching ? (
              <UiSkeleton />
            ) : (
              <StatesCard
                cardTitle={"Tasks"}
                total={totalTasks}
                completedStatus={completedTasks}
                activeStatus={activeTasks}
                newStatus={newTasks}
              />
            )}
          </Grid.Col>
        </Grid>
      </UiContainer>
    </UiWrapper>
  );
};

export default Dashboard;
