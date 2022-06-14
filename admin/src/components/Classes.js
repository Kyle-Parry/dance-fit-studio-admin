import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ClassPage() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/classes");
        if (response && response.data) setClasses(response.data);
      } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    };
    fetchClasses();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            bgcolor: "#cfe8fc",
            minHeight: "85vh",
            marginTop: "0%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">Classes</Typography>
          <Button size="small">
            <Link
              to="/CreateClass"
              style={{ textDecoration: "inherit", color: "inherit" }}
            >
              Create Class
            </Link>
          </Button>
          {classes.map((clas) => (
            <Card
              variant="outlined"
              key={clas.classID}
              sx={{ minWidth: 275, margin: "10px" }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {clas.classType}
                </Typography>
                <Typography variant="h5" component="div"></Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {clas.date}, {clas.time}
                </Typography>
                <Typography variant="body2">{clas.Description}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">
                  <Link
                    style={{ textDecoration: "inherit", color: "inherit" }}
                    to={`/UpdateClass/${clas.classID}`}
                  >
                    Update Class
                  </Link>
                </Button>
              </CardActions>
              <CardActions>
                <Button size="small">
                  <Link
                    style={{ textDecoration: "inherit", color: "inherit" }}
                    to={`/DeleteClass/${clas.classID}`}
                  >
                    Delete Class
                  </Link>
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </React.Fragment>
  );
}
