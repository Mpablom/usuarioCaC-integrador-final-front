// App.tsx (o donde configures tus rutas)
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Login from './components/Login'; // Componente de inicio de sesión
import UsuariosTable from './components/UsuariosTable'; // Componente de la tabla de usuarios

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/usuarios" element={<UsuariosTable />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
