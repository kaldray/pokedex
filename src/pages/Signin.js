import firebase from "firebase";
import Navbar from "../components/Navbar";
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 10vh;
  justify-content: center;
  align-items: center;
`;

const SignButton = styled.div`
  background: none;

  #customBtn {
    display: inline-block;
    background: white;
    color: #444;
    width: 190px;
    border-radius: 5px;
    border: thin solid #888;
    box-shadow: 1px 1px 1px grey;
    white-space: nowrap;
  }
  #customBtn:hover {
    cursor: pointer;
  }
  span.label {
    font-family: serif;
    font-weight: normal;
  }
  span.icon {
    display: inline-block;
    vertical-align: middle;
  }
  span.buttonText {
    display: inline-block;
    vertical-align: middle;
    padding-left: 42px;
    padding-right: 42px;
    font-size: 14px;
    font-weight: bold;
  }

  &:hover {
    cursor: pointer;
  }
  img {
    height: 42px;
    width: 42px;
    @media (max-width: 768px) {
      width: 21px;
      height: 21px;
    }
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;

  h1 {
  }
`;

const Signin = () => {
  //Log to acces to Home with all pokemon Data
  const AuthWithGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {})
      .catch((error) => {
        if (error) {
          throw new Error("error");
        }
      });
  };
  return (
    <>
      <Navbar></Navbar>
      <Main>
        <Section>
          <h1>Venez créer votre équipe de rêve !</h1>
        </Section>
        <SignButton onClick={AuthWithGoogle}>
          <span className="label">Log in with : </span>

          <div id="customBtn" className="customGPlusSignIn">
            <span className="icon">
              {" "}
              <img src="./img/go.png" alt="pokeball"></img>{" "}
            </span>
            <span className="buttonText">Google</span>
          </div>
        </SignButton>
      </Main>
    </>
  );
};

export default Signin;
