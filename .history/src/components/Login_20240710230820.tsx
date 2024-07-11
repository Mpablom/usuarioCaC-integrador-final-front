import { Button, Container, TextField, Typography } from '@mui/material';
import { login } from '../axios/UsuarioApi';
import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    //const navigate = useNavigate();
    const handleLogin = async () => {
    try {
      // Lógica para autenticar al usuario, por ejemplo:
      await login(); // Ejemplo de función de inicio de sesión en tu API

      // Redirigir a la página de usuarios después del inicio de sesión exitoso
      history.push('/usuarios');
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
    }
  };
    return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Inicio de Sesión
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Nombre de Usuario"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Iniciar Sesión
        </Button>
      </form>
    </Container>
  );
};

export default Login;