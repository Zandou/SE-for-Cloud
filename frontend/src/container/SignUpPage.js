import React from "react";
import styled from "styled-components";
import { SignUp } from "../component/SignUp";

const Wrapper = styled.div`
    padding-top : 48px;`;

const Container = styled.div`
    display:flex;
    align-item: center;
    justify-content: center;
    padding-top : 48px;`;

export const SignUpPage = () => {
    return (
        <div>
            <Wrapper />
            <Container>
                <SignUp />
            </Container>
        </div>
    );
}