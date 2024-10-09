import { Avatar, Box, Button, Menu, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Ensure correct import
import Image from "next/image";
import face_logo from "@/assets/image/faces logo.svg"; // Correct the path if needed
import avatar from "@/assets/image/avatar.jpg";
import { useState, useRef, useEffect } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { setUserProfile } from "@/redux-toolkit/slices/user/index";
import { GetUserProfile } from "@/service/api";
import { useDispatch } from "react-redux";

const Header = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state?.userProfileReducer.user);
  const handleClick = () => {
    setOpen(!open);
  };

  console.log("userProfile :>> ", userProfile);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setOpen(!open);
    router.push("/login");
  };

  useEffect(() => {
    GetUserProfile()
      .then((result) => {
        if (result.data.status) {
          dispatch(setUserProfile(result.data.user));
        }
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside dropdownRef element
      console.log(
        "dropdownRef.current && !dropdownRef.current.contains(event.target) :>> ",
        dropdownRef.current,
        dropdownRef?.current?.contains(event.target)
      );
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box
      sx={{
        height: "100px",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        padding: "22px 24px",
        alignItems: "center",
        borderBottom: "1px solid",
        borderColor: theme.palette.grey[200],
      }}
    >
      <Box>
        <Image
          src={face_logo}
          alt="faces logo"
          width={150}
          height={50}
          priority
        />
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Avatar
          alt={`${userProfile.name} ${userProfile.surname}`}
          src={userProfile?.profilePicture}
          sx={{ width: 58, height: 58 }}
        />

        <Box
          sx={{ alignItems: "center", display: "flex", position: "relative" }}
        >
          <Button onClick={handleClick} variant="outline">
            dadg{" "}
          </Button>
          {open && (
            <Paper
              ref={dropdownRef}
              sx={{
                position: "absolute",
                width: "300px",
                right: "5px",
                top: "60px",
                padding: "20px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              {" "}
              <Button
                onClick={handleClick}
                sx={{ justifyContent: "flex-start" }}
                variant="text"
                color="text"
                startIcon={<SettingsIcon />}
              >
                Setting
              </Button>
              <Button
                onClick={handleLogout}
                sx={{ justifyContent: "flex-start" }}
                variant="text"
                startIcon={<LogoutIcon />}
                color="text"
              >
                logout
              </Button>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
