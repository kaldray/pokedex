import { Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./styles";
import * as Pages from "./pages";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Pages.SignIn />}></Route>
        <Route path="/Home" element={<Pages.Home />}></Route>
        <Route path="*" element={<Pages.SignIn />}></Route>
      </Routes>
    </>
  );
}

export default App;
