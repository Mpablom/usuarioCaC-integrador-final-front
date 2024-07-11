import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { Usuario } from "../models/UsuarioModel";
import { getUsuarios } from "../axios/UsuarioApi";

const UsuariosTable: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuariosData = await getUsuarios();
        setUsuarios(usuariosData);
      } catch (error) {
        console.error("Error fetching usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <Card sx={{ maxWidth: 700, margin: "auto", boxShadow:'10', mt: 10 }}>
      <CardHeader
        title="Lista de usuarios"
        sx={{ textAlign: "center" }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
        Inicio de Sesión
      </Typography>        
      </CardHeader>
      <CardContent>
        <TableContainer component={Paper} sx={{ boxShadow:'none' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Nombre de Usuario</TableCell>
                <TableCell>Rol</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell>{usuario.apellido}</TableCell>
                  <TableCell>{usuario.username}</TableCell>
                  <TableCell>{usuario.rol}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default UsuariosTable;
