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
import Home from './pages/Home';
import Setup from './pages/Setup';

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
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </Container>
          </Router>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}
