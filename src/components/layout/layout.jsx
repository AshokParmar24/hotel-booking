import { Box } from "@mui/material";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebare/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box sx={{ width: "100%", display: "flex" }}>
        <Sidebar />
        <Box sx={{ margin: "20px", width: "100%" }}>{children}</Box>
      </Box>
    </>
  );
};

export default Layout;
