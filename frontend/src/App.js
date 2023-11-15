import "./App.scss";
import React, { useState, useEffect } from "react";
import { SideNavigation } from "./container/SideNavigation";
import { NewRentalPage } from "./container/NewRentalPage";
import { Welcome } from "./container/Welcome";
import { ConsultHousingContainer } from "./container/ConsultHousingContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContext from "./context/UserContext";
import { SignIn } from "./component/SignIn";
import { SignUpPage } from "./container/SignUpPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      const json = JSON.parse(data);
      setIsAuthenticated(json.isAuthenticated);
      setName(json.name);
      setUserType(json.type);
    }
  }, []);

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          isAuthenticated,
          setIsAuthenticated,
          name,
          setName,
          userType,
          setUserType
        }}
      >
        <SideNavigation />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Welcome />} />
            <Route exact path="/rentalapplication" element={<NewRentalPage />} />
            <Route
              exact
              path="/consulthousing"
              element={<ConsultHousingContainer />}
            />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
