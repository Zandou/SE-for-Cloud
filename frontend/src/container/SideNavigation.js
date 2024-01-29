import React from "react";
import {
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
  SideNavLink,
  HeaderContainer,
  Header,
  HeaderMenuButton,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderName,
} from "@carbon/react";
import { useContext, useState, useEffect } from "react";
import { Fade, UserFollow, Hotel, Purchase, ShoppingCart, Login, Logout } from '@carbon/icons-react';
import UserContext from "../context/UserContext";


var route = [
  {
    href: "rentalapplication",
    title: "Nouvelle demande de location",
    renderIcon: UserFollow,
  },
  {
    href: "consulthousing",
    title: "Consulter Logement",
    renderIcon: Hotel,
  }
]



const str = window.location.href;
var path = str.split("/");
var lastpath = path[path.length - 1];

const HeaderTools = (isAuthenticated, name) => {
  if (isAuthenticated) {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", margin: "auto", paddingRight: "16px" }}>
          {name}
        </div>
      </div>
    );
  } else {
    return (
      <HeaderGlobalAction aria-label="Connexion" href="/signin">
        <Login size={20} />
      </HeaderGlobalAction>
    );
  }
};

const SignOut = () => {
  alert("Vous avez été déconnecté ! ");
  localStorage.setItem(
    "userData",
    JSON.stringify({ isAuthenticated: false, name: "" })
  );
};


export const SideNavigation = () => {
  const { isAuthenticated, name, userType } = useContext(UserContext);
  const [userData, setUserdata] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('userData'));
    setUserdata(items);
  }, []);

  console.log(userType);

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="Retour à l'accueil">
            <HeaderMenuButton
              aria-label="Ouvrir le menu"
              isCollapsible
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <HeaderName href="/" prefix="">
              <img
                src={window.location.origin + "/images/logo.png"}
                alt="RBeeNBee"
                width="90%"
              />
            </HeaderName>
            <HeaderGlobalBar>
              {HeaderTools(isAuthenticated, name, open, setOpen)}
            </HeaderGlobalBar>
            <SideNav
              aria-label="Brocante"
              isRail
              expanded={isSideNavExpanded}
              onOverlayClick={onClickSideNavExpand}
            >
              <SideNavItems>
                {route.map((item) => {
                  if (lastpath == item.href)
                    return (<SideNavLink href={"/" + item.href} title={item.title} renderIcon={item.renderIcon} aria-current="page"> {item.title} </SideNavLink>);
                  else
                    return (<SideNavLink href={"/" + item.href} title={item.title} renderIcon={item.renderIcon}> {item.title} </SideNavLink>);
                })}
              </SideNavItems>
            </SideNav>
          </Header>
        </>
      )}
    />
  );
};
