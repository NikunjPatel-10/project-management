import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import Form from "../form/Form";

const NewTaskBtn = () => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Button leftIcon={<IconPlus size={20} />} onClick={() => setOpened(true)}>
        Add Task
      </Button>
      {opened && (
        <Form
          opened={opened}
          onClose={() => setOpened(false)}
          title={"Add Task"}
        />
      )}
    </>
  );
};

export default NewTaskBtn;
