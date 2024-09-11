import { Group, Stack, Text, ThemeIcon } from "@mantine/core";
import { ReactNode } from "react";

interface IProjectDetailTileProps {
  label: string;
  value: string;
  icon: ReactNode;
}

const UiDetailTile = ({ label, value, icon }: IProjectDetailTileProps) => {
  return (
    <Group noWrap>
      <ThemeIcon variant="light">{icon}</ThemeIcon>
      <Stack spacing={0}>
        <Text fz={"xs"} c={"dimmed"}>
          {label}
        </Text>
        <Text fz={"sm"}>{value}</Text>
      </Stack>
    </Group>
  );
};

export default UiDetailTile;
