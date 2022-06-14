import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./components/Navbar";
import LoginPage from "./components/Login";
import UserPage from "./components/Users";
import ClassPage from "./components/Classes";

import AuthContext from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import UpdateUserPage from "./components/UpdateUser";
import DeleteUserPage from "./components/DeleteUser";
import CreateClassPage from "./components/CreateClass";
import DeleteClassPage from "./components/DeleteClass";
import UpdateClassPage from "./components/UpdateClass";
import CreateUserPage from "./components/CreateUser";

function App() {
  const [auth, setAuth] = useState({ loggedIn: false });

  return (
    <div className="App">
      <AuthContext.Provider value={{ auth, setAuth }}>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="Users" element={<UserPage />} />
            <Route path="UpdateUser/:userId" element={<UpdateUserPage />} />
            <Route path="DeleteUser/:userId" element={<DeleteUserPage />} />
            <Route path="CreateUser" element={<CreateUserPage />} />
            <Route path="Classes" element={<ClassPage />} />
            <Route path="UpdateClass/:classID" element={<UpdateClassPage />} />
            <Route path="DeleteClass/:classID" element={<DeleteClassPage />} />
            <Route path="CreateClass" element={<CreateClassPage />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
