import React from "react";
import { Provider } from "react-redux";

import Main from "./Main";
import store from "../redux/configureStore";

function App() {
  return (
    // provider 'embrulha' a aplicação e assim podemos acessar todos os reducers
    // passamos a store configurada e está sendo exportada do configureStore
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
