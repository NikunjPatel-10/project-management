import { createStyles } from "@mantine/core";
import bkgImage from "../../../assets/images/background-image.jpg";

export const loginStyles = createStyles(() => ({
  wrapper: {
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bkgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "top",
  },
}));
