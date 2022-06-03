import { Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import HomePage from "./Components/HomePage";
import LoginForm from "./Components/LoginForm";
import Main from "./Components/Register/Main";
import NavBar from "./Components/NavBar";
import AddPackage from "./Components/Package/AddPackage";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginForm />} exact />
        <Route path="/register" element={<Main />} exact />
        <Route path="/add-package" element={<AddPackage />} exact />
        <Route path="/" element={<HomePage />} exact />
      </Routes>
    </>
  );
}

export default App;
