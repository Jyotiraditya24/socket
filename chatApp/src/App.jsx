import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />\
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
