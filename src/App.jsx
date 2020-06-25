import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import ThemeProvider from './components/Theme';
import Container from './components/Container';
import Setup from './pages/Setup';
import Rcp from './pages/Rcp';
import Apv from './pages/Apv';
import Cdv from './pages/Cdv';

export default function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider>
          <Router>
            <Container>
              <Switch>
                <Route path="/setup">
                  <Setup />
                </Route>
                <Route path="/apv">
                  <Apv />
                </Route>
                <Route path="/cdv">
                  <Cdv />
                </Route>
                <Route path="/">
                  <Rcp />
                </Route>
              </Switch>
            </Container>
          </Router>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}
