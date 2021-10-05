import { Switch, Route, Redirect } from "react-router-dom";
import { GlobalStyle } from "./styles/reset";
import Home from "./pages/Home";
import Signin from "./pages/Signin";

function App() {
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={Signin}></Route>
        <Route path="/Home" component={Home}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    </>
  );
}

export default App;
