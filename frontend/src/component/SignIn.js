import React, { useContext, useState } from "react";
import styled from "styled-components";
import {
  Form,
  Stack,
  Button,
  TextInput,
  Select,
  SelectItem,
} from "@carbon/react";
import PropTypes from "prop-types";
import Axios from "axios";
import UserContext from "../context/UserContext";

const Wrapper = styled.div`
  padding-top: 48px;
`;

const Container = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
  padding-top: 48px;
`;

const login = async (email, password, setAuthenticated, setName, setUserType, type) => {
  console.log(email + password);
  Axios.get(
    REACT_APP_USER_URL + "/users/" + type + "/" + email + "/" + password //localhost:8888
  ).then((response) => {
    console.log(response);
    setAuthenticated(true);
    setName(email);
    setUserType(type);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        isAuthenticated: true,
        name: email,
        id: response.data.id,
        userType: type,
      })
    );
    alert("Bienvenue M/Mme " + response.data.nom);
  }).catch((error) => {alert("Veuillez vérifier votre identifiant et mot de passe")});
};

export const SignIn = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [type, setType] = useState("locataire");
  const { setIsAuthenticated, setName, setUserType } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password, setIsAuthenticated, setName, setUserType, type);
  };

  return (
    <Wrapper>
      <Container>
        <div style={{ width: "40vw" }}>
          <Form onSubmit={handleSubmit}>
            <Stack gap={7}>
              <h1>Connexion</h1>
              <TextInput
                id="pseudo"
                invalidText="Invalid error message."
                placeholder="Email"
                labelText="Email"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <TextInput
                id="mdp"
                invalidText="Invalid error message."
                placeholder="Mot de passe"
                labelText="Mot de passe"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <Select
                id="type"
                invalidText="This is an invalid error message."
                labelText="Vous êtes ?"
                onChange={(e) => setType(e.target.value)}
                value={type}
              >
                <SelectItem text="Un locataire" value="locataire" />
                <SelectItem text="Un propriétaire" value="proprietaire" />
              </Select>
              <Button kind="primary" type="Submit" tabIndex={0}>
                Connexion
              </Button>
            </Stack>
          </Form>
        </div>
      </Container>
      <a href="/signup">Pas de compte ? Inscrivez vous !</a>
    </Wrapper>
  );
};

SignIn.propTypes = {
  setToken: PropTypes.func.isRequired,
};
