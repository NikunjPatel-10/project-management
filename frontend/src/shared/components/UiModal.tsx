import { Box, Modal } from "@mantine/core";
import { ReactNode, useState } from "react";

const UiModal = ({ children }: { children: ReactNode }) => {
  const [opened, setOpened] = useState<boolean>(false);
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Introduce yourself!"
    >
      <Box>{children}</Box>
    </Modal>
  );
};

export default UiModal;
