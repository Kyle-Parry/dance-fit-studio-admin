import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import * as yup from "yup";
import { useFormik } from "formik";

export default function CreateClassPage() {
  const [imgs, setImgs] = useState([]);

  const validationSchema = yup.object({
    classType: yup.string().required("Class type is required"),
    description: yup.string().required("Description is required"),
    classDate: yup.date("Must be a date").required("Class date is required"),
    classTime: yup.string().required("Class time is required"),
    imgID: yup.string().required("Image is required"),
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchImgs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/imgs");
        if (response && response.data) setImgs(response.data);
      } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    };
    fetchImgs();
  }, []);

  const formik = useFormik({
    initialValues: {
      classType: "",
      description: "",
      classDate: "",
      classTime: "",
      imgID: "",
    },
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        const response = await axios({
          method: "post",
          url: "http://localhost:8080/admin/createClass",
          data: values,
        }).then((response) => {
          navigate("/Classes");
        });
      } catch (error) {
        if (!error.response) {
          console.log("No Server Response");
        } else if (error.response?.status === 401) {
          console.log("Unauthorized");
        } else {
          console.log("Class failed to create.");
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
            Create Class
          </Typography>
          <TextField
            id="classType"
            name="classType"
            label="Class Type"
            placeholder="Class Type"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
            value={formik.values.classType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.classType && Boolean(formik.errors.classType)}
            helperText={formik.touched.classType && formik.errors.classType}
          />
          <TextareaAutosize
            aria-label="minimum height"
            minRows={10}
            id="description"
            placeholder="Description"
            style={{
              minWidth: 300,
              resize: "none",
              bgcolor: "#fff",
              marginTop: "30px",
              borderRadius: "5px",
            }}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            type="date"
            id="classDate"
            name="classDate"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
            value={formik.values.classDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.classDate && Boolean(formik.errors.classDate)}
            helperText={formik.touched.classDate && formik.errors.classDate}
          />
          <TextField
            type="Time"
            id="classTime"
            name="classTime"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
            value={formik.values.classTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.classTime && Boolean(formik.errors.classTime)}
            helperText={formik.touched.classTime && formik.errors.classTime}
          />
          <FormControl
            sx={{
              width: 300,
              bgcolor: "#fff",
              marginTop: "30px",
              borderRadius: "5px",
            }}
          >
            <InputLabel id="demo-simple-select-label">Image</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="imgID"
              name="imgID"
              value={formik.values.imgID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.imgID && Boolean(formik.errors.imgID)}
              helperText={formik.touched.imgID && formik.errors.imgID}
            >
              {imgs.map((img) => (
                <MenuItem key={img.imgID} value={img.imgID}>
                  {img.imgName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
              onClick={() => navigate("/Classes")}
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
