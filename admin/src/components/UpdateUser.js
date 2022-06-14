import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { useFormik } from "formik";

export default function UpdateUserPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    accountLevel: yup.string().required(),
    userId: yup.string().required("Role is required"),
  });

  const formik = useFormik({
    initialValues: {
      accountLevel: "",
      userId: userId,
    },
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        const response = await axios({
          method: "POST",
          url: "http://localhost:8080/admin/updateUser",

          data: values,
        }).then((response) => {
          navigate("../Users", { replace: true });
        });
      } catch (error) {
        if (!error.response) {
          console.log("No Server Response");
        } else if (error.response?.status === 400) {
          console.log("Missing Details");
        } else if (error.response?.status === 401) {
          console.log("Unauthorized");
        } else {
          console.log("Update Failed");
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
            justifyContent: "space-around",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="userId"
            label="userId"
            value={userId}
            readOnly
            sx={{ visibility: "hidden" }}
          />
          <FormControl sx={{ width: 100 }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="accountLevel"
              label="accountLevel"
              value={formik.values.accountLevel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.accountLevel &&
                Boolean(formik.errors.accountLevel)
              }
              helperText={
                formik.touched.accountLevel && formik.errors.accountLevel
              }
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <div
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button type="submit" variant="contained" sx={{ margin: "20px" }}>
              Update
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("../Users", { replace: true })}
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
