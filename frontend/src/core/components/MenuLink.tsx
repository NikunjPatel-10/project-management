import { NavLink } from "react-router-dom";
import { sidebarStyle } from "../utility/styles/sidebar.style";
import { Group, Text } from "@mantine/core";
import { INavLinkItem } from "../utility/models/models";

const MenuLink = ({ link }: { link: INavLinkItem }) => {
  
  const { classes, cx } = sidebarStyle();
  return (
    <NavLink
      key={link.to}
      to={link.to}
      className={({ isActive }) =>
        cx(classes.nav_link, {
          [classes.active_nav_link]: isActive,
        })
      }
    >
      <Group spacing={8}>
        {link.icon}
        <Text>{link.text}</Text>
      </Group>
    </NavLink>
  );
};

export default MenuLink;
