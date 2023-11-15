import React, { useState } from "react";
import {
  Form,
  Stack,
  Button,
  TextInput,
  Select,
  SelectItem,
} from "@carbon/react";
import Axios from "axios";

const post = async (nom, email, telephone, mot_de_passe, type) => {
  Axios.post("http://localhost:8888/users/" + type, {
    id: 0,
    nom,
    email,
    telephone,
    mot_de_passe,
  })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

const handleSubmit = (e, type) => {
  post(e.nom, e.email, e.telephone, e.mot_de_passe, type);
};

export const SignUp = () => {
  const [user, setUser] = useState({
    id: 0,
    nom: "",
    email: "",
    telephone: "",
    mot_de_passe: "",
  });

  const [type, setType] = useState("locataire");

  const handleChange = (evt) => {
    const name = evt.target.id;
    const value = evt.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div style={{ width: "40vw" }}>
      <Form>
        <Stack gap={7}>
          <h1>Formulaire d'inscription</h1>
          <TextInput
            id="nom"
            invalidText="Invalid error message."
            placeholder="Nom"
            labelText="Nom"
            onChange={handleChange}
            value={user.nom}
          />
          <TextInput
            id="email"
            invalidText="Invalid error message."
            placeholder="Email"
            labelText="Votre Email"
            onChange={handleChange}
            value={user.email}
          />
          <TextInput
            id="mot_de_passe"
            invalidText="Invalid error message."
            placeholder="Mot de Passe"
            labelText="Mot de Passe"
            type="password"
            onChange={handleChange}
            value={user.mot_de_passe}
          />
          <TextInput
            id="telephone"
            invalidText="Invalid error message."
            placeholder="Téléphone"
            labelText="Votre numéro de téléphone"
            onChange={handleChange}
            value={user.telephone}
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
          <Button
            kind="primary"
            tabIndex={0}
            onClick={() => {
              handleSubmit(user, type);
              console.log(user);
            }}
          >
            Soumettre
          </Button>
        </Stack>
      </Form>
    </div>
  );
};
