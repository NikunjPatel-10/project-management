import { Box, Grid } from "@mantine/core";
import { useParams } from "react-router-dom";
import UiContainer from "../shared/components/UiContainer";
import UiHeader from "../shared/components/UiHeader";
import UiSkeleton from "../shared/components/UiSkeleton";
import UiWrapper from "../shared/components/UiWrapper";
import NewProjectBtn from "./components/NewProjectBtn";
import ProjectCard from "./components/ProjectCard";
import { useGetProjectsByUserIdQuery } from "../shared/utility/services/services";

const Projects = () => {
  const isAdminRole = localStorage.getItem("isAdmin") === "true";
  const { userId = ""  } = useParams();
  const { data: projects, isFetching } = useGetProjectsByUserIdQuery({
    userId: Number(userId),
  });

  

  return (
    <UiWrapper>
      <UiHeader pageTitle={"Projects"}>
        {isAdminRole && <NewProjectBtn />}
      </UiHeader>
      <UiContainer>
        <Box>
          {isFetching ? (
            <UiSkeleton />
          ) : (
            <Grid gutter={"lg"}>
              {projects &&
                projects.length > 0 &&
                projects?.map((project) => (
                  <Grid.Col xs={12} lg={6} xl={4} key={project.id}>
                    <ProjectCard project={project} />
                  </Grid.Col>
                ))}
            </Grid>
          )}
        </Box>
      </UiContainer>
    </UiWrapper>
  );
};

export default Projects;
