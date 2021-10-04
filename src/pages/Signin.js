import { useContext, useState, useEffect } from "react";
import "firebase/auth";
import { AuthWithGoogle, onAuth } from "../services/auth";
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
    background-image: url("./img/go.png");
    display: inline-block;
    vertical-align: middle;
    width: 42px;
    height: 42px;
  }
  span.buttonText {
    display: inline-block;
    vertical-align: middle;
    padding-left: 42px;
    padding-right: 42px;
    font-size: 14px;
    font-weight: bold;
    /* font-family: "Roboto", sans-serif; */
  }

  &:hover {
    cursor: pointer;
  }
  img {
    height: 42px;
    width: 42px;
  }
`;

const Signin = () => {
  return (
    <>
      <Navbar></Navbar>
      <Main>
        <SignButton onClick={AuthWithGoogle}>
          <span class="label">Sign in with : </span>

          <div id="customBtn" class="customGPlusSignIn">
            <span class="icon">
              {" "}
              <img src="./img/go.png"></img>{" "}
            </span>
            <span class="buttonText">Google</span>
          </div>
        </SignButton>
      </Main>
    </>
  );
};

export default Signin;
