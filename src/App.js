import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import LoginForm from "./Components/LoginForm";
import Main from "./Components/Register/Main";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Main />} />
          <Route path="/" element={<h1>Home Page</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
