import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

const UiNoTasks = () => {
  return (
    <Alert
      icon={<IconAlertCircle size={16} />}
      title="No Tasks!"
      color="orange"
    >
      Click Add Task for adding a task to the project!
    </Alert>
  );
};

export default UiNoTasks;
