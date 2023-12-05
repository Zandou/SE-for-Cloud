import React, { useContext, useEffect, useMemo, useState } from "react";
import { FetchAPI } from "./FetchAPI";
import { ClickableTile, Modal, DatePicker, DatePickerInput, Select, Loading, NumberInput, SelectItem, TextInput, Button } from "@carbon/react";
import UserContext from "../context/UserContext";
import Axios from "axios";
import styled from "styled-components";
import { Filter, CurrencyDollar, Building } from "@carbon/icons-react";

const Wrapper = styled.div`
    padding-top : 48px;
`


const LogementContainer = styled.div`
    display:flex;
`
const FilterContainer = styled.div`
    padding: 1rem;
    display:inline;
    justify-content:left;
    width:auto;
    height:auto;
`


const renderConsultHouse = (loading, setLoading, logementResponse, setLogementResponse, logementCode, setLogCode, logementType, setLogementType, prix, setPrix, villeValue, setVilleValue, selectedLogement, setSelectedLogement, openLogement, setOpenLogement, openDemande, setOpenDemande, visite, setVisite, isAuthenticated, name) => {
    if (loading, !logementResponse) {
        return (<div><Loading description='Chargement des logements...' withOverlay={false} style={{ display: 'block', position: 'fixed', top: '50%', left: '50%' }} /></div>)
    }


    const handleChangePrix = evt => {
        console.log(prix);
        const name = evt.target.id;
        const value = evt.target.value;
        setPrix({
            ...prix,
            [name]: value
        })
    }

    const handleChangeVisite = (evt) => {

        console.log(visite);
        const name = evt.target.id;
        const value = evt.target.value;
        setVisite({
            ...visite,
            [name]: value
        });
    };

    
    const handleChangeVille = (evt) => {
        setVilleValue(evt.target.value);
    }

    const postPriceFilter = async (prixMin, prixMax) => {
        Axios.get(REACT_APP_LOGEMENT_URL + "/logement/logements/prix?prixMax=" + prixMax + "&prixMin=" + prixMin)
            .then((response) => { setLogementResponse(response.data) }).catch((error) => console.log(error));
        setLoading(false);
    };

    
    const postCityFilter = async (value) => {
        Axios.get(REACT_APP_LOGEMENT_URL + "/logement/logements/ville/" + value)
            .then((response) => { setLogementResponse(response.data) }).catch((error) => console.log(error));
        setLoading(false);
    };

    const postVisite = async (dateDebut, duree, idLocataire, idLogement) => {
        Axios.post(REACT_APP_RESERVATION_URL + "/reservation/ask", { //localhost:9090
            dateDebut ,
            duree,
            idLocataire,
            idLogement
        })
            .then((response) => { alert("Merci de votre réservation pour le " + response.data.dateDebut) }).catch((error) => console.log(error));
        setLoading(false);
    };

    const handleSubmitPrix = () => {
        setLoading(true);
        postPriceFilter(prix.prixMin, prix.prixMax);
    };


    const handleSubmitCity = () => {
        setLoading(true);
        postCityFilter(villeValue);
    };

    const handleSubmitVisite = () => {
        console.log(visite);
        postVisite(visite.dateVisite,visite.duree, visite.id_locataire, visite.id_logement);
    };

    const logementModal = () => {
        const array = Object.values(selectedLogement);
        const arrayText = [
            "Code",
            "Type",
            "Nombre de pièces",
            "Surface en m²",
            "Etat",
            "Adresse",
            "Nom du Propriétaire",
            "Prénom du Propriétaire",
            "Prix (€)",
            "Date de disponibilité",
            "Ville"
        ]

        return (
            <Modal
                className="logementModal"
                open={openLogement}
                modalHeading={"Consultation de Logement de l'adresse : " + selectedLogement.adresse + " , " + selectedLogement.ville}
                primaryButtonText="Plannifier une location"
                secondaryButtonText="Fermer"
                onRequestSubmit={() => { setOpenDemande(true); setOpenLogement(false); setVisite({ ...visite, ["id_logement"]: selectedLogement.code }) }}
                onRequestClose={() => { setOpenLogement(false) }}
            >
                {array.map((obj, index) => {
                    return (<div className="modalText">{arrayText[index] + " : " + obj}</div>)
                })}
            </Modal>
        )
    }

    const demandeModal = () => {
        return (
            <Modal
                className="demandeModal"
                open={openDemande}
                modalHeading={"Planifier une visite à l'adresse : " + selectedLogement.adresse + " , " + selectedLogement.ville}
                primaryButtonText="Confirmer"
                secondaryButtonText="Fermer"
                onRequestSubmit={() => { handleSubmitVisite() }}
                onRequestClose={() => { setOpenDemande(false); }}
            >
                <div className="container">
                    <DatePicker datePickerType="single" style={{ textAlign: "left" }} dateFormat='Y-m-d'>
                        <DatePickerInput
                            placeholder="jj-mm-aaaa"
                            labelText="Date de la visite"
                            id="dateVisite"
                            type="date"
                            onChange={handleChangeVisite}
                            onClick={handleChangeVisite}
                            value={visite.dateVisite}
                        />
                    </DatePicker>
                    <TextInput
                    id="duree"
                    invalidText="Invalid error message."
                    placeholder="0"
                    labelText="Durée du séjour"
                    onChange={handleChangeVisite}
                    value={visite.duree}>

                </TextInput>

                </div>

            </Modal>
        )
    }


    return (<Wrapper>
        {logementModal()}
        {demandeModal()}
        <div style={{ display: "flex" }}>
            <FilterContainer>
                <Select
                    id="type"
                    invalidText="This is an invalid error message."
                    labelText="Filtrer les types de logement"
                    onChange={(e) => setLogementType(e.target.value)}
                    value={logementType}
                    style={{ width: "auto" }}
                >
                    <SelectItem text="Appartement" value="Appartement" />
                    <SelectItem text="Pavillon" value="Pavillon" />
                    <SelectItem text="Maison" value="Maison" />
                </Select>

            </FilterContainer>
            <FilterContainer>
                <TextInput
                    id="prixMin"
                    invalidText="Invalid error message."
                    placeholder="0"
                    labelText="Prix Min"
                    onChange={handleChangePrix}
                    value={prix.prixMin}>

                </TextInput>
                <TextInput
                    id="prixMax"
                    invalidText="Invalid error message."
                    placeholder="0"
                    labelText="Prix Max"
                    onChange={handleChangePrix}
                    value={prix.prixMax}>

                </TextInput>
            </FilterContainer>

            <FilterContainer>
                <Button
                    kind="primary"
                    style={{ marginTop: "1rem" }}
                    onClick={() => handleSubmitPrix()}
                >
                    <CurrencyDollar />
                </Button>
            </FilterContainer>

            <FilterContainer>
                <TextInput
                    id="villeValue"
                    invalidText="Invalid error message."
                    placeholder="Paris"
                    labelText="Ville de votre choix"
                    onChange={handleChangeVille}
                    value={villeValue}>

                </TextInput>
            </FilterContainer>
            <FilterContainer>
                <Button
                    kind="primary"
                    style={{ marginTop: "1rem" }}
                    onClick={() => handleSubmitCity()}
                >
                    <Building />
                </Button>
            </FilterContainer>
        </div>
        <LogementContainer>
            {logementResponse.map((l) => {
                return (<ClickableTile style={{ margin: "1rem" }} onClick={() => {
                    setLogCode(l.code);
                    setOpenLogement(true);
                    setSelectedLogement(logementResponse.find((obj) => {
                        if (obj.code == l.code)
                            return obj;
                    }));
                }}>
                    {Object.keys(l).map(att => {
                        if (att == "dateDispo")
                            return (<div className="tileText">{att.charAt(0).toUpperCase() + att.slice(1) + " : " + l[att].slice(0, 10)}<br /></div>)
                        else if (att == "type" || att == "etat" || att == "prix" || att == "ville" || att == "nbPieces" || att == "adresse" || att == "nbSurfaces")
                            return (<div className="tileText">{att.charAt(0).toUpperCase() + att.slice(1) + " : " + l[att]}<br /></div>);
                    })}
                </ClickableTile >);
            })}
        </LogementContainer>
    </Wrapper>);
}

