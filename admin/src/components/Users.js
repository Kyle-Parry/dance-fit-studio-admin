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

export default function UserPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/users");
        if (response && response.data) setUsers(response.data);
      } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    };
    fetchUsers();
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
          <Typography variant="h3">Users</Typography>
          <Button size="small">
            <Link
              style={{ textDecoration: "inherit", color: "inherit" }}
              to={`/CreateUser`}
            >
              Create User
            </Link>
          </Button>
          {users.map((user) => (
            <Card
              variant="outlined"
              key={user.userId}
              sx={{ minWidth: 275, margin: "10px" }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {user.userId}
                </Typography>
                <Typography variant="h5" component="div"></Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {user.email}
                </Typography>
                <Typography variant="body2">
                  {user.firstName} {user.lastName}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">
                  <Link
                    style={{ textDecoration: "inherit", color: "inherit" }}
                    to={`/UpdateUser/${user.userId}`}
                  >
                    Update User
                  </Link>
                </Button>
              </CardActions>
              <CardActions>
                <Button size="small">
                  <Link
                    style={{ textDecoration: "inherit", color: "inherit" }}
                    to={`/DeleteUser/${user.userId}`}
                  >
                    Delete User
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
