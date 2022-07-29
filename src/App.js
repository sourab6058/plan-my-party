import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import HomePage from "./Components/HomePage";
import LoginForm from "./Components/LoginForm";
import Main from "./Components/Register/Main";
import NavBar from "./Components/NavBar";
import AddPackage from "./Components/Package/AddPackage";
import AboutUs from "./Components/AboutUs";
import Footer from "./Components/HomePage/Footer";
import SellerChat from "./Components/SellerChat";
import ClientChat from "./Components/ClientChat";
import PackagesPage from "./Components/Package/PackagesPage";

function App() {
  const [bgColor, setBgColor] = useState(null);
  const [fontColor, setFontColor] = useState("white");
  const [navPosition, setNavPosition] = useState("relative");
  function handleScroll(event) {
    if (window.scrollY !== 0) {
      setBgColor("#fff");
      setFontColor("#524A4E");
    } else {
      setBgColor("transparent");
      setFontColor("white");
    }
  }
  useEffect(() => {
    console.log(window.location);
    if (window.location.pathname !== "/") {
      setBgColor("white");
      setFontColor("#524A4E");
      setNavPosition("relative");
    } else {
      window.addEventListener("scroll", handleScroll);
      setNavPosition("fixed");
      return () => {
        window.removeEventListener("scroll", this);
      };
    }
  }, [window.location.href]);

  return (
    <>
      <NavBar
        bgColor={bgColor}
        fontColor={fontColor}
        style={{ position: navPosition }}
      />
      <Routes>
        <Route path="/login" element={<LoginForm />} exact />
        <Route path="/register" element={<Main />} exact />
        <Route path="/add-package" element={<AddPackage />} exact />
        <Route path="/packages" element={<PackagesPage />} exact />
        <Route path="/aboutus" element={<AboutUs />} exact />
        <Route path="/seller-chat" element={<SellerChat />} exact />
        <Route path="/client-chat" element={<ClientChat />} exact />
        <Route path="/" element={<HomePage />} exact />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
