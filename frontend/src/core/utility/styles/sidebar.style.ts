import { createStyles } from "@mantine/core";

export const sidebarStyle = createStyles((theme) => ({
  sidebar: {
    backgroundColor: theme.colors.blue[6],
  },
  nav_link: {
    padding: "10px",
    borderRadius: "8px",
  },
  active_nav_link: {
    backgroundColor: theme.colors.blue[2],
  },
}));
