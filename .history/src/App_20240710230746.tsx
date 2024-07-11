import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Login from './components/Login';
import UsuariosTable from './components/UsuariosTable'; 

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" Component={Login} />
        <Route path="/usuarios" Component={UsuariosTable} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
};

export default App;
