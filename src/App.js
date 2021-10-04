import { UserContextProvider } from "./context/authentification";
import { Switch, Route, Redirect } from "react-router-dom";
import { GlobalStyle } from "./styles/reset";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
// import firebase, { FirebaseContext } from "./context";

function App() {
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={Signin}></Route>
        <Route exact path="/Home" component={Home}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    </>
  );
}

export default App;
