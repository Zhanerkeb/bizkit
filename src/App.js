import React from 'react';
import Signin from "./containers/signin";
import Dashboard from "./containers/dashboard";
import './App.css';
import 'antd/dist/antd.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { ruRU } from '@material-ui/core/locale';
import {Provider} from "react-redux";
import configureStore from './store';
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from 'jwt-decode';
import * as types from "./actions/types";
const store = configureStore();
if (localStorage.token) {
    setAuthToken(localStorage.token);
    const decoded = jwt_decode(localStorage.token);
    store.dispatch({type: types.SET_CURRENT_USER, payload: decoded});
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        localStorage.removeItem(`token`);
        setAuthToken(false);
        store.dispatch({type: types.SET_CURRENT_USER, payload: {}});
        window.location.href = `/`;
    }
}
const outerTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#007BFF",
    },
  },
}, ruRU);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <ThemeProvider theme={outerTheme}>
            <Route exact path={'/'} component={Signin}/>
            <Route  path={'/dashboard'} component={Dashboard}/>
          </ThemeProvider>
        </Switch>
      </Router>
    </Provider>
   
  );
}

export default App;
