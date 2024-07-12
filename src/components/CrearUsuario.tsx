import React, { useEffect, useState } from 'react';
import { createUsuario, updateUsuario } from '../axios/UsuarioApi';
import { Usuario } from '../models/UsuarioModel';
import {Card,CardContent,Typography,TextField,Button,MenuItem,Box} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CrearUsuarioProps {
  usuarioInicial: Usuario;
  onUsuarioCreado: (usuario: Usuario) => void;
  submitButtonText: string;
  isUpdating: boolean;
}

const roles = ['ADMIN', 'STANDARD'];

const CrearUsuario: React.FC<CrearUsuarioProps> = ({ usuarioInicial, onUsuarioCreado, submitButtonText, isUpdating }) => {
const [usuarioData, setUsuarioData] = useState<Usuario>({
    username: usuarioInicial.username || '', 
    password: usuarioInicial.password || '',
    nombre: usuarioInicial.nombre || '',
    apellido: usuarioInicial.apellido || '',
    rol: usuarioInicial.rol || 'STANDARD', 
  });
  useEffect(() => {
  setUsuarioData({
    username: usuarioInicial.username || '',
    password: usuarioInicial.password || '',
    nombre: usuarioInicial.nombre || '',
    apellido: usuarioInicial.apellido || '',
    rol: usuarioInicial.rol || 'STANDARD',
  });
}, [usuarioInicial]);

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUsuarioData({ ...usuarioData, [name]: value || '' });
  };
 
const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (isUpdating) {
        await updateUsuario(usuarioData.id!, usuarioData);
        toast.success('Usuario actualizado correctamente', {
          position: 'bottom-left',
          autoClose: 3000,
        });
      } else {
        const response = await createUsuario(usuarioData);
        const nuevoUsuario = { ...usuarioData, id: response.id };
        toast.success('Usuario creado correctamente', {
          position: 'bottom-left',
          autoClose: 3000,
        });
        onUsuarioCreado(nuevoUsuario);
      }
    } catch (error) {
      toast.error('Error al guardar el usuario', {
        position: 'bottom-left',
        autoClose: 3000,
      });
      console.error(error);
    }
  };

  return (
    <Card sx={{ width: '100%', margin: 'auto', boxShadow: 0, mt: 0, p: 2, pt: 0 }}>
      <CardContent>
        <Typography variant="h5" component="h2" p={2} textAlign="center" fontWeight={500}>
          Crear Usuario
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nombre de Usuario"
            name="username"
            value={usuarioData.username}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            value={usuarioData.password}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Nombre"
            name="nombre"
            value={usuarioData.nombre}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Apellido"
            name="apellido"
            value={usuarioData.apellido}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Rol"
            name="rol"
            select
            value={usuarioData.rol}
            onChange={handleInputChange}
            required
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" color="primary" sx={{width: "25%", mx: "auto"}}>
            {submitButtonText}
          </Button>
        </Box>
        <ToastContainer />
      </CardContent>
    </Card>
  );
};

export default CrearUsuario;
