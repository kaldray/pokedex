import { Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./styles/reset";
import Home from "./pages/Home";
import Signin from "./pages/Signin";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Signin />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="*" element={<Signin />}></Route>
      </Routes>
    </>
  );
}

export default App;
