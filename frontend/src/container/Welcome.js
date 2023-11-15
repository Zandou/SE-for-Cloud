import React from "react";
import styled from "styled-components";
import WelcomeImg from "../assets/WelcomeImg.jpg"

const Wrapper = styled.div`
    padding-top : 48px;`;

const Container = styled.div`
    display:flex;
    align-item: center;
    justify-content: center;
    
    padding-top : 48px;`;


const Space = styled.div`
    display:flex;
    align-item: center;
    justify-content: center;
   
    padding-top : 100px;`;

export const Welcome = () => {
    return (
        <div>
            <Wrapper />
            <h1>Bienvenue sur RBeeNBee</h1>
            <p>Faites de vos envies une réalité</p>
            <img src={WelcomeImg} style={{width:"80%", height:"20%", paddingTop: "12px", borderRadius:"24px"}}/>
        </div>

    );
}
