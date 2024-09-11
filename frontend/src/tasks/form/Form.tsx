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
import { taskFormValidationSchema } from "../utility/validations/taskFoamValidations";
import {
  useAddTaskMutation,
  useEditTaskMutation,
} from "../utility/services/services";
import {
  billingTypes,
  categories,
  status,
} from "../utility/constants/constants";
import { ITask } from "../../shared/utility/models/models";

interface IFormProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  editTaskDetails?: ITask;
}

const Form = ({ opened, onClose, title, editTaskDetails }: IFormProps) => {
  const { userId = "", projectId = "" } = useParams();
  const [addTask, { isLoading: isAdding }] = useAddTaskMutation();
  const [editTask, { isLoading: isEditing }] = useEditTaskMutation();
  const form = useForm({
    initialValues: {
      // userId: userId,
      // projectId: projectId,
      name: editTaskDetails ? editTaskDetails.name : "",
      category: editTaskDetails ? editTaskDetails.category : "",
      billingType: editTaskDetails ? editTaskDetails.billingType : "",
      description: editTaskDetails ? editTaskDetails.description : "",
      status: editTaskDetails ? editTaskDetails.status : "",
    },
    validate: yupResolver(taskFormValidationSchema),
    validateInputOnBlur: true,
  });

  const onAddTask = async (values: ITask) => {
    const data = {...values, userId:Number(userId), projectId:Number(projectId)}
    addTask({ body: data })
      .unwrap()
      .then((res: ITask) => {
        if (res) {
          onClose();
        }
      });
  };
  const onEditTask = async (values: ITask) => {
    editTask({
      body: { ...values, id: editTaskDetails?.id as number },
    })
      .unwrap()
      .then((res: ITask) => {
        if (res) {
          onClose();
        }
      });
  };

  const onSubmit = (values: ITask) => {
    form.validate();
    if (form.isValid()) {
      editTaskDetails ? onEditTask(values) : onAddTask(values);
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
              label="Task Name"
              placeholder="Enter Task Name"
              {...form.getInputProps("name")}
            />
          </Grid.Col>
          <Grid.Col md={6}>
            <Select
              label="Select Status"
              placeholder="Status"
              data={status}
              {...form.getInputProps("status")}
            />
          </Grid.Col>
          <Grid.Col md={6}>
            <Select
              label="Select Category"
              placeholder="Category"
              data={categories}
              {...form.getInputProps("category")}
            />
          </Grid.Col>
          <Grid.Col md={6}>
            <Select
              label="Select Billing Type"
              placeholder="Billing Type"
              data={billingTypes}
              {...form.getInputProps("billingType")}
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
            {editTaskDetails?.id ? 'UPDATE':'SUBMIT'}
          </Button>
          <Button type="button" color="red" onClick={() => onClose()}>
            CANCEL
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default Form;
