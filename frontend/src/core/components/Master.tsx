import { AppShell } from "@mantine/core";
import ProtectedRoute from "./ProtectedRoute";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Master = () => {
  return (
    <AppShell
      layout="alt"
      header={<Topbar />}
      navbar={<Sidebar />}
      padding={0}
      styles={{
        root: { height: "100%", overflow: "hidden" },
        body: { height: "100%" },
      }}
    >
      <ProtectedRoute />
    </AppShell>
  );
};

export default Master;
