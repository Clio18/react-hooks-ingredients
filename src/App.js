import React, { useContext } from "react";

import Ingredients from "./components/Ingredients/Ingredients";
import { AuthContext } from "./context/auth-context";
import Auth from "./components/Auth.js";

const App = (props) => {
  const auth = useContext(AuthContext);

  let component = <Auth />;

  if (auth.isAuth) {
    component = <Ingredients />;
  }

  return component;
};

export default App;
