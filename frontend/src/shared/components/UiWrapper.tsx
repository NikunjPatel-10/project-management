import { Stack } from "@mantine/core";
import { ReactNode } from "react";

const UiWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Stack spacing={0} h={"100%"}>
      {children}
    </Stack>
  );
};

export default UiWrapper;
