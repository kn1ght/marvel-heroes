import React from "react";
import { LangCodes, LocaleContext } from "@skbkontur/react-ui";
import {
  BrowserRouter as Router, Redirect, Route, Switch
} from "react-router-dom";
import { Header } from "./components";
import { Character, CharacterList } from "./pages";
import "./index.css";

export const App = () => {
  return (
    <div className="root">
      <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Redirect to="/characters" />
            </Route>
            <Route path="/characters/:id">
              <Character />
            </Route>
            <Route path="/characters">
              <CharacterList />
            </Route>
          </Switch>
        </Router>
      </LocaleContext.Provider>
    </div>
  );
};
