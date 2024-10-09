"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Typography,
  Paper,
  Grid,
  IconButton,
  FormHelperText,
  TextField,
  InputAdornment,
  Box,
} from "@mui/material";
import Image from "next/image";
import loginImage from "@/assets/image/singin.jpg"; // Update with your image path
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Singin } from "@/service/api";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material";
 import { setUserProfile } from "@/redux-toolkit/slices/user";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
   const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    Singin(data)
      .then((result) => {
        if (result?.data?.status) {
          localStorage.setItem("token", result?.data?.user?.token);
           router.push("/");
        }
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid container sx={{ height: "100vh", overflow: "scrolling" }}>
      <Grid item xs={12} md={6} sx={{ position: "relative", height: "100vh" }}>
        <Image
          src={loginImage}
          alt="Login Image"
          objectFit="cover"
          fill={true}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme?.palette?.background?.default,
          padding: 2,
        }}
      >
        <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, width: "100%" }}>
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Sign In
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="body2" color={theme.palette.text.main}>
              Email
            </Typography>
            <TextField
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Email"
              variant="outlined"
              fullWidth
            />
            <FormHelperText error>{errors.email?.message}</FormHelperText>

            <Typography
              variant="body2"
              color={theme.palette.text.main}
              sx={{ marginTop: "10px" }}
            >
              Password
            </Typography>
            <TextField
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$",
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 6 characters long",
                },
              })}
              fullWidth
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText error>{errors.password?.message}</FormHelperText>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
