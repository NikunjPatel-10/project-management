import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import Form from "../form/Form";

const NewProjectBtn = () => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Button leftIcon={<IconPlus size={20} />} onClick={() => setOpened(true)}>
        Add Project
      </Button>
      {opened && (
        <Form
          opened={opened}
          onClose={() => setOpened(false)}
          title={"Add Project"}
        />
      )}
    </>
  );
};

export default NewProjectBtn;
