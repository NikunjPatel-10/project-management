import {
  Button,
  Grid,
  Group,
  Modal,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useParams } from "react-router-dom";
import { projectStatuses, projectTypes } from "../utility/constants/constants";
import { IProjectFormValues } from "../utility/models/model";
import projectFormValidationSchema from "../utility/validations/projectForm.validations";
import {
  useAddProjectsByUserIdMutation,
  useEditProjectsByUserIdMutation,
} from "../utility/services/services";
import { IProject } from "../../shared/utility/models/models";

interface IFormProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  editProjectDetails?: IProject;
}

const Form = ({ opened, onClose, title, editProjectDetails }: IFormProps) => {
  const { userId = "" } = useParams();
  const [addProject, { isLoading: isAdding }] =
    useAddProjectsByUserIdMutation();
  const [editProject, { isLoading: isEditing }] =
    useEditProjectsByUserIdMutation();
  const form = useForm({
    initialValues: {
      userId: userId,
      projectName: editProjectDetails ? editProjectDetails.projectName : "",
      clientName: editProjectDetails ? editProjectDetails.clientName : "",
      projectType: editProjectDetails ? editProjectDetails.projectType : "",
      description: editProjectDetails ? editProjectDetails.description : "",
      reportingManager: editProjectDetails
        ? editProjectDetails.reportingManager
        : "",
      status: editProjectDetails ? editProjectDetails.status : "",
    },
    validate: yupResolver(projectFormValidationSchema),
    validateInputOnBlur: true,
  });

  const onAddProject = async (values: IProjectFormValues) => {
    addProject({ body: values })
      .unwrap()
      .then((res: IProjectFormValues) => {
        if (res) {
          onClose();
        }
      });
  };
  const onEditProject = async (values: IProjectFormValues) => {
    editProject({
      body: { ...values, id: editProjectDetails?.id },
    })
      .unwrap()
      .then((res: IProjectFormValues) => {
        if (res) {
          onClose();
        }
      });
  };

  const onSubmit = (values: IProjectFormValues) => {
    form.validate();
    if (form.isValid()) {
      editProjectDetails ? onEditProject(values) : onAddProject(values);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => onClose()}
      centered
      title={title}
      styles={{ modal: { width: 600 }, header: { fontWeight: "bolder" } }}
    >
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Grid gutter={"sm"}>
          <Grid.Col md={6}>
            <TextInput
              label="Project Name"
              placeholder="Enter Project Name"
              {...form.getInputProps("projectName")}
            />
          </Grid.Col>
          <Grid.Col md={6}>
            <TextInput
              label="Client Name"
              placeholder="Enter Client Name"
              {...form.getInputProps("clientName")}
            />
          </Grid.Col>
          <Grid.Col md={6}>
            <Select
              label="Select Project Type"
              placeholder="Project Type"
              data={projectTypes}
              {...form.getInputProps("projectType")}
            />
          </Grid.Col>
          <Grid.Col md={6}>
            <Select
              label="Select Project Status"
              placeholder="Status"
              data={projectStatuses}
              {...form.getInputProps("status")}
            />
          </Grid.Col>
          <Grid.Col md={12}>
            <TextInput
              label="Reporting Manager"
              placeholder="Enter Reporting Manager"
              {...form.getInputProps("reportingManager")}
            />
          </Grid.Col>
          <Grid.Col md={12}>
            <Textarea
              placeholder="Enter Description"
              label="Description"
              {...form.getInputProps("description")}
            />
          </Grid.Col>
        </Grid>
        <Group position="right" mt="md" spacing={4}>
          <Button loading={isAdding || isEditing} type="submit">
            Submit
          </Button>
          <Button type="button" color="red" onClick={() => onClose()}>
            Cancel
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default Form;
