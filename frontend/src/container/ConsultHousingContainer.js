import React from "react";
import styled from "styled-components";
import { ConsultHouse } from "./ConsultHouse";

const Wrapper = styled.div`
    padding-top : 48px;`;

const Container = styled.div`
    display:flex;
    align-item: center;
    justify-content: center;
    padding-top : 48px;`;

export const ConsultHousingContainer = () => {
    return (
        <div>
            <Wrapper />
            <Container>
                <ConsultHouse />
            </Container>
        </div>
    );
}