import React from "react";
import styled from "styled-components";
import { FormNewRental } from "../component/FormNewRental";

const Wrapper = styled.div`
    padding-top : 48px;`;

const Container = styled.div`
    display:flex;
    align-item: center;
    justify-content: center;
    padding-top : 48px;`;

export const NewRentalPage = () => {
    return (
        <div>
            <Wrapper />
            <Container>
                <FormNewRental />
            </Container>
        </div>
    );
}