import {
  Button,
  Divider,
  Group,
  Image,
  Navbar,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconFileFilled,
  IconLayoutDashboardFilled,
  IconLogout,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import logo from "../../../project-management.svg";
import {
  HEADER_HEIGHT,
  MenuLinks,
  NAVBAR_WIDTH,
} from "../utility/constants/constants";
import { INavLinkItem } from "../utility/models/models";
import { sidebarStyle } from "../utility/styles/sidebar.style";
import MenuLink from "./MenuLink";

const menuLinks: INavLinkItem[] = [
  {
    to: MenuLinks.DASHBOARD,
    icon: <IconLayoutDashboardFilled />,
    text: "Dashboard",
  },
  { to: MenuLinks.PROJECTS, icon: <IconFileFilled />, text: "Projects" },
];
const Sidebar = () => {
  const { classes } = sidebarStyle();
  const navigate = useNavigate();
  return (
    <Navbar
      width={{ base: NAVBAR_WIDTH }}
      withBorder
      className={classes.sidebar}
    >
      <Group
        w={NAVBAR_WIDTH}
        h={HEADER_HEIGHT}
        style={{ borderBottom: "1px solid #e9ecef" }}
        p={"sm"}
      >
        <Image
          height={25}
          width={"auto"}
          fit="contain"
          alt={"Logo"}
          src={logo}
        />
        <Text fw={"bold"}>Project Management</Text>
      </Group>
      <Navbar.Section grow style={{ overflow: "auto" }} p={"sm"}>
        <Stack my={"sm"} spacing={0}>
          {/* Navigation menu */}
          {menuLinks.map((link) => (
            <MenuLink link={link} key={link.to} />
          ))}
        </Stack>
      </Navbar.Section>
      <Divider my={"xs"} />
      {/* Action menu */}
      <Navbar.Section p={"sm"} w={"100%"}>
        <Button
          variant="light"
          leftIcon={<IconLogout />}
          w={"100%"}
          styles={{ inner: { justifyContent: "flex-start" } }}
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
