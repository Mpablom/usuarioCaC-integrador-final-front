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
  CardContent,
  Typography,
} from "@mui/material";
import { Usuario } from "../models/UsuarioModel";
import { deleteUsuario, getUsuarios } from "../axios/UsuarioApi";
import BotonEliminar from "./BotonEliminar";

interface UsuariosTableProps {
  usuariosIniciales: Usuario[];
}
const UsuariosTable: React.FC<UsuariosTableProps> = ({ usuariosIniciales }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosIniciales || []);

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

   const handleUsuarioEliminado = async (usuarioId: number) => {
    try {
      await deleteUsuario(usuarioId);
      setUsuarios(usuarios.filter((usuario) => usuario.id !== usuarioId));
    } catch (error) {
      console.error("Error deleting usuario:", error);
    }
  };

  return (
    <Card
      sx={{maxWidth: 700,margin: "auto",boxShadow: 10,mt: 10,p: 2,pt: 0,bgcolor: "#B4B4AA"}}>
      <CardContent>
        <Typography
          variant="h4"
          component="h1"
          p={4}
          textAlign={"center"}
          fontWeight={500}
        >
          Lista de Usuarios
        </Typography>
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table sx={{ borderColor: "#b4b4aa" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ borderColor: "#b4b4aa" }}>Nombre</TableCell>
                <TableCell sx={{ borderColor: "#b4b4aa" }}>Apellido</TableCell>
                <TableCell sx={{ borderColor: "#b4b4aa" }}>
                  Nombre de Usuario
                </TableCell>
                <TableCell sx={{ borderColor: "#b4b4aa" }}>Rol</TableCell>
                <TableCell sx={{ borderColor: "#b4b4aa" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}sx={{borderColor: "#b4b4aa","&:hover": {backgroundColor: "#f5f5f5",}}}>
                  <TableCell
                    sx={{borderColor: "#b4b4aa","&:hover": { backgroundColor: "#f5f5f5" }}}>
                    {usuario.nombre}
                  </TableCell>
                  <TableCell
                    sx={{borderColor: "#b4b4aa","&:hover": { backgroundColor: "#f5f5f5" }}}>
                    {usuario.apellido}
                  </TableCell>
                  <TableCell
                    sx={{borderColor: "#b4b4aa","&:hover": { backgroundColor: "#f5f5f5" }}}>
                    {usuario.username}
                  </TableCell>
                  <TableCell
                    sx={{borderColor: "#b4b4aa","&:hover": { backgroundColor: "#f5f5f5" }}}>
                    {usuario.rol}
                  </TableCell>
                  <TableCell sx={{ borderColor: "#b4b4aa" }}>
                    {usuario.id !== undefined && (
                      <BotonEliminar
                        usuarioId={usuario.id}
                        onUsuarioEliminado={() => handleUsuarioEliminado(usuario.id)}
                      />
                    )}
                  </TableCell>
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
