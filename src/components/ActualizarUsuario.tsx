import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, TextField, Button, Box } from "@mui/material";
import { Usuario } from "../models/UsuarioModel";
import { updateUsuario, getUsuarioById } from "../axios/UsuarioApi";
import SelectUsuarios from "./SelectUsuarios";
import { toast, ToastContainer } from "react-toastify";

const ActualizarUsuario: React.FC<{ onUsuarioActualizado: () => void }> = ({ onUsuarioActualizado }) => {
  const [selectedUsuarioId, setSelectedUsuarioId] = useState<number | null>(null);
  const [usuarioData, setUsuarioData] = useState<Usuario>({
    id: 0,
    username: "",
    nombre: "",
    apellido: "",
    password: "", 
    rol: "", 
  });

    const submitButtonText = selectedUsuarioId ? "Actualizar Usuario" : "Seleccionar Usuario";

  useEffect(() => {
    const fetchUsuario = async (usuarioId: number) => {
        try {
            const usuario = await getUsuarioById(usuarioId);
            setUsuarioData(usuario || {
                id: 0,
                username: "",
                nombre: "",
                apellido: "",
                password: "",
                rol: ""
            });
        } catch (error) {
            console.error("Error fetching usuario:", error);
        }
    };

    if (selectedUsuarioId) {
        fetchUsuario(selectedUsuarioId);
    } else {
        setUsuarioData({
            id: 0,
            username: "",
            nombre: "",
            apellido: "",
            password: "",
            rol: ""
        });
    }
}, [selectedUsuarioId]);

  const handleUsuarioSeleccionado = (usuarioId: number) => {
    setSelectedUsuarioId(usuarioId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuarioData({ ...usuarioData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await updateUsuario(selectedUsuarioId!, usuarioData);
      onUsuarioActualizado();
      toast.success("Usuario actualizado correctamente", {
        position: "bottom-left",
      })
    } catch (error) {
      toast.error("Error al actualizar el usuario", {
        position: "bottom-left",
      })
    }
  };

  return (
    <Card sx={{ width: '100%',boxShadow: 0, margin: "auto", mt: 0, p: 2, pt: 0 }}>
      <CardContent>
        <Typography variant="h5" component="h2" p={2} textAlign="center" fontWeight={500}>
          Usuario a actualizar:
        </Typography>
        <SelectUsuarios label="Seleccionar Usuario" onChange={handleUsuarioSeleccionado} />
        {selectedUsuarioId && (
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
              value={usuarioData.rol}
              onChange={handleInputChange}
              required
            />
             <Button type="submit" variant="contained" color="primary" sx={{ width: "30%", mx: "auto" }}>
              {submitButtonText}
            </Button>
          </Box>
        )}
        <ToastContainer />
      </CardContent>
    </Card>
  );
};

export default ActualizarUsuario;
