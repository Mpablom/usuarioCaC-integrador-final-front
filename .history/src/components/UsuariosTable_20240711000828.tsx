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
    <Card sx={{ maxWidth: 700, margin: "auto", boxShadow:'10', mt: 10, bgcolor:"#B4B4AA" }}>
      <CardHeader
        title="Lista de usuarios"
        sx={{ textAlign: "center", fontSize: "2.5rem" }}
      ></CardHeader>
      <CardContent>
        <TableContainer component={Paper} sx={{ boxShadow:'3' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Nombre de Usuario</TableCell>
                <TableCell>Rol</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{borderColor:"#b4b4aa"}}>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id} sx={{borderColor:"#b4b4aa"}}>
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell>{usuario.apellido}</TableCell>
                  <TableCell >{usuario.username}</TableCell>
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
