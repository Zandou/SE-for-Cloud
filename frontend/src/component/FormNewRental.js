import React, { useState } from "react";
import { Form, Stack, Select, TextArea, SelectItem, Button, TextInput, DatePicker, DatePickerInput, NumberInput } from "@carbon/react";
import Axios from "axios";

const post = async (adresse, dateDispo, Etat, nbPieces, nbSurfaces, nomProprietaire, prenomProprietaire, prix, type, ville) => {
    Axios.post(process.env.REACT_APP_LOGEMENT_URL + "/logement", { //localhost:8080
        adresse, dateDispo, Etat, nbPieces, nbSurfaces, nomProprietaire, prenomProprietaire, prix, type, ville
    })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
};


const handleSubmit = (e) => {
    post(e.adresse, e.dateDispo, e.Etat, e.nbPieces, e.nbSurfaces, e.nomProprietaire, e.prenomProprietaire, e.prix, e.type, e.ville);
}


export const FormNewRental = () => {
    const [location, setLocation] = useState({
        type: "Appartement",
        nbPieces: "0",
        nbSurfaces: "0",
        Etat: "Neuf",
        adresse: "",
        nomProprietaire: "",
        prenomProprietaire: "",
        prix: "0",
        dateDispo: "",
        ville: ""
    });

    const handleChange = evt => {
        const name = evt.target.id;
        const value = evt.target.value;
        setLocation({
            ...location,
            [name]: value
        })
    }

    return (
        <div>
            <Form>
                <Stack gap={7}>
                    <h1>Formulaire de renseignement pour un logement</h1>
                    <TextInput
                        helperText="(20 caractères maximum)"
                        id="nomProprietaire"
                        invalidText="Invalid error message."
                        placeholder="Nom du propriétaire"
                        labelText="Nom du propriétaire"
                        onChange={handleChange}
                        value={location.nomProprietaire}
                    />
                    <TextInput
                        helperText="(20 caractères maximum)"
                        id="prenomProprietaire"
                        invalidText="Invalid error message."
                        placeholder="Prénom du propriétaire"
                        labelText="Prénom du propriétaire"
                        onChange={handleChange}
                        value={location.prenomProprietaire}
                    />
                    <TextInput
                        helperText="(20 caractères maximum)"
                        id="adresse"
                        invalidText="Invalid error message."
                        placeholder="Adresse du logement"
                        labelText="Adresse du logement"
                        onChange={handleChange}
                        value={location.adresse}
                    />
                    <div className="container">
                        <TextInput
                            helperText="(20 caractères maximum)"
                            id="ville"
                            invalidText="Invalid error message."
                            placeholder="Ville du logement"
                            labelText="Ville du logement"
                            onChange={handleChange}
                            value={location.ville}
                        />
                        <NumberInput
                            id="nbPieces"
                            min={0}
                            max={100}
                            label="Nombre de pièces"
                            invalidText="Le nombre n'est pas valide"
                            onChange={handleChange}
                            value={location.nbPieces}
                        />
                    </div>
                    <div className="container">
                        <NumberInput
                            id="nbSurfaces"
                            min={0}
                            max={50000}
                            label="Surface en m²"
                            invalidText="Le nombre n'est pas valide"
                            onChange={handleChange}
                            value={location.nbSurfaces}
                        />
                        <Select
                            id="type"
                            invalidText="This is an invalid error message."
                            labelText="Type du logement"
                            onChange={handleChange}
                            value={location.type}
                        >
                            <SelectItem
                                text="Appartement"
                                value="Appartement"
                            />
                            <SelectItem
                                text="Maison"
                                value="Maison"
                            />
                            <SelectItem
                                text="Pavillon"
                                value="Pavillon"
                            />
                        </Select>
                    </div>
                    <div className="container">
                        <DatePicker datePickerType="single" style={{ textAlign: "left" }} dateFormat='Y-m-d'>
                            <DatePickerInput
                                placeholder="jj-mm-aaaa"
                                labelText="Date de disponibilité"
                                id="dateDispo"
                                type="date"
                                onChange={handleChange}
                                onClick={handleChange}
                                value={location.dateDispo}
                            />
                        </DatePicker>
                        <Select
                            id="Etat"
                            invalidText="This is an invalid error message."
                            labelText="Etat du logement"
                            onChange={handleChange}
                            value={location.Etat}
                        >
                            <SelectItem
                                text="Neuf"
                                value="Neuf"
                            />
                            <SelectItem
                                text="Bon état"
                                value="Bon état"
                            />
                            <SelectItem
                                text="Bon"
                                value="Bon"
                            />
                            <SelectItem
                                text="Mauvais état"
                                value="Mauvais état"
                            />
                        </Select>
                    </div>
                    <div className="container">
                        <NumberInput
                            id="prix"
                            min={0}
                            max={9999999999}
                            label="Prix du logement"
                            invalidText="Le nombre n'est pas valide"
                            onChange={handleChange}
                            value={location.prix}
                        />
                    </div>
                    <Button
                        kind="primary"
                        tabIndex={0}
                        onClick={() => handleSubmit(location)}
                    >
                        Soumettre
                    </Button>
                </Stack>
            </Form>

        </div>
    );
}