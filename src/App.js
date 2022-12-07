import logo from "./logo.svg";
import "./App.css";
import Addproduct from "./pages/Addproduct";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/addproduct" element={<Addproduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
