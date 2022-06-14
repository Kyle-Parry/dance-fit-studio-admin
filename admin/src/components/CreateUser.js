import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

export default function CreateUserPage() {
  const navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Must be a valid email address")
      .required("email is required"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    password: yup
      .string()
      .min(5, "Password must be longer than 5 characters")
      .required("Class time is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        const response = await axios({
          method: "post",
          url: "http://localhost:8080/admin/createUser",
          data: values,
        }).then((response) => {
          navigate("/Users");
        });
      } catch (error) {
        if (!error.response) {
          console.log("No Server Response");
        } else if (error.response?.status === 401) {
          console.log("Unauthorized");
        } else {
          console.log("User failed to create.");
        }
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            bgcolor: "#cfe8fc",
            minHeight: "85vh",
            marginTop: "10%",
            borderRadius: "25px",
            flexDirection: "column",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{
              textAlign: "center",
              paddingTop: "5%",
            }}
          >
            Create User
          </Typography>
          <TextField
            required
            id="email"
            label="Email"
            placeholder="Email"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            required
            id="firstName"
            label="First Name"
            placeholder="First Name"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            required
            id="lastName"
            label="Last Name"
            placeholder="Last Name"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            required
            type="password"
            id="password"
            label="Password"
            placeholder="Password"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <div
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button type="submit" variant="contained" sx={{ margin: "30px" }}>
              Create
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/Users")}
              sx={{ margin: "20px" }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
}
