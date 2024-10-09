import { Box, Collapse, Typography, useTheme } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PaymentsIcon from "@mui/icons-material/Payments";
import React, { useState } from "react";
import Link from "next/link";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useRouter } from "next/router"; // Import useRouter from next/router

const Sidebar = () => {
  const theme = useTheme();
  const router = useRouter(); // Initialize useRouter to get the current route
  const [openSubMenus, setOpenSubMenus] = useState({});

  const toggleSubMenu = (menuIndex) => {
    setOpenSubMenus((prevOpenSubMenus) => ({
      ...prevOpenSubMenus,
      [menuIndex]: !prevOpenSubMenus[menuIndex],
    }));
  };

  const menuList = [
    {
      title: "Home",
      path: "/",
      icon: <HomeIcon />,
    },
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      children: [
        {
          title: "Overview",
          path: "/dashboard/overview",
        },
        {
          title: "Reports",
          path: "/dashboard/reports",
          children: [
            {
              title: "Sales Report",
              path: "/dashboard/reports/sales",
            },
            {
              title: "User Report",
              path: "/dashboard/reports/users",
            },
          ],
        },
      ],
    },
    { title: "Payment", path: "/payment", icon: <PaymentsIcon /> },
    {
      title: "Settings",
      path: "/settings",
      icon: <SettingsIcon />,
    },
    {
      title: "Logout",
      icon: <LogoutIcon />,
      onClick: () => {
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
          router.push("/login");
        }
      },
    },
  ];

  const renderMenuItems = (menuItems, parentIndex = "") => {
    return menuItems.map((item, index) => {
      const currentIndex = parentIndex ? `${parentIndex}-${index}` : `${index}`;
      const isOpen = openSubMenus[currentIndex] || false;
      const isActive = router.pathname === item.path; // Check if the current route matches the item path
      console.log("isActive :>> ", isActive, router.pathname, item.path);
      return (
        <React.Fragment key={currentIndex}>
          <Box
            href={item.children ? undefined : item.path}
            onClick={() =>
              item?.onClick
                ? item?.onClick()
                : item.children && toggleSubMenu(currentIndex)
            }
            component={item.onClick || item.children ? Box : Link}
            sx={{
              cursor: "pointer",
              background: isActive
                ? theme.palette.action.active // Active background color
                : isOpen
                ? theme.palette.action.selected
                : "transparent",
              color: isActive ? theme.palette.success.contrastText : "inherit", // Active text color
              borderRadius: "5px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0 10px",
              "&:hover": {
                background: theme.palette.primary.main, // Hover background color
                "& .MuiTypography-root": {
                  color: theme.palette.primary.contrastText, // Change text color on hover
                },
                "& .MuiSvgIcon-root": {
                  color: theme.palette.primary.contrastText, // Change icon color on hover
                },
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {item.icon && (
                  <Box
                    sx={{
                      color: isActive
                        ? theme.palette.primary.contrastText
                        : theme.palette.primary.main,
                    }}
                  >
                    {item.icon}
                  </Box>
                )}
                <Typography
                  color={
                    isActive
                      ? theme.palette.primary.contrastText
                      : theme?.palette.primary.main
                  }
                >
                  {item.title}
                </Typography>
              </Box>
              <Box
                sx={{
                  color: isActive
                    ? theme.palette.primary.contrastText
                    : theme.palette.primary.main,
                }}
              >
                {item.children && (isOpen ? <ExpandLess /> : <ExpandMore />)}
              </Box>
            </Box>
          </Box>

          {item.children && (
            <Collapse in={isOpen}>
              <Box
                sx={{
                  pl: 1,
                  background: theme.palette.grey[100],
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {renderMenuItems(item.children, currentIndex)}
              </Box>
            </Collapse>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <Box
      sx={{
        maxWidth: "300px",
        width: "100%",
        height: "100%",
        margin: "20px",
      }}
    >
      <Box
        sx={{
          background: theme.palette.background.paper,
          padding: "20px 10px",
          border: "1px solid",
          width: "100%",
          height: "100%",
          borderColor: theme.palette.grey[300],
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {renderMenuItems(menuList)}
      </Box>
    </Box>
  );
};

export default Sidebar;
