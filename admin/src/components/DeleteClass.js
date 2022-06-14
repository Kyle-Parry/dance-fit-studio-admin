import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";

export default function DeleteClassPage() {
  const { classID } = useParams();
  const navigate = useNavigate();

  const deleteClass = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:8080/admin/deleteClass",

        data: { classID: classID },
      }).then((response) => {
        navigate("../Classes", { replace: true });
        console.log(classID);
      });
    } catch (error) {
      if (!error.response) {
        console.log("No Server Response");
      } else if (error.response?.status === 401) {
        console.log("Unauthorized");
      } else {
        console.log("Delete Failed");
      }
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={deleteClass}
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
            id="classID"
            label="classID"
            value={classID}
            readOnly
            sx={{ visibility: "hidden" }}
          />
          <div
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button type="submit" variant="contained" sx={{ margin: "20px" }}>
              Delete
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("../Classes", { replace: true })}
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
