import { Button, Group, Modal, Stack, Text } from "@mantine/core";

interface IDeleteTaskModal {
  opened: boolean;
  onClose: () => void;
  handleDelete: () => Promise<void>;
  isDeleting: boolean;
}

const DeleteTaskModal = ({
  opened,
  onClose,
  handleDelete,
  isDeleting,
}: IDeleteTaskModal) => {
  return (
    <Modal
      opened={opened}
      onClose={() => onClose()}
      centered
      title={"Delete Task"}
      styles={{ modal: { width: 600 }, header: { fontWeight: "bolder" } }}
    >
      <Stack>
        <Text>Are you sure you want to delete this Task?</Text>
        <Group position="right" mt="md" spacing={4}>
          <Button
            loading={isDeleting}
            type="button"
            color="red"
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button type="button" onClick={() => onClose()}>
            Cancel
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default DeleteTaskModal;
