import { Button, Group, Modal, Stack, Text } from "@mantine/core";

interface IDeleteProjectModal {
  opened: boolean;
  onClose: () => void;
  handleDelete: () => Promise<void>;
  isDeleting: boolean;
}

const DeleteProjectModal = ({
  opened,
  onClose,
  handleDelete,
  isDeleting,
}: IDeleteProjectModal) => {
  return (
    <Modal
      opened={opened}
      onClose={() => onClose()}
      centered
      title={"Delete Project"}
      styles={{ modal: { width: 600 }, header: { fontWeight: "bolder" } }}
    >
      <Stack>
        <Text>Are you sure you want to delete this project?</Text>
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

export default DeleteProjectModal;