export const ConsultHouse = () => {
    const [loading, setLoading] = useState(true);
    const [logementResponse, setLogementResponse] = useState();
    const [logementType, setLogementType] = useState("Pavillon");
    const [logementCode, setLogCode] = useState();
    const [selectedLogement, setSelectedLogement] = useState(1);
    const [openLogement, setOpenLogement] = useState(false);
    const [openDemande, setOpenDemande] = useState(false);
    const [prix, setPrix] = useState({
        prixMin: "",
        prixMax: ""
    });
    const [villeValue, setVilleValue] = useState("Paris");
    const items = JSON.parse(localStorage.getItem('userData'));
    const [visite, setVisite] = useState({
        id_locataire: items.id || "",
        id_logement: "",
        dateVisite: "",
        duree: "0"
    });

    const { isAuthenticated, name, userType } = useContext(UserContext);

    const ConsultHouseContent = useMemo(() => renderConsultHouse(loading, setLoading, logementResponse, setLogementResponse, logementCode, setLogCode, logementType, setLogementType, prix, setPrix, villeValue, setVilleValue, selectedLogement, setSelectedLogement, openLogement, setOpenLogement, openDemande, setOpenDemande, visite, setVisite, isAuthenticated, name),
        [loading, logementResponse, selectedLogement, openLogement, openDemande, visite, logementType, prix, villeValue]);

    useEffect(() => {
        Axios.get("http://localhost:8080/logement/logements/type/" + logementType)
            .then((response) => setLogementResponse(response.data))
            .catch((error) => console.log(error));
    }, [logementType]);



    useEffect(() => {
        if (logementResponse)
            setLoading(false);
        console.log(logementResponse);
    }, [logementResponse]);

    return (<div>{ConsultHouseContent}</div>)

}