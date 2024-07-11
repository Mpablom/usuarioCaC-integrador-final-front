import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { login } from "../axios/UsuarioApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      const response = await login({ username, password });
      if (response.message === "Autenticación exitosa") {
        navigate("/usuarios");
      }
    } catch (error) {
      setError("Error al iniciar sesión");
    }
  };
  return (
    <Card
      sx={{
        maxWidth: 500,
        margin: "auto",
        boxShadow: "10",
        mt: '200px',
        bgcolor: "#B4B4AA",
      }}
    >
      <CardHeader />
      <CardContent>
        <Container sx={{ bgcolor: "#FFFFFF", p: 3, boxShadow: 3, borderRadius: 1 }}>
          <Typography variant="h4" component="h1" textAlign={"center"}>
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
            <Button type="submit" variant="contained" color="primary" sx={{ alignContent: "center",my: 2 }}>
              Iniciar Sesión
            </Button>
          </form>
        </Container>
      </CardContent>
    </Card>
  );
};

export default Login;
